const User = require("./userModel");
const bcrypt = require("bcryptjs");

const createAdminSeeder = async () => {
  try {
    const adminExist = await User.findOne({ email: "admin@gmail.com" });

    console.log(adminExist);
    if (adminExist) {
      return;
    }
    const genSalt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash("admin", genSalt);

    const admin = new User({
      name: "admin",
      email: "admin@gmail.com",
      password: "admin",
      role: "admin",
      phone: "1234567890",
      address: "address",
    });
    await admin.save();
    console.log("admin created");
  } catch (error) {
    console.log(error.message);
  }
};

createAdminSeeder();

module.exports = createAdminSeeder;
