const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name:{
    type: String,
    required: true
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

  profilePicture:{
    type: String,
    default: "",
  },
  
  headline: {
    type: String,
  },

  city: {
    type: String,
  },
  country: {
    type: String
  },

  
  socialLinks: {
    website: String,
    twitter: String,
    instagram: String,
  },
  followers: [{ type: Schema.Types.ObjectId, ref: "User" }],
  following: [{ type: Schema.Types.ObjectId, ref: "User" }],
  feedPreferences: [String],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  isVe
});

//Register Function

userSchema.statics.register = async function (email, password) {
  //validation
  if (!email || !password) {
    throw Error("Email and password are required");
  }

  if (!validator.isEmail(email)) {
    throw Error("Email is invalid");
  }

  if (!validator.isStrongPassword(password)) {
    throw Error(
      "Password is not strong enough. Use at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character"
    );
  }

  const exists = await this.findOne({ email });

  if (exists) {
    throw new Error("User with this email already exists");
  }

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  const user = this.create({ email, password: hash });

  return user;
};

userSchema.statics.login = async function (email, password) {
  //validation
  if (!email || !password) {
    throw Error("Email and password are required");
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw new Error("User not found");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw new Error("Inncorect password");
  }
  return user;
};

module.exports = mongoose.model("User", userSchema);
