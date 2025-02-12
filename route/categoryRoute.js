const express = require("express");
const {
  createCategory,
  updateCategory,
  getCategory,
  getSingleCategory,
  deleteCategory,
} = require("../controller/categoryController");
const upload = require("../utils/upload");
const router = express.Router();

router.post("/create", upload.single("image"), createCategory);
router.patch("/update/:id", upload.single("image"), updateCategory);
router.get("/", getCategory);
router.get("/:id", getSingleCategory);
router.delete("/:id", deleteCategory);

module.exports = router;
