import db from "../models";

let getAllProduct = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let products = await db.Product.findAll({
        // attributes: { exclude: ["description"] },
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

let updateProductData = (data, imageUrl) => {
  return new Promise(async (resolve, reject) => {
    try {
      let infor = {};
      await db.Product.update(
        {
          productName: data.productName,
          catId: data.catId,
          supplierId: data.supplierId,
          description: data.description,
          images: imageUrl,
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
        .then(() => {
          infor.errCode = 0;
          infor.message = "Sửa thành công";
          resolve(infor);
        })
        .catch(() => {
          infor.errCode = 1;
          infor.message = "Lưu thất bại";
          resolve(infor);
        });
    } catch (e) {
      console.log(e);
    }
  });
};

let createNewProduct = (data, imageUrl) => {
  return new Promise(async (resolve, reject) => {
    try {
      let infor = {};
      await db.Product.create({
        productName: data.productName,
        catId: data?.catId,
        supplierId: data?.supplierId,
        description: data.description,
        images: imageUrl,
        price: data.price ? data.price : "",
        discount: data.discount,
        stockId: data.quantity > 0 ? "SK1" : "SK2",
        quantity: data.quantity,
      });
      infor.errCode = 0;
      infor.message = "Thêm thành công";
      resolve(infor);
    } catch (e) {
      reject(e);
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
          limit: 5,
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
