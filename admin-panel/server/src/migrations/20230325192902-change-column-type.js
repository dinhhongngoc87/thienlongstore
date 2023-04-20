"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn("Order_details", "order_id", {
        type: Sequelize.INTEGER,
        allowNull: false,
      }),
      queryInterface.changeColumn("Order_details", "product_id", {
        type: Sequelize.INTEGER,
        allowNull: false,
      }),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn("Order_details", "order_id", {
        type: Sequelize.INTEGER,
        allowNull: false,
      }),
      queryInterface.changeColumn("Order_details", "product_id", {
        type: Sequelize.INTEGER,
        allowNull: false,
      }),
    ]);
  },
};
