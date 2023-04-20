import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";
import productController from "../controllers/productController";
import categoryController from "../controllers/categoryController";
import orderController from "../controllers/orderController";
import dashboardController from "../controllers/dashboardController";
import searchController from "../controllers/searchController";
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
let router = express.Router();

let initWebRoutes = (app) => {
  router.get("/", homeController.getHomePage);
  router.get("/crud", homeController.getCRUD);
  router.post("/post-crud", upload.single("image"), homeController.postCRUD);
  router.get("/get-crud", homeController.displayGetCRUD);
  //USER-fetch user's information
  router.get("/edit-user-crud", homeController.getEditCRUD);
  router.get("/delete-crud", homeController.getDeleteCRUD);
  router.post("/put-crud", upload.single("avatar"), homeController.putCRUD);
  router.get("/get-user-by-id", homeController.getUserById);
  //LOGIN
  router.post("/api/login", userController.handleLogin);
  //SEARCH
  router.get("/api/query-product", searchController.handleSearchProduct);
  //PROPDUCT-fetch all product information
  router.get("/api/get-all-products", productController.handleGetAllProducts);
  router.get("/api/get-product-byid", productController.handleGetProductById);
  router.get("/delete-product-crud", productController.handleDeleteProduct);
  router.post(
    "/api/put-product-crud",
    upload.single("images"),
    productController.handlePutProduct
  );
  router.get(
    "/api/get-products-bycategory",
    productController.handleGetProductByCategory
  );
  //CATEGORIES
  router.get(
    "/api/get-all-categories",
    categoryController.handleGetAllCategory
  );
  router.post("/api/put-category-crud", categoryController.handlePutCategory);
  //ORDER
  router.post("/post-order-crud", orderController.handlePostOrder);
  router.get("/get-orders-crud", orderController.handleGetOrder);
  router.get("/get-order-detail", orderController.getOrderDetail);
  router.get("/get-orders-by-type", orderController.getOrderByType);
  router.get("/update-order-status", orderController.updateOrderStatus);
  router.get("/api/get-total-sale", orderController.handleGetTotalSale);
  router.get("/get-orders-by-user-id", orderController.getOrdersByUser);
  //DASHBOARD
  router.get("/api/top-seller", dashboardController.getTopSeller);
  router.get("/api/new-arrival", dashboardController.getNewArrival);
  router.get("/api/top-category", dashboardController.getTopCategory);
  //fetch product's information

  return app.use("/", router);
};
module.exports = initWebRoutes;
