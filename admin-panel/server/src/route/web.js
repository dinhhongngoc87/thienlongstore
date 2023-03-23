import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";
import productController from "../controllers/productController";
import orderController from "../controllers/orderController";
import dashboardController from "../controllers/dashboardController";
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

  router.post("/api/login", userController.handleLogin);
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
  //ORDER
  router.post("/post-order-crud", orderController.handlePostOrder);
  router.get("/get-orders-crud", orderController.handleGetOrder);

  //DASHBOARD
  router.get("/api/top-seller", dashboardController.getTopSeller);
  router.get("/api/top-category", dashboardController.getTopCategory);
  //fetch product's information

  return app.use("/", router);
};
module.exports = initWebRoutes;
