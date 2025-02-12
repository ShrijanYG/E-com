const express = require("express");
const {
  register,
  login,
  getUser,
  getMe,
  changePassword,
} = require("../controller/userController");
const checkAuth = require("../middleware/checkAuth");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/", getUser);
router.get("/getme", checkAuth, getMe);

router.patch("/changepw/:id", changePassword);

module.exports = router;
