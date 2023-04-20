import db from "../models";
const { Op } = require("sequelize");
let searchProduct = (q) => {
  // return new Promise(async (resolve, reject) => {
  //     try {
  //       let products = await db.Product.findAll({
  //         // attributes: { exclude: ["description"] },
  //       });
  //       let categories = await db.Category.findAll({
  //         attributes: ["id", "catName"],
  //       });
  //       let suppliers = await db.Supplier.findAll();
  //       resolve({
  //         products,
  //         categories,
  //         suppliers,
  //       });
  //     } catch (e) {
  //       reject(e);
  //     }
  //   });
  return new Promise(async (resolve, reject) => {
    try {
      let products = await db.Product.findAll({
        limit: 8,
        where: {
          productName: { [Op.like]: "%" + q + "%" },
          description: { [Op.like]: "%" + q + "%" },
        },
      })
        .then((result) => {
          resolve({
            errCode: 0,
            message: "kết quả tìm kiếm",
            result: result,
          });
        })
        .catch((err) =>
          resolve({
            errCode: 1,
            message: "faild to find records",
          })
        );
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  searchProduct: searchProduct,
};
