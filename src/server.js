/* eslint-disable vars-on-top */
require("dotenv").config();
var app = require("./app");
// var http = require("http");
var https = require("https");
var fs = require("fs");

var helpers = require("./helpers/helpers");

process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

let APP_PORT = process.env.APP_PORT || 5000;
let APP_URL = process.env.APP_URL || `http://localhost:${APP_PORT}`;
let CLIENT_URL = process.env.CLIENT_URL || `http://localhost:3000`;

// for persistant localStorage, check /scratch folder exists, if not, create one
if (!fs.existsSync("scratch")) {
  fs.mkdirSync("scratch");
  helpers.logMessage("/scratch does not exist\n/scratch created");
}

// // create http server
// let server = http.createServer(app);

// Set SSL Certificates
let SSL_CRT_FILE = process.env.SSL_CRT_FILE || "./src/ssl/server-cert.pem";
let SSL_KEY_FILE = process.env.SSL_KEY_FILE || "./src/ssl/server-key.pem";
let httpsOptions = {
  cert: fs.readFileSync(SSL_CRT_FILE),
  key: fs.readFileSync(SSL_KEY_FILE),
};
let server = https.createServer(httpsOptions, app);

// starting the server
server.listen(APP_PORT, () => {
  helpers.logMessage(
    "App started successfully.\nServer running on: " +
      APP_URL +
      "\nClient running on: " +
      CLIENT_URL
  );
});
