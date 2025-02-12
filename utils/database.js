const mongoose = require("mongoose");

mongoose
  .connect(process.env.mongo_url)
  .then(() => {
    console.log("connected to databse");
  })
  .catch((error) => {
    console.log("failed to conect to db", error);
  });
