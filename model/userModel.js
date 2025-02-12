const mongoose = require("mongoose");

const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    role: {
      enum: ["user", "admin"],
      type: String,
      default: "user",
    },
  },

  { timeStamp: true }
);

userSchema.pre("save", async function (next) {
  const genSalt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(this.password, genSalt);
  this.password = hashPassword;
  next();
});

const User = mongoose.model("user", userSchema);
module.exports = User;
