const express = require("express");
const {
  addToCart,
  getOrderItem,
  deleteCart,
} = require("../controller/orderItemController");
const checkAuth = require("../middleware/checkAuth");

const router = express.Router();

router.post("/", checkAuth, addToCart);
router.get("/", checkAuth, getOrderItem);
router.delete("/:id", deleteCart);

module.exports = router;
