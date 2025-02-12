// const User = require("../model/userModel");
const jsonWebToken = require("jsonwebtoken");

const User = require("../model/userModel");

const checkAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    console.log(token);

    if (!token) {
      return res.status(401).send({ message: "unauthorized access" });
    }

    const splitToken = token.split(" ")[1];

    //veify token

    const decodedToken = await jsonWebToken.verify(
      splitToken,
      process.env.SECRET_KEY
    );

    if (!decodedToken) {
      return res.status(401).send({ message: "Invalid Token" });
    }

    console.log(decodedToken, "decoded");

    const user = await User.findById({ _id: decodedToken?.id });

    // console.log(user);

    req.user = user;
    next();
  } catch (error) {}
};

module.exports = checkAuth;
