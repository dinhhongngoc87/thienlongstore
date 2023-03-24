import db from "../models";

let getAllCategory = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = {};
      let categories = await db.Category.findAll();
      if (categories) {
        data.errCode = 0;
        data.message = "Lấy dữ liệu thành công";
        data.categories = categories;
      } else {
        data.errCode = 0;
        data.message = "Lấy dữ liệu thất bại";
        data.categories = [];
      }
      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};
let createCategory = (data) => {
  console.log("CATNAME: ", data.catName);
  return new Promise(async (resolve, reject) => {
    try {
      await db.Category.create({
        catName: data.catName,
      });
      resolve({
        errCode: 0,
        message: "Thêm thành công",
      });
    } catch (e) {
      reject({
        errCode: 1,
        message: "Có lỗi xảy ra",
      });
    }
  });
};
let updateCategory = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.Category.update(
        {
          catName: data.catName,
        },
        {
          where: {
            id: data.id,
          },
        }
      );
      resolve({
        errCode: 0,
        message: "Cập nhật thành công",
      });
    } catch (e) {
      reject({
        errCode: 1,
        message: "Có lỗi xảy ra",
      });
    }
  });
};
module.exports = {
  getAllCategory: getAllCategory,
  createCategory: createCategory,
  updateCategory: updateCategory,
};
