const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");
const VfToken = require("../models/vfTokenModel");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    // required: true,
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

  profilePicture: {
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
    type: String,
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
  isVerified: {
    type: Boolean,
    default: false,
  },
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

  const user = await this.create({
    email,
    password: hash,
  });

  const tokenVf = await new VfToken({
    userId: user._id,
    tokenVf: crypto.randomBytes(32).toString("hex"),
  }).save();

  // await tokenVf.save();

  const url = `http://localhost:4000/api/users/${user._id}/verify/${tokenVf.tokenVf}`;
  await sendEmail(user.email, "Verify your email", url);

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

  if (!user.isVerified) {
    const token = await VfToken.findOne({ userId: user._id });

    if (!token) {
      const tokenVf = await new VfToken({
        userId: user._id,
        tokenVf: crypto.randomBytes(32).toString("hex"),
      }).save();
      const url = `http://localhost:4000/api/users/${user._id}/verify/${tokenVf.tokenVf}`;
      await sendEmail(user.email, "Verify your email", url);
    }
    throw new Error("An Email sent your account please check");
  }
  return user;
};

module.exports = mongoose.model("User", userSchema);
