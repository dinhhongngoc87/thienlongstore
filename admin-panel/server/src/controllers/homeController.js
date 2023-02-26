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
  let message = await CRUDServices.createNewUser(req.body);
  console.log(message);
  return res.send("post crud from server");
};
//fetch all usera
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
  let data = req.body;
  await CRUDServices.updateUserData(data);
  return res.send("update done");
};

//delete user by id
let getDeleteCRUD = async (req, res) => {
  let userId = req.query.id;
  if (userId) {
    await CRUDServices.deleteUserById(userId);
    return res.send("Delete successfully");
  } else {
    return res.send(`Not found user`);
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
