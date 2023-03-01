import db from "../models";

let createNewOrder = async (data) => {
  return new Promise((resolve, reject) => {
    try {
      data.products.map(async (product) => {
        await db.Order.create({
          productId: product.id,
          totalProduct: product.qty,
          address: data.address,
          statusId: "S1",
          phone: data.phone,
          email: data.email,
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
      const users = await db.Order.findAll();
      console.log("USERS: ", users);
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
