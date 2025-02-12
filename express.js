const express = require("express");
const app = express();
const port = 5000;

const userRoute = require("./route/userRoute");
const categoryRoute = require("./route/categoryRoute");
const productRoute = require("./route/productRoute");
const orderItemRoute = require("./route/orderItemRoute");
const cors = require("cors");

const stripe = require("stripe")(
  "sk_test_51QhLw6KQpfttRLn4AC7RNcA33IZxxraWSChI4LaggxEA8qA0asI0AEQqpNbeLoucorhBkkc83EErjyX4TM8hYFJZ00CUMffuhD"
);

app.use(express.json());

app.use(cors());

require("dotenv").config();
require("./utils/database");

require("./model/seeds")

app.use("/api/categories", categoryRoute);
app.use("/api/users", userRoute);
app.use("/api/product", productRoute);
app.use("/api/addtocart", orderItemRoute);

//payment

app.post("/create-checkout-session", async (req, res) => {
  const orderitems = [
    {
      _id: "123",
      price: 30000,
      quantity: 1,
      name: "Tshirt",
    },
    {
      _id: "133",
      price: 4000,
      quantity: 2,
      name: "pant",
    },
    {
      _id: "143",
      price: 40,
      quantity: 3,
      name: "shoes",
    },
  ];

  const formatted_data = orderitems.map((item) => {
    return {
      price_data: {
        currency: "npr",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price,
      },
      quantity: item.quantity,
    };
  });

  console.log(formatted_data, "asdasdasd");

  const session = await stripe.checkout.sessions.create({
    line_items: formatted_data,
    mode: "payment",
    success_url: `${process.env.FRONTEND_URL}?success=true`,
    cancel_url: `${process.env.FRONTEND_URL}?canceled=true`,
  });

  res.redirect(303, session.url);
});

app.listen(port, () => {
  console.log(`running on port ${port}`);
});
