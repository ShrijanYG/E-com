const Category = require("../model/categoryModel");
const cloudinary = require("../utils/cloudinary");

const createCategory = async (req, res) => {
  try {
    const { type } = req.body;
    if (!type) {
      return res.status(401).send({ message: "type not defined" });
    }
    if (!req.file) {
      return res.status(401).send({ message: "image not defined" });
    }

    console.log(req.file);

    const image = await cloudinary.uploader
      .upload(req.file.path)
      .catch((error) => {
        console.log(error);
      });

    const category = new Category({
      type,
      image: {
        url: image.secure_url,
        public_id: image.public_id,
        api_key: image.api_key,
      },
    });

    await category.save();

    res
      .status(200)
      .send({ message: "category created sucessfully", data: category });
  } catch (error) {}
};

const getCategory = async (req, res) => {
  const category = await Category.find({});
  res.status(200).send({ message: "categories fetched", data: category });
};

const getSingleCategory = async (req, res) => {
  try {
    const { id } = req.params;

    console.log(id);

    const existingCategory = await Category.findById({ _id: id });
    if (!existingCategory) {
      return res
        .status(401)
        .send({ message: "cluldn't find category with id" });
    }
    res
      .status(200)
      .send({ message: "category fetched", data: existingCategory });
  } catch (error) {
    console.log(error.message);
  }
};

const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { type } = req.body;

    // if (!type) {
    //   return res.status(400).send({ message: "Please specify type" });
    // }

    const categoryExist = await Category.findById({ _id: id });

    console.log(id);

    if (!categoryExist) {
      return res.status(401).send({ message: "the category doesnot exist" });
    }

    let image;
    if (req.file) {
      image = await cloudinary.uploader.upload(req.file.path).catch((error) => {
        console.log(error);
      });
      await cloudinary.uploader.destroy(categoryExist.image.public_id);
    }

    const updatedCategory = await Category.findByIdAndUpdate(id, {
      type,
      ...(req.file && {
        image: {
          url: image.secure_url,
          public_id: image.public_id,
        },
      }),
    });

    const fetchCategory = await Category.findById({ _id: id });

    res
      .status(200)
      .send({ message: "category updated sucessfully", data: fetchCategory });
  } catch (error) {}
};

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const existingCat = await Category.findByIdAndDelete({ _id: id });

    if (!existingCat) {
      return res.status(401).send({ message: "couldn't find category" });
    }
    res.status(200).send({ message: "Category deleted" });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  createCategory,
  updateCategory,
  getCategory,
  getSingleCategory,
  deleteCategory,
};
