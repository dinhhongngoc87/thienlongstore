import productService from "../services/productService";

let handleGetAllProducts = async (req, res) => {
  let data = await productService.getAllProduct();
  return res.send(data);
};
//fetch product by id
let handleGetProductById = async (req, res) => {
  let productId = req.query.id;
  console.log(productId);
  let data = await productService.getProductById(productId);
  res.send(data);
};
let handlePutProduct = async (req, res) => {
  let data = req.body;
  console.log("UPDATE INFOR:", data);
  await productService.updateProductData(data);
  return res.send("update done");
};
let handleDeleteProduct = async (req, res) => {
  let productId = req.query.id;
  if (productId) {
    await productService.deleteProductById(productId);
    return res.send("Delete successfully");
  } else {
    return res.send(`Not found user`);
  }
};
let handleGetProductByCategory = async (req, res) => {
  let catId = req.query.id;
  if (catId) {
    let data = await productService.getProductByCategory(catId);
    return res.send(data);
  } else {
    return res.send("Not found products");
  }
};
module.exports = {
  handleGetAllProducts: handleGetAllProducts,
  handleGetProductById: handleGetProductById,
  handlePutProduct: handlePutProduct,
  handleDeleteProduct: handleDeleteProduct,
  handleGetProductByCategory: handleGetProductByCategory,
};
