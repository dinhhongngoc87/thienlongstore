"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("Orders", "totalProduct");
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
