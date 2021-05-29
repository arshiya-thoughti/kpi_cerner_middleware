"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Facility_Credentials", {
      facility_credentials_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT(20),
      },
      facility_id: {
        type: Sequelize.BIGINT(20),
      },
      cerner_fhir_id: Sequelize.STRING,
      facility_cerner_oauth_url: Sequelize.STRING,
      facility_cerner_token_url: Sequelize.STRING,
      facility_cerner_fhir_url: Sequelize.STRING,
      facility_institution_id: Sequelize.STRING,
      access_token: Sequelize.STRING,
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      deleted_at: {
        allowNull: true,
        type: Sequelize.DATE,
      },
    });
  },
  // eslint-disable-next-line no-unused-vars
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("FacilityCredentials");
  },
};
