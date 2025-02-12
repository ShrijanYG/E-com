const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    type: {
      type: String,
      require: true,
    },

    image: {
      type: Object,
      require: true,
    },
  },
  { timeStamps: true }
);

const Category = mongoose.model("category",categorySchema)
module.exports = Category;