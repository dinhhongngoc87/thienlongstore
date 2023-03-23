import bcrypt from "bcryptjs";
import db from "../models";
const salt = bcrypt.genSaltSync(10);

//CREATE user
let createNewUser = async (data, imageUrl = null) => {
  console.log("CRUD DATA: ", data);
  return new Promise(async (resolve, reject) => {
    try {
      let infor = {};
      let hashPasswordFromBcrypt = await hashUserPassword(data.password1);
      let isExist = await findUserInDB(data.email);
      console.log("Kiểm tra tồn tại : ", isExist);
      if (!isExist) {
        console.log("Email không tồn tại");
        await db.User.create({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          password: hashPasswordFromBcrypt,
          address: data.address ? data.address : "",
          phone: data.phone ? data.phone : "",
          avatar: imageUrl,
          roleId: data.roleId,
        });
        infor.errCode = 0;
        infor.message = "Đăng ký thành công";
      } else {
        console.log("Email tồn tại");
        infor.errCode = 3;
        infor.message = "Email đã tồn tại";
      }
      resolve(infor);
    } catch (e) {
      reject(e);
    }
  });
};
//check if user exist in DB
let findUserInDB = (email) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { email: email },
      });
      if (user) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (e) {
      reject(false);
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
let updateUserData = (data, imageUrl = null) => {
  return new Promise(async (resolve, reject) => {
    console.log("SERVEICE ", data);
    try {
      await db.User.update(
        {
          firstName: data.firstName,
          lastName: data.lastName,
          address: data.address,
          avatar: imageUrl,
          phone: data.phone,
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
//DELETE user
let deleteUserById = (userId) => {
  return db.User.destroy({ where: { id: userId } }).then((rows) =>
    Promise.resolve(rows === 1).catch((e) => {
      reject(e);
    })
  );

  // return new Promise(async (resolve, reject) => {
  //   try {
  //     let user = await db.User.findOne({
  //       where: {
  //         id: userId,
  //       },
  //     });

  //     if (user) {
  //       await user.destroy();
  //     }

  //     resolve();
  //   } catch (e) {
  //     reject(e);
  //   }
  // });
};
module.exports = {
  createNewUser: createNewUser,
  getAllUser: getAllUser,
  getUerInfoById: getUerInfoById,
  updateUserData: updateUserData,
  deleteUserById: deleteUserById,
};
