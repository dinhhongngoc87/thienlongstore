import dashboardService from "../services/dashboardService";
let getTopSeller = async (req, res) => {
  alert("COntrolelr");
  let data = await dashboardService.topSeller();
  return res.send(data);
};

module.exports = {
  getTopSeller: getTopSeller,
};
