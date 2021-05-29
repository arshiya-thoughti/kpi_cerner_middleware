/* eslint-disable no-unused-vars */

"use strict";

// eslint-disable-next-line node/no-extraneous-require
var moment = require("moment");
var bcrypt = require("bcrypt");
const BCRYPT_SALT_ROUNDS = 12;

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "users",
      [
        {
          id: 1,
          name: "KPI Admin",
          email: "admin@kpininja.com",
          username: "Admin",
          password: bcrypt.hashSync("admin", BCRYPT_SALT_ROUNDS),
          created_at: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
          updated_at: null,
          deleted_at: null,
          role: "Admin",
          status: "1",
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {},
};
