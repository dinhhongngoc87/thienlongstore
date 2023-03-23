import db from "../models";
import CRUDServices from "../services/CRUDServices";

let getHomePage = async (req, res) => {
  try {
    let data = await db.User.findAll();

    return res.render("homepage.ejs", {
      data: JSON.stringify(data),
    });
  } catch (e) {
    console.log(e);
  }
  return res.render("homepage.ejs");
};

let getCRUD = (req, res) => {
  res.render("crud.ejs");
  return res.send("get crud from server");
};

//create new user
let postCRUD = async (req, res) => {
  console.log("arrive controller => data: ", req.body);
  console.log("arrive controller => data: ", req.file);
  if (
    !req.body.lastName ||
    !req.body.firstName ||
    !req.body.email ||
    !req.body.password1 ||
    !req.body.password2
  ) {
    res.status(500).json({
      errCode: 1,
      message: "Vui lòng điền đủ thông tin!",
    });
  } else if (req.body.password1 !== req.body.password2) {
    res.status(500).json({
      errCode: 2,
      message: "Mật khẩu không trùng khớp",
    });
  } else if (!checkEmail(req.body.email)) {
    return res.status(500).json({
      errCode: 2,
      message: "Email không hợp lệ",
    });
  }
  const imageUrl = req.file?.path;
  let response = await CRUDServices.createNewUser(req.body, imageUrl);
  return res.status(200).json({
    errCode: response.errCode,
    message: response.message,
  });
};

//check email input
let checkEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};
//fetch all users
let displayGetCRUD = async (req, res) => {
  let data = await CRUDServices.getAllUser();
  return res.send(data);
};
//edit user by id (fetch information by id)
let getEditCRUD = async (req, res) => {
  let userId = req.query.id;
  if (userId) {
    let userData = await CRUDServices.getUerInfoById(userId);
    return res.send(userData);
  } else {
    return res.send("from EDIT page");
  }
};
//update user
let putCRUD = async (req, res) => {
  console.log("EDIT CONTROLLER body: ", req.body);
  console.log("EDIT CONTROLLER file: ", req.file);
  const imageUrl = req.file?.path;
  let data = req.body;
  await CRUDServices.updateUserData(data, imageUrl);
  return res.send("update done");
};

//delete user by id
let getDeleteCRUD = async (req, res) => {
  let userId = req.query.id;
  if (userId) {
    await CRUDServices.deleteUserById(userId);
    return res.send("success");
  } else {
    return res.send(`faild`);
  }
};
module.exports = {
  getHomePage: getHomePage,
  getCRUD: getCRUD,
  postCRUD: postCRUD,
  displayGetCRUD: displayGetCRUD,
  getEditCRUD: getEditCRUD,
  getDeleteCRUD: getDeleteCRUD,
  putCRUD: putCRUD,
};
