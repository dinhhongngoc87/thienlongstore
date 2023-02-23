import productService from "../services/productService";

let handleGetAllProducts = async (req, res) => {
  let data = await productService.getAllProduct();
  return res.send(data);
};

let handleGetProductById = async (req, res) => {
  let productId = req.query.id;
  let data = await productService.getProductById(productId);
  console.log("PRODUCT INFOR+++++++++++++++++++++++++++++++++++++++++");
  console.log(data);
  res, send(data);
};
module.exports = {
  handleGetAllProducts: handleGetAllProducts,
  handleGetProductById: handleGetProductById,
};
