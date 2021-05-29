const express = require("express");
const router = express.Router();
const axios = require("../config/axios-config");
var helpers = require("../helpers/helpers");
var Models = require("../models");
var LocalStorage = require("node-localstorage").LocalStorage;
var localStorage = new LocalStorage("./scratch");

router.get("/cerner-launch/:facility_app_id", async (req, res) => {
  var facilityAppId = req.params.facility_app_id;

  // Get facility details from database
  let facilityDetails = await Models.Facility.findOne({
    where: {
      facility_app_id: facilityAppId,
    },
  });

  if (facilityDetails == null) {
    return helpers.generateApiResponse(
      res,
      req,
      "Error: Facility not found.",
      404,
      []
    );
  }
  if (facilityDetails.facility_status != 1) {
    return helpers.generateApiResponse(
      res,
      req,
      "Error: Facility is inactive.",
      400,
      []
    );
  }

  // Get facility credentials from database
  let facilityCredentials = await Models.FacilityCredentials.findOne({
    where: {
      facility_id: facilityDetails.facility_id,
    },
  });

  if (
    typeof facilityCredentials.cerner_fhir_id == "undefined" ||
    facilityCredentials.cerner_fhir_id == null ||
    facilityCredentials.cerner_fhir_id == "" ||
    typeof facilityCredentials.facility_cerner_oauth_url == "undefined" ||
    facilityCredentials.facility_cerner_oauth_url == null ||
    facilityCredentials.facility_cerner_oauth_url == ""
  ) {
    return helpers.generateApiResponse(
      res,
      req,
      "Error: Invalid facility credentials.",
      400,
      []
    );
  }

  localStorage.setItem("facilityAppId", facilityAppId);

  let clientId = facilityCredentials.cerner_fhir_id;
  let authUri = facilityCredentials.facility_cerner_oauth_url;

  let { launch, iss } = req.query;

  // static value scope
  let scope = decodeURIComponent(
    "user/Patient.read patient/Patient.read launch"
  );
  let redirectUri = process.env.APP_URL + `/auth/cerner/callback`;

  let redirectTo =
    authUri +
    "?scope=" +
    scope +
    "&response_type=code" +
    "&redirect_uri=" +
    redirectUri +
    "&client_id=" +
    clientId +
    "&launch=" +
    launch +
    "&state=abc123" +
    "&aud=" +
    decodeURIComponent(iss);
  res.redirect(redirectTo);
  return true;
});

// provider callback
router.get("/cerner/callback", async (req, res) => {
  let oauth2 = {};
  let { code } = req.query;

  let facilityAppId = localStorage.getItem("facilityAppId");

  let redirectUri = process.env.APP_URL + "/auth/cerner/callback";

  // Get facility details from database
  let facilityDetails = await Models.Facility.findOne({
    where: { facility_app_id: facilityAppId },
  });

  if (facilityDetails == null) {
    return helpers.generateApiResponse(
      res,
      req,
      "Error: Facility not found.",
      404,
      []
    );
  }
  if (facilityDetails.facility_status != 1) {
    return helpers.generateApiResponse(
      res,
      req,
      "Error: Facility is inactive.",
      400,
      []
    );
  }

  // Get facility credentials from database
  let facilityCredentials = await Models.FacilityCredentials.findOne({
    where: {
      facility_id: facilityDetails.facility_id,
    },
  });

  if (
    typeof facilityCredentials.cerner_fhir_id == "undefined" ||
    facilityCredentials.cerner_fhir_id == null ||
    facilityCredentials.cerner_fhir_id == "" ||
    typeof facilityCredentials.facility_cerner_token_url == "undefined" ||
    facilityCredentials.facility_cerner_token_url == null ||
    facilityCredentials.facility_cerner_token_url == ""
  ) {
    return helpers.generateApiResponse(
      res,
      req,
      "Error: Invalid facility credentials.",
      400,
      []
    );
  }

  let accessApiPath = facilityCredentials.facility_cerner_token_url;
  let clientId = facilityCredentials.cerner_fhir_id;

  let body =
    "grant_type=authorization_code&code=" +
    code +
    "&redirect_uri=" +
    redirectUri +
    "&client_id=" +
    clientId;

  let options = {
    "Content-Type": "application/x-www-form-urlencoded",
  };

  try {
    oauth2 = await axios.post(accessApiPath, body, options);

    let accessToken = oauth2.data.access_token;
    let patientFhirId = oauth2.data.patient;
    let providerFhirId = oauth2.data.EpicUserFhirId;
    let epicUserId = oauth2.data.EpicUserId;

    let patientData = {};

    let apiPath =
      facilityCredentials.facility_cerner_fhir_url +
      "/Patient/" +
      patientFhirId;

    let headers = {};
    if (accessToken.startsWith("Bearer ") == true) {
      headers.Authorization = accessToken;
    }
    if (accessToken.startsWith("Bearer ") != true) {
      headers.Authorization = "Bearer " + accessToken;
    }

    let options1 = {
      headers: headers,
    };

    const patientDataResponse = await axios.get(apiPath, options1);
    patientData.patientFhirId = patientFhirId;
    patientData.patientName = patientDataResponse.data.name[0].text;
    patientData.patientDob = patientDataResponse.data.birthDate;
    patientData.patientGender = patientDataResponse.data.gender;
    patientData.patientMaritalStatus =
      patientDataResponse.data.maritalStatus.text;

    return helpers.generateApiResponse(
      res,
      req,
      "App cerner authentication successful",
      200,
      {
        accessToken: accessToken,
        providerFhirId: providerFhirId,
        epicUserId: epicUserId,
        patientData: patientData,
      }
    );
  } catch (error) {
    helpers.logError("Error: Authentication failed.", error);
    return helpers.generateApiResponse(
      res,
      req,
      "Error: Authentication failed.",
      200,
      []
    );
  }
});

module.exports = router;
