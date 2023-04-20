"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order_detail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Order_detail.belongsTo(models.Order, {
      //   foreignKey: "order_id",
      //   as: "orderData",
      // });
      // Order_detail.belongsTo(models.Product, {
      //   foreignKey: "product_id",
      //   as: "productData",
      // });
    }
  }
  Order_detail.init(
    {
      order_id: DataTypes.INTEGER,
      product_id: DataTypes.INTEGER,
      price: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
      totalMoney: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Order_detail",
    }
  );
  return Order_detail;
};
