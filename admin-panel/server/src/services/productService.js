import db from "../models";

let getAllProduct = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let products = await db.Product.findAll({
        attributes: { exclude: ["description"] },
      });
      let categories = await db.Category.findAll({
        attributes: ["id", "catName"],
      });
      let suppliers = await db.Supplier.findAll();
      resolve({
        products,
        categories,
        suppliers,
      });
    } catch (e) {
      reject(e);
    }
  });
};
let getProductById = (productId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (productId) {
        let productInfo = await db.Product.findOne({
          where: { id: productId },
        });
        resolve(productInfo);
      }
    } catch (e) {
      reject(e);
    }
  });
};

let updateProductData = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.Product.update(
        {
          productName: data.productName,
          catId: data.catId,
          supplierId: data.supplierId,
          description: data.description,
          images: data.images,
          price: data.price,
          discount: data.discount,
          quantity: data.quantity,
        },
        {
          where: {
            id: data.id,
          },
        }
      )
        .then(resolve())
        .catch(reject());
    } catch (e) {
      console.log(e);
    }
  });
};

let createNewProduct = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.Product.create({
        productName: data.productName,
        catId: data.catId,
        supplierId: data.supplierId,
        description: data.description,
        images: data.images,
        price: data.price ? data.price : "",
        discount: data.discount,
        stockId: data.quantity > 0 ? "SK1" : "SK2",
        quantity: data.quantity,
      });

      resolve("create product successfully");
    } catch (e) {
      rs;
    }
  });
};
let deleteProductById = (productId) => {
  return db.Product.destroy({ where: { id: productId } }).then((rows) =>
    Promise.resolve(rows === 1).catch((e) => {
      reject(e);
    })
  );
};
let getProductByCategory = (catId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (catId) {
        let products = await db.Product.findAll({
          where: { catId: catId },
        });
        resolve(products);
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  getAllProduct: getAllProduct,
  getProductById: getProductById,
  updateProductData: updateProductData,
  deleteProductById: deleteProductById,
  getProductByCategory: getProductByCategory,
  createNewProduct: createNewProduct,
};
