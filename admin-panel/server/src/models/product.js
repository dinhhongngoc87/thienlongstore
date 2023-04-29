"use strict";
const { DATE } = require("sequelize");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {}
  }
  Product.init(
    {
      productName: DataTypes.STRING,
      catId: DataTypes.INTEGER,
      supplierId: DataTypes.INTEGER,
      description: DataTypes.TEXT,
      images: DataTypes.STRING,
      color: DataTypes.STRING,
      price: DataTypes.INTEGER.UNSIGNED,
      discount: DataTypes.INTEGER,
      stockId: DataTypes.STRING,
      quantity: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
