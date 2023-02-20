let handleLogin = (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  //check email exist
  if (!email || !password) {
    res.status(500).json({
      errCode: 1,
      message: "Missing inputs parameter!",
    });
  }
  //compare password
  //return userInfo
  //access token:JWT
  return res.status(200).json({
    errCode: 0,
    message: "hello",
    yourEmail: email,
  });
};

module.exports = {
  handleLogin: handleLogin,
};
