"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Facilities", {
      facility_id: {
        type: Sequelize.BIGINT(20),
        primaryKey: true,
        autoIncrement: true,
      },
      facility_name: Sequelize.STRING,
      facility_app_id: Sequelize.STRING,
      facility_owner_name: Sequelize.STRING,
      facility_sub_domain: Sequelize.STRING,
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE,
      deleted_at: Sequelize.DATE,
      facility_status: {
        type: Sequelize.ENUM("1", "0"),
        defaultValue: 1,
        comment: "1: Active; 0: Inactive",
      },
    });
  },
  // eslint-disable-next-line no-unused-vars
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Facilities");
  },
};
