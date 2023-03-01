"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return [queryInterface.addColumn("Orders", "email", Sequelize.STRING)];
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([queryInterface.removeColumn("Orders", "email")]);
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
