import productService from "../services/productService";

let handleGetAllProducts = async (req, res) => {
  let data = await productService.getAllProduct();
  console.log(
    "DATA++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++"
  );
  console.log(data.categories);
  return res.send(data);
};

module.exports = {
  handleGetAllProducts: handleGetAllProducts,
};
