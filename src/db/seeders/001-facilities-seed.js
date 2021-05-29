/* eslint-disable no-unused-vars */

"use strict";

// eslint-disable-next-line node/no-extraneous-require
var moment = require("moment");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "facilities",
      [
        {
          facility_id: 1,
          facility_name: "Test Facility 1",
          facility_app_id: "facility_1",
          facility_owner_name: "Test Facility 1 Owner",
          facility_sub_domain: "facility1.epic.com",
          created_at: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
          updated_at: null,
          deleted_at: null,
          facility_status: "1",
        },
        {
          facility_id: 2,
          facility_name: "Test Facility 2",
          facility_app_id: "facility_2",
          facility_owner_name: "Test Facility 2 Owner",
          facility_sub_domain: "facility2.epic.com",
          created_at: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
          updated_at: null,
          deleted_at: null,
          facility_status: "1",
        },
      ],
      {}
    );
  },
  down: (queryInterface, Sequelize) => {},
};
