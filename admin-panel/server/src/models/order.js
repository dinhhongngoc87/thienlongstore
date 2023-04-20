"use strict";
const { DATE } = require("sequelize");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.belongsTo(models.Allcode, {
        foreignKey: "statusId",
        as: "statusData",
      });
      // Order.hasMany(models.Order_detail, {
      //   foreignKey: "order_id",
      //   as: "orderData",
      // });

      // Order.belongsToMany(models.Product, { through: "Order_detail" });
    }
  }
  Order.init(
    {
      userId: DataTypes.INTEGER,
      address: DataTypes.STRING,
      statusId: DataTypes.STRING,
      phone: DataTypes.STRING,
      email: DataTypes.STRING,
      fullName: DataTypes.STRING,
      totalMoney: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Order",
    }
  );
  return Order;
};
