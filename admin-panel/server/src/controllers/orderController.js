import db from "../models";
import orderService from "../services/orderService";
//post information of order
let handlePostOrder = async (req, res) => {
  let data = req.body;
  // console.log("data from order controller ", data);
  if (data) {
    let message = await orderService.createNewOrder(data);
    return res.send("create done");
  }
};
let handleGetOrder = async (req, res) => {
  let data = await orderService.getAllOrder();
  return res.send(data);
};
module.exports = {
  handlePostOrder: handlePostOrder,
  handleGetOrder: handleGetOrder,
};
