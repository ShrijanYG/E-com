const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dazncdsfu",
  api_key: "181541155353664",
  api_secret: "eOyxMTFiTa3Xv75beUnMqRpALME", // Click 'View API Keys' above to copy your API secret
});

module.exports = cloudinary;
