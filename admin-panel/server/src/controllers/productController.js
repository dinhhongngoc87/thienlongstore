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
//UPDATE AND CREATE product
let handlePutProduct = async (req, res) => {
  let data = req.body;
  if (!data.id) {
    let message = await productService.createNewProduct(data);
    console.log(message);
    return res.send("create done");
  } else {
    console.log("UPDATE INFOR:", data);
    await productService.updateProductData(data);
    return res.send("update done");
  }
};
//DELETE
let handleDeleteProduct = async (req, res) => {
  let productId = req.query.id;
  if (productId) {
    await productService.deleteProductById(productId);
    return res.send("Delete successfully");
  } else {
    return res.send(`Not found user`);
  }
};
//FETCH BY ID
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
