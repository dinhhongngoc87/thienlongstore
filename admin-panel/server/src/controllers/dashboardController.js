import dashboardService from "../services/dashboardService";
let getTopSeller = async (req, res) => {
  let limit = parseInt(req.query.limit);
  let data = await dashboardService.topSeller(limit);
  return res.send(data);
};
let getTopCategory = async (req, res) => {
  let data = await dashboardService.topCategory();
  return res.send(data);
};
let getNewArrival = async (req, res) => {
  let limit = parseInt(req.query.limit);
  let data = await dashboardService.getNewArrival(limit);
  return res.send(data);
};
module.exports = {
  getTopSeller: getTopSeller,
  getTopCategory: getTopCategory,
  getNewArrival: getNewArrival,
};
