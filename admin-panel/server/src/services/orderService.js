import db from "../models";
import order from "../models/order";
const { Sequelize } = require("sequelize");
const sequelize = new Sequelize("stationery_store", "root", null, {
  host: "localhost",
  dialect: "mysql",
  logging: false,
});
let createNewOrder = (data) => {
  console.log(data);
  let createdOrder = {};
  createdOrder.products = data.products;
  return new Promise(async (resolve, reject) => {
    try {
      await db.Order.create({
        address: data.address,
        statusId: "S1",
        phone: data.phone,
        email: data.email,
        userId: data.user_id,
        fullName: data.userName,
        totalMoney: data.totalMoney,
      })
        .then((result) => {
          createdOrder.order = result.dataValues;
          const products = data.products;
          products.map(async (product) => {
            console.log("RESULT", {
              order_id: result.id,
              product_id: product.id,
              price: product.price,
              quantity: parseInt(product.qtyIncart),
              totalMoney: product.price * product.qtyIncart,
            });
            await db.Order_detail.create({
              order_id: result.id,
              product_id: product.id,
              price: product.price,
              quantity: parseInt(product.qtyIncart),
              totalMoney: product.price * product.qtyIncart,
            });
          });
        })
        .then(() => {
          resolve({
            errCode: 0,
            message: "Thêm đơn hàng thành công",
            createdOrder: createdOrder,
          });
        });
    } catch (e) {
      reject(e);
    }
  });
};
let getAllOrder = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const orders = await db.Order.findAll({
        order: [[sequelize.col("createdAt"), "DESC"]],
      });
      resolve({
        errCode: 0,
        message: "Lấy danh sách đơn hàng thành công",
        orders: orders,
      });
    } catch (e) {
      reject(e);
    }
  });
};
let getOrderDetail = (data) => {
  console.log("Recive data : ", data);
  return new Promise(async (resolve, reject) => {
    try {
      const order = await db.Order_detail.findAll({
        where: {
          order_id: data.order_id,
          createdAt: data.createdAt,
        },
      });

      resolve({
        errCode: 0,
        message: "Lấy chi tiết đơn hàng thành công",
        data: order,
      });
    } catch (e) {
      reject(e);
    }
  });
};
let getOrderByType = (type) => {
  return new Promise(async (resolve, reject) => {
    try {
      const orders = await db.Order.findAll({
        order: [[sequelize.col("createdAt"), "DESC"]],
        where: { statusId: type },
      });

      resolve({
        errCode: 0,
        message: "Lấy danh sách đơn hàng thành công",
        orders: orders,
      });
    } catch (e) {
      reject(e);
    }
  });
};
let updateOrderStatus = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.Order.update(
        {
          statusId: data.typeTarget,
        },
        {
          where: {
            id: data.order.id,
          },
        }
      );
      resolve({
        errCode: 0,
        message: "Cập nhật thành công",
      });
    } catch (e) {
      reject(e);
    }
  });
};
let getTotalSale = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const orders = await db.Order.findOne({
        attributes: [
          [sequelize.fn("COUNT", sequelize.col("id")), "totalSales"],
          [sequelize.fn("SUM", sequelize.col("totalMoney")), "totalIncomes"],
        ],
        where: { statusId: "S3" },
      });
      const countOrder = await db.Order.findOne({
        attributes: [
          [sequelize.fn("COUNT", sequelize.col("id")), "totalOrder"],
        ],
      });
      orders.totalOrder = countOrder.totalOrder;
      resolve({
        errCode: 0,
        message: "Lấy dữ liệu thành công",
        data: orders,
      });
    } catch (e) {
      reject(e);
    }
  });
};

let getOrdersByUser = (userId, orderStatus) => {
  return new Promise(async (resolve, reject) => {
    try {
      const orders = await db.Order.findAll({
        where: {
          userId: userId,
          statusId: orderStatus,
        },
      });
      if (orders.length > 0) {
        resolve({
          errCode: 0,
          message: "Lấy dữ liệu thành công",
          data: orders,
        });
      } else {
        resolve({
          errCode: 0,
          message: "Chưa có đơn hàng nào",
          data: [],
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = {
  createNewOrder: createNewOrder,
  getAllOrder: getAllOrder,
  getOrderDetail: getOrderDetail,
  getOrderByType: getOrderByType,
  updateOrderStatus: updateOrderStatus,
  getTotalSale: getTotalSale,
  getOrdersByUser: getOrdersByUser,
};
