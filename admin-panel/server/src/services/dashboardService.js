import db from "../models";

//Query best seller product
let topSeller = () => {
  return new Promise(async (resolve, reject) => {
    // try {
    //   const bestSeller = await db.Order.findAll({
    //     attributes: [
    //       "productId",
    //       [sequelize.fn("COUNT", sequelize.col("totalProduct")), "n_hats"],
    //     ],
    //   });
    //   console.log(bestSeller);
    // } catch (e) {
    //   reject(e);
    // }
  });
};

module.exports = {
  topSeller: topSeller,
};
