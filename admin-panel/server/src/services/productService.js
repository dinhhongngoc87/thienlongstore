import db from "../models";

let getAllProduct = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let products = await db.Product.findAll({
        attributes: { exclude: ["description"] },
      });
      let categories = await db.Category.findAll({
        attributes: ["id", "catName"],
      });
      let suppliers = await db.Supplier.findAll();
      resolve({
        products,
        categories,
        suppliers,
      });
    } catch (e) {
      reject(e);
    }
  });
};
let getProductById = (productId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (productId) {
        let productInfo = await db.Product.findOne({
          where: { id: productId },
        });
        resolve(productInfo);
      }
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = {
  getAllProduct: getAllProduct,
  getProductById: getProductById,
};
