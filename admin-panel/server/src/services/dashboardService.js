import db from "../models";
const { Sequelize } = require("sequelize");
const sequelize = new Sequelize("stationery_store", "root", null, {
  host: "localhost",
  dialect: "mysql",
  logging: false,
});
//Query best seller product
let topSeller = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const bestSeller = await db.Order.findAll({
        attributes: [
          "productId",
          [sequelize.fn("SUM", sequelize.col("totalProduct")), "totalQty"],
        ],
        group: ["productId"],
        limit: 5,
        order: [[sequelize.col("totalQty"), "DESC"]],
      });

      resolve(bestSeller);
    } catch (e) {
      reject(e);
    }
  });
};
//Query the most popular category
let topCategory = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const bestSeller = await db.Product.findAll({
        attributes: [
          "catId",

          [
            sequelize.fn("COUNT", sequelize.col("catId")),
            "totalProductOfCategory",
          ],
        ],

        group: ["catId"],
        limit: 5,
        order: [[sequelize.col("totalProductOfCategory"), "DESC"]],
      });
      //find categories in db
      let categories = await db.Category.findAll({
        raw: true,
      });
      //find name of top categories
      let categoryTopName = [];
      bestSeller.map((item) => {
        categories.find((category) => {
          if (item.catId === category.id)
            categoryTopName.push(category.catName);
        });
      });
      //add name property into bestSeller
      bestSeller.map((item, index) => (item.catName = categoryTopName[index]));
      resolve(bestSeller);
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  topSeller: topSeller,
  topCategory: topCategory,
};
