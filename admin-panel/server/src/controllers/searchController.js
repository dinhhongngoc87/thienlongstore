import searchService from "../services/searchService";

let handleSearchProduct = async (req, res) => {
  let response = await searchService.searchProduct(req.query.q);
  return res.send(response.result);
};

module.exports = {
  handleSearchProduct: handleSearchProduct,
};
