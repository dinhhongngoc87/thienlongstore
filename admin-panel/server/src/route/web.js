import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";
import productController from "../controllers/productController";
let router = express.Router();

let initWebRoutes = (app) => {
  router.get("/", homeController.getHomePage);
  router.get("/crud", homeController.getCRUD);
  router.post("/post-crud", homeController.postCRUD);
  router.get("/get-crud", homeController.displayGetCRUD);
  //fetch user's information
  router.get("/edit-user-crud", homeController.getEditCRUD);
  router.get("/delete-crud", homeController.getDeleteCRUD);
  router.post("/put-crud", homeController.putCRUD);

  router.post("/api/login", userController.handleLogin);
  //fetch all product information
  router.get("/api/get-all-products", productController.handleGetAllProducts);
  router.get("/api/get-product-byid", productController.handleGetProductById);
  router.get("/delete-product-crud", productController.handleDeleteProduct);
  router.post("/api/put-product-crud", productController.handlePutProduct);
  router.get(
    "/api/get-products-bycategory",
    productController.handleGetProductByCategory
  );

  //fetch product's information
  return app.use("/", router);
};
module.exports = initWebRoutes;
