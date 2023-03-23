import db from "../models";
const { Sequelize } = require("sequelize");
const sequelize = new Sequelize("stationery_store", "root", null, {
  host: "localhost",
  dialect: "mysql",
  logging: false,
});
let createNewOrder = async (data) => {
  return new Promise((resolve, reject) => {
    try {
      data.products.map(async (product) => {
        await db.Order.create({
          totalProduct: product.qty,
          address: data.address,
          statusId: "S1",
          phone: data.phone,
          email: data.email || data.userName,
        });
      });
      resolve("create order successfully");
    } catch (e) {
      reject(e);
    }
  });
};
let getAllOrder = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const users = await db.Order.findAll({
        order: [[sequelize.col("createdAt"), "DESC"]],
      });
      resolve(users);
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createNewOrder: createNewOrder,
  getAllOrder: getAllOrder,
};
