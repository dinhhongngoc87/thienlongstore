import db from "../models";
import orderService from "../services/orderService";
let handlePostOrder = async (req, res) => {
  let data = req.body;
  console.log("data from order controller ", data);
  if (data) {
    let message = await orderService.createNewOrder(data);
    console.log(message);
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
