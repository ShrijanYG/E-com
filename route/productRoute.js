const express = require("express");
const {
  createProduct,
  getProduct,
  deleteProduct,
  updateProduct,
} = require("../controller/productController");
const upload = require("../utils/upload");

const router = express.Router();

router.post("/create", upload.array("image", 10), createProduct);
router.get("/", getProduct);
router.delete("/:id", deleteProduct);
router.patch("/:id", upload.array("image", 10), updateProduct);

module.exports = router;
