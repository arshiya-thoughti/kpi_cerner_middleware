var express = require("express");
var router = express.Router();
var helpers = require("../helpers/helpers");

var authRoutes = require("./auth");

router.all("/", (req, res) => {
  return helpers.generateApiResponse(
    res,
    req,
    "KPI inbound middleware working.",
    200,
    []
  );
});

router.use("/auth", authRoutes);

module.exports = router;
