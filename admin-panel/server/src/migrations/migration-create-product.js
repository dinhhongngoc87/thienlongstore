"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Products", {
      //     productName: DataTypes.STRING,
      //   catId: DataTypes.STRING,
      //   supplierId: DataTypes.STRING,
      //   description: DataTypes.TEXT,
      //   images: DataTypes.STRING,
      //   color: DataTypes.TEXT,
      //   price: DataTypes.INTEGER.UNSIGNED,
      //   discount: DataTypes.INTEGER,
      //   stockId: DataTypes.STRING,
      //   quantity: DataTypes.INTEGER,
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      productName: {
        type: Sequelize.STRING,
      },
      catId: {
        type: Sequelize.INTEGER,
      },
      supplierId: {
        type: Sequelize.INTEGER,
      },
      description: {
        type: Sequelize.TEXT,
      },
      images: {
        type: Sequelize.STRING,
      },
      color: {
        type: Sequelize.STRING,
      },
      price: {
        type: Sequelize.INTEGER.UNSIGNED,
      },
      discount: {
        type: Sequelize.INTEGER,
      },
      stockId: {
        type: Sequelize.STRING,
      },
      quantity: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Products");
  },
};
