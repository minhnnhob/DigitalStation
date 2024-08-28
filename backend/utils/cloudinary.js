require("dotenv").config();

const cloudinaryModule = require("./cloudinaryModule");

const cloudinary = cloudinaryModule.cloudinary;
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  
});
