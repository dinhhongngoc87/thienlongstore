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
  router.get("/edit-crud", homeController.getEditCRUD);
  router.get("/delete-crud", homeController.getDeleteCRUD);
  router.post("/put-crud", homeController.putCRUD);

  router.post("/api/login", userController.handleLogin);
  router.get("/api/get-all-products", productController.handleGetAllProducts);

  return app.use("/", router);
};
module.exports = initWebRoutes;
