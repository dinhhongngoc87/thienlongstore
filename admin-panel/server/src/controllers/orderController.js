import db from "../models";
import order from "../models/order";
import orderService from "../services/orderService";
//post information of order
let handlePostOrder = async (req, res) => {
  console.log(res);
  let data = req.body;
  console.log(data);
  // if (data) {
  //   if (!data.address || !data.userName || !data.phone) {
  //     return res.status(200).json({
  //       errCode: 1,
  //       message: "Vui lòng điền đủ thông tin",
  //     });
  //   }
  //   if (data.totalMoney === 0) {
  //     return res.status(200).json({
  //       errCode: 1,
  //       message: "Hãy thêm sản phẩm vào giỏ",
  //     });
  //   } else {
  //     let message = await orderService.createNewOrder(data);
  //     return res.send(message);
  //   }
  // }
};
//get all order
let handleGetOrder = async (req, res) => {
  let data = await orderService.getAllOrder();
  return res.status(200).json(data);
};

let getOrderDetail = async (req, res) => {
  const data = req.query;
  const response = await orderService.getOrderDetail(data);
  return res.send(response);
};

let getOrderByType = async (req, res) => {
  const response = await orderService.getOrderByType(req.query.type);
  return res.send(response);
};
let updateOrderStatus = async (req, res) => {
  const response = await orderService.updateOrderStatus(req.query);
  return res.send(response);
};
let handleGetTotalSale = async (req, res) => {
  const response = await orderService.getTotalSale();
  return res.send(response);
};
let getOrdersByUser = async (req, res) => {
  const userId = req.query.userId;
  const orderStatus = req.query.status;
  let response = await orderService.getOrdersByUser(userId, orderStatus);
  return res.send(response);
};

module.exports = {
  handlePostOrder: handlePostOrder,
  handleGetOrder: handleGetOrder,
  getOrderDetail: getOrderDetail,
  getOrderByType: getOrderByType,
  updateOrderStatus: updateOrderStatus,
  handleGetTotalSale: handleGetTotalSale,
  getOrdersByUser: getOrdersByUser,
};
