const express = require("express");

const {
  createOrder,
  deleteOrder,
  getOrder,
} = require("../controller/orderController");

const router = express.Router();

router.get("/", getOrder);
router.post("/", createOrder);
router.delete("/:id", checkAuth, deleteOrder);

module.exports = router;
