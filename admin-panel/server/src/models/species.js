"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Species extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Species.init(
    {
      productId: DataTypes.INTEGER,
      code: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Species",
    }
  );
  return Species;
};
