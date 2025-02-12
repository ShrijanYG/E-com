const User = require("../model/userModel");

const jsonWebToken = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
  try {
    // console.log(req.body);
    const { name, email, password, address, phone } = req.body;

    if (!name || !email || !password || !address || !phone) {
      return res.status(400).send({ message: "please fill all the fields" });
    }

    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(400).send({ message: "existing user" });
    }

    const user = await User.create({
      name,
      email,
      password,
      address,
      phone,
    });
    res.status(200).send({ message: "user created sucessfully", data: user });
  } catch (error) {
    console.log(error.message);
  }
};

const getUser = async (req, res) => {
  const user = await User.find({});
  res.status(200).send({ message: "user fetched", data: user });
};

const login = async (req, res) => {
  try {
    console.log(req.body);
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(401).send({ message: "empty field!" });
    }

    const userExist = await User.findOne({ email: email });

    console.log(userExist);

    if (!userExist) {
      return res
        .status(401)
        .send({ message: "something wrong, please try again" });
    }

    const passwordMatch = await bcrypt.compare(password, userExist.password);

    if (!passwordMatch) {
      return res.status(400).send({ message: "something went wrong" });
    }

    const token = await jsonWebToken.sign(
      { id: userExist._id },
      process.env.SECRET_KEY,
      {
        expiresIn: "2d",
      }
    );


    res.status(200).send({
      message: "user loged in successfully",
      data: { userExist, token },
    });
  } catch (error) {
    console.log(error.message);
  }
};

const getMe = async (req, res) => {
  try {
    const user = req.user;

    res.status(200).send({ message: "user vaerified", data: user });
  } catch (error) {
    console.log(error.message);
  }
};

const changePassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { oldpassword, password } = req.body;

    const userExist = await User.findById({ _id: id });

    if (!userExist) {
      return res.status(401).send({ message: "User not found" });
    }
    const passwordMatch = await bcrypt.compare(oldpassword, userExist.password);

    if (!passwordMatch) {
      return res
        .status(400)
        .send({ message: "the old password doesnot match" });
    }

    const genSalt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, genSalt);

    await User.findByIdAndUpdate(id, {
      password: hashedPassword,
    });

    res.status(200).send({ message: "password changed succesfully" });
  } catch (error) {}
};

module.exports = { register, login, getUser, getMe, changePassword };
