import userService from "../services/userService";

let handleLogin = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  //check email exist
  if (!email || !password) {
    res.status(500).json({
      errCode: 1,
      message: "Missing inputs parameter!",
    });
  }
  let userData = await userService.handleUserLogin(email, password);
  //compare password
  //return userInfo
  //access token:JWT
  return res.status(200).json({
    errCode: userData.errCode,
    message: userData.errMessage,
    user: userData.user ? userData : {},
  });
};

module.exports = {
  handleLogin: handleLogin,
};
