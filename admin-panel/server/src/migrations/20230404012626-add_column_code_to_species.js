"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // return Promise.all([
    //   queryInterface.addColumn("Species", "code", {
    //     type: Sequelize.STRING,
    //   }),
    // ]);
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
