"use strict";
const { DATE } = require("sequelize");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Allcode extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Allcode.hasMany(models.Order, {
        foreignKey: "statusId",
        as: "statusData",
      });
    }
  }
  Allcode.init(
    {
      key: DataTypes.STRING,
      type: DataTypes.STRING,
      value_en: DataTypes.STRING,
      value_vi: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Allcode",
    }
  );
  return Allcode;
};
