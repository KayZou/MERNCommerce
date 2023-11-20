require("dotenv").config();
const jwt = require("jsonwebtoken");

const generateToken = (res, userId) => {
  const token = jwt.sign({ userId: userId }, process.env.JWT_KEY, {
    expiresIn: "1h",
  });

  // Log the JWT value
  // console.log(token);

  const cookieOptions = {
    path: "/",
    sameSite: "strict",
    httpOnly: true,
    secure: true,
  };

  res.cookie("jwt", token, cookieOptions);
};

module.exports = { generateToken };
