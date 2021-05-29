"use strict";

module.exports = (sequelize, DataTypes) => {
  const FacilityCredentials = sequelize.define(
    "FacilityCredentials",
    {
      facility_credentials_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.BIGINT(20),
      },
      facility_id: {
        type: DataTypes.BIGINT(20),
      },
      cerner_fhir_id: DataTypes.STRING,
      facility_cerner_oauth_url: DataTypes.STRING,
      facility_cerner_token_url: DataTypes.STRING,
      facility_cerner_fhir_url: DataTypes.STRING,
      facility_institution_id: DataTypes.STRING,
      created_at: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updated_at: {
        allowNull: true,
        type: DataTypes.DATE,
      },
      deleted_at: {
        allowNull: true,
        type: DataTypes.DATE,
      },
    },
    { tableName: "facility_credentials", timestamps: false }
  );
  // eslint-disable-next-line no-unused-vars
  FacilityCredentials.associate = function (models) {
    // associations can be defined here
    models.FacilityCredentials.belongsTo(models.Facility, {
      foreignKey: "facility_id",
    });
  };
  return FacilityCredentials;
};
