"use strict";

// eslint-disable-next-line no-undef
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Users", {
      id: {
        type: Sequelize.BIGINT(20),
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null,
      },
      username: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null,
        comment: "EPICUSERID from epic launch context",
      },
      password: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: null,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: null,
        defaultValue: null,
      },
      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: null,
      },
      role: {
        type: Sequelize.ENUM("Admin", "User"),
        allowNull: true,
        defaultValue: "User",
        comment: "Admin,User",
      },
      status: {
        type: Sequelize.ENUM("0", "1"),
        allowNull: true,
        defaultValue: "1",
        comment: "0: Inactive; 1: Active",
      },
    });
  },
  // eslint-disable-next-line no-unused-vars
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Users");
  },
};
