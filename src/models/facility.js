"use strict";

module.exports = (sequelize, DataTypes) => {
  const Facility = sequelize.define(
    "Facility",
    {
      facility_id: {
        type: DataTypes.BIGINT(20),
        primaryKey: true,
        autoIncrement: true,
      },
      facility_name: DataTypes.STRING,
      facility_app_id: DataTypes.STRING,
      facility_owner_name: DataTypes.STRING,
      facility_sub_domain: DataTypes.STRING,
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
      deleted_at: DataTypes.DATE,
      facility_status: {
        type: DataTypes.ENUM("1", "0"),
        defaultValue: 1,
        comment: "1: Active; 0: Inactive",
      },
    },
    { tableName: "facilities", timestamps: false }
  );
  // eslint-disable-next-line no-unused-vars
  Facility.associate = function (models) {
    // associations can be defined here
    models.Facility.hasOne(models.FacilityCredentials, {
      foreignKey: "facility_id",
    });
  };
  return Facility;
};
