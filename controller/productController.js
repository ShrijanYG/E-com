const Product = require("../model/productModel");

const cloudinary = require("cloudinary");

const createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      quantity,
      color,
      size,
      discount,
      slug,
      category,
    } = req.body;

    console.log(req.body);

    console.log(req.files);
    if (
      !name ||
      !description ||
      !price ||
      !quantity ||
      !color ||
      !size ||
      !discount ||
      !slug ||
      !category ||
      !req.files
    ) {
      res.status(401).send({ message: "please fill all fields" });
    }

    let imageFiles = [];
    if (req.files.length) {
      for (const file of req.files) {
        const image = await cloudinary.uploader
          .upload(file.path)
          .catch((error) => {
            console.log(error);
          });
        const neededData = {
          url: image.secure_url,
          public_id: image.public_id,
          api_key: image.api_key,
        };
        imageFiles.push(neededData);
      }
    }

    const parsedColor = JSON.parse(color);
    const parsedSize = JSON.parse(size);

    const product = await Product.create({
      name,
      description,
      price,
      quantity,
      color: parsedColor,
      slug,
      category,
      discount,
      size: parsedSize,
      image: imageFiles,
    });

    res.status(200).send({ message: "Product Created", data: product });
  } catch (error) {
    console.log(error.message);
  }
};

const getProduct = async (req, res) => {
  try {
    const { category_id, color, minPrice, maxPrice } = req.query;

    const filter = {};

    if (category_id) {
      filter.category = category_id;
    }

    if (color) {
      filter.color = color;
    }

    if (minPrice) {
      filter.price = { ...filter.price, minPrice: { $gte: Number(minPrice) } };
    }

    if (maxPrice) {
      filter.price = { ...filter.price, maxPrice: { $lte: Number(maxPrice) } };
    }

    // if (minPrice && maxPrice) {
    //   filter.price = {
    //     ...filter.price,
    //     minPrice: { $gte: Number(minPrice) },
    //     maxPrice: { $lte: Number(maxPrice) },
    //   };
    // }

    // if (category_id || color) {
    //   const products = await Product.find({
    //     ...(category_id && { category: category_id }),
    //     ...(color && { color: color }),
    //   });
    //   console.log(products);
    //   return res.status(200).send({ message: "Products", data: products });
    // }

    // if (filter.length) {
    //   const product = await Product.find(filter);
    //   return res
    //     .status(200)
    //     .send({ message: "Filtered product", data: product });
    // }

    console.log(filter);
    const product = await Product.find({});
    res.status(200).send({ message: "Products fetched", data: product });
  } catch (error) {
    console.log(error.message);
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(404).send({ message: "Please provide id" });
  }
  const deletedProduct = await Product.findByIdAndDelete({ _id: id });
  res.status(202).send({ message: "Product deleted", data: deleteProduct });
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      name,
      description,
      price,
      quantity,
      color,
      size,
      discount,
      slug,
      category,
    } = req.body;
    console.log(req.body);
    const exist = await Product.findById({ _id: id });

    console.log(exist, "this is test");
    if (!exist) {
      return res.status(401).send({ message: "product not found" });
    }
    let imageFiles = [];

    if (req.files.length) {
      for (const file of req.files) {
        const image = await cloudinary.uploader
          .upload(file.path)
          .catch((error) => {
            console.log(error);
          });
        const neededData = {
          url: image.secure_url,
          public_id: image.public_id,
          api_key: image.api_key,
        };
        imageFiles.push(neededData);
      }
    }
    console.log("first");
    let parsedColor;
    let parsedSize;
    if (color) {
      parsedColor = JSON.parse(color);
    }
    if (size) {
      parsedSize = JSON.parse(size);
    }

    console.log(parsedColor, parsedSize);
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        name,
        description,
        price,
        quantity,
        color: parsedColor,
        size: parsedSize,
        discount,
        slug,
        category,
        image: imageFiles.concat(exist.image),
      },
      { new: true }
    );

    res.status(201).send({ message: "Product Updated", data: updatedProduct });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { createProduct, getProduct, deleteProduct, updateProduct };
