import dashboardService from "../services/dashboardService";
let getTopSeller = async (req, res) => {
  let data = await dashboardService.topSeller();
  return res.send(data);
};
let getTopCategory = async (req, res) => {
  let data = await dashboardService.topCategory();
  return res.send(data);
};
module.exports = {
  getTopSeller: getTopSeller,
  getTopCategory: getTopCategory,
};
