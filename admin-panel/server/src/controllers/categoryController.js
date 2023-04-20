import db from "../models";
import categoryService from "../services/categoryService";

const handleGetAllCategory = async (req, res) => {
  let data = await categoryService.getAllCategory();
  return res.status(200).json(data);
};
const handlePutCategory = async (req, res) => {
  let id = req.body?.id;
  console.log("EDIT RES: ", req.body);
  if (!req.body.catName) {
    return res.send({
      errCode: 2,
      message: "Vui lòng điền đủ thông tin",
    });
  } else {
    let message = {};
    if (id) {
      message = await categoryService.updateCategory(req.body);
    } else {
      message = await categoryService.createCategory(req.body);
    }
    return res.send(message);
  }
};
module.exports = {
  handleGetAllCategory: handleGetAllCategory,
  handlePutCategory: handlePutCategory,
};
