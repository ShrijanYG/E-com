const OrderItem = require("../model/orderItemModel");

const addToCart = async (req, res) => {
  const { product, quantity, size, color } = req.body;
  const user = req.user;

  if (!product || !quantity || !size || !color) {
    return res.status(400).send({ message: "please fill the fields" });
  }

  const existingProduct = await OrderItem.findOne({
    product,
    size,
    color,
    user,
  });

  if (existingProduct) {
    return res.status(404).send({ message: "Product already exist" });
  }

  const orderedItem = await OrderItem.create({
    product,
    quantity,
    user,
    size,
    color,
  });

  res.status(200).send({ message: "Product Added to cart", data: orderedItem });
};

const getOrderItem = async (req, res) => {
  try {
    const user = req.user;
    console.log(user);
    const product = await OrderItem.find({ user });
    res
      .status(200)
      .send({ message: "Cart fetched sucessfully", data: product });
  } catch (error) {
    console.log(error.message);
  }
};

const deleteCart = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(404).send({ message: "Please provide id" });
    }
    const item = await OrderItem.findByIdAndDelete({ _id: id });
    res.status(200).send({ message: "Cart deleted" });
  } catch (error) {
    console.log(error.message);
  }
};

const editCart = async (req, res) => {
  try {
    const { id } = req.params;

    const { product, color, size, quantity } = req.body;

    const user = req.user;

    const existingProduct = await OrderItem.findById({ _id: id });
    if (!existingProduct) {
      return res.status(404).send({ message: "item not found" });
    }

    const updatedCart = await OrderItem.findByIdAndUpdate(
      id,
      {
        product,
        color,
        size,
        quantity,
      },
      { new: true }
    );

    res.status(200).send({ message: "Cart updated", data: updatedCart });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = { addToCart, getOrderItem, deleteCart };
