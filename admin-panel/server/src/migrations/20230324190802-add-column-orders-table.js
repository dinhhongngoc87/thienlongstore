"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      // queryInterface.addColumn("Orders", "fullName", {
      //   type: Sequelize.STRING,
      // }),
      // queryInterface.addColumn("Orders", "totalMoney", {
      //   type: Sequelize.INTEGER,
      // }),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn("Orders", "fullName"),
      queryInterface.removeColumn("Orders", "totalMoney"),
    ]);
  },
};
