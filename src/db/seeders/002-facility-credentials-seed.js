/* eslint-disable no-unused-vars */

"use strict";

// eslint-disable-next-line node/no-extraneous-require
var moment = require("moment");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "facility_credentials",
      [
        {
          facility_credentials_id: 1,
          facility_id: 1,
          cerner_fhir_id: "48ae58c6-9dd0-45f8-a1bf-664aa5a766a1",
          facility_cerner_oauth_url:
            "https://authorization.cerner.com/tenants/ec2458f2-1e24-41c8-b71b-0e701af7583d/protocols/oauth2/profiles/smart-v1/personas/provider/authorize",
          facility_cerner_token_url:
            "https://authorization.cerner.com/tenants/ec2458f2-1e24-41c8-b71b-0e701af7583d/protocols/oauth2/profiles/smart-v1/token",
          facility_cerner_fhir_url:
            "https://fhir-ehr-code.cerner.com/r4/ec2458f2-1e24-41c8-b71b-0e701af7583d",
          facility_institution_id: 29,
          access_token: null,
          created_at: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
          updated_at: null,
          deleted_at: null,
        },
        {
          facility_credentials_id: 2,
          facility_id: 2,
          cerner_fhir_id: "17edb78e-bc02-462e-829d-f828c9bec590",
          facility_cerner_oauth_url:
            "https://fhir-ehr-code.cerner.com/interconnect-cerner-oauth/oauth2/authorize",
          facility_cerner_token_url:
            "https://fhir-ehr-code.cerner.com/interconnect-cerner-oauth/oauth2/token",
          facility_cerner_fhir_url:
            "https://fhir-ehr-code.cerner.com/interconnect-cerner-oauth/api/FHIR/R4",
          facility_institution_id: 30,
          access_token: null,
          created_at: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
          updated_at: null,
          deleted_at: null,
        },
      ],
      {}
    );
  },
  down: (queryInterface, Sequelize) => {},
};
