var express = require("express");
var cors = require("cors");

var router = require("./routes");
var helpers = require("./helpers/helpers");

var app = express();

// using bodyParser to parse JSON bodies into JS objects
app.use(express.json({ limit: "50mb" }));

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// enabling CORS for all requests
app.use(cors());

// import router
app.use("/", router);

app.use((req, res, next) => {
  const err = new Error(process.env.ERR_404);
  err.status = 404;
  next(err);
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  let errCode = err.status || 501;
  return helpers.generateApiResponse(res, req, err.message, errCode, err);
});

module.exports = app;
