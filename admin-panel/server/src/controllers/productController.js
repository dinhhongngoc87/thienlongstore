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
  const imageUrl = req.file?.path;
  console.log("DATA: ", data);
  console.log("IMAGE: ", imageUrl);
  if (!data.id) {
    let message = await productService.createNewProduct(data, imageUrl);
    console.log(message);
    return res.send(message);
  } else {
    console.log("UPDATE INFOR:", data);
    let message = await productService.updateProductData(data, imageUrl);
    return res.send(message);
  }
};
//DELETE
let handleDeleteProduct = async (req, res) => {
  let productId = req.query.id;
  if (productId) {
    await productService.deleteProductById(productId);
    res.status(200).json({
      errCode: 0,
      message: "Xóa thành công!",
    });
  } else {
    return res.send(`Không tìm thấy sản phẩm`);
  }
};
//FETCH BY category
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
