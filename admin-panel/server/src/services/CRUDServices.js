import bcrypt from "bcryptjs";
import db from "../models";
const salt = bcrypt.genSaltSync(10);

//CREATE user
let createNewUser = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPasswordFromBcrypt = await hashUserPassword(data.password);
      console.log("data from service ");
      await db.User.create({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: hashPasswordFromBcrypt,
        roleId: data.roleId,
      });

      resolve("create user successfully");
    } catch (e) {
      reject(e);
    }
  });
};
let hashUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPassword = await bcrypt.hashSync(password, salt);
      resolve(hashPassword);
    } catch (e) {
      reject(e);
    }
  });
};
//DISPLAY all user
let getAllUser = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = db.User.findAll({ raw: true });
      resolve(users);
    } catch (e) {
      reject(e);
    }
  });
};
let getUerInfoById = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({ where: { id: userId }, raw: true });
      if (user) {
        resolve(user);
      } else {
        resolve({});
      }
    } catch (e) {
      reject(e);
    }
  });
};
// UPDATE user
let updateUserData = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: {
          id: data.id,
        },
      });
      if (user) {
        (user.firstName = data.firstName),
          (user.lastName = data.lastName),
          (user.address = data.address),
          (user.phone = data.phone);
        await user.save();
        resolve();
      } else {
        reject();
      }
    } catch (e) {
      console.log(e);
    }
  });
};
//DELETE user
let deleteUserById = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: {
          id: userId,
        },
      });

      if (user) {
        await user.destroy();
      }

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = {
  createNewUser: createNewUser,
  getAllUser: getAllUser,
  getUerInfoById: getUerInfoById,
  updateUserData: updateUserData,
  deleteUserById: deleteUserById,
};
