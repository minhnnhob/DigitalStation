const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const VfToken = require("../models/vfTokenModel");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
require("dotenv").config();

const Studio = require("./studioModel");
const { link } = require("fs");
const { title } = require("process");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    // Account Information
    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    userType: {
      type: String,
      enum: ["artist", "studio", "admin"],
      default: "artist",
    },

    status: {
      type: String,
      enum: ["active", "inactive", "suspended"],
      default: "active",
    },

    studioId: {
      type: Schema.Types.ObjectId,
      ref: "Studio",
    },

    isBanned: { type: Boolean, default: false },

    // personal information
    name: {
      type: String,
      // required: true,
    },

    proSumarry: {
      type: String,
    },

    profilePicture: {
      type: String,
      default: "",
    },

    coverPicture: {
      type: String,
      default: "",
    },

    city: {
      type: String,
    },
    country: {
      type: String,
    },

    // Artist Information
    headline: {
      type: String,
    },

    socialLinks: [
      {
        platform: String,
        url: String,
      },
    ],

    skills: [
      {
        type: String,
      },
    ],

    hiring: [
      {
        type: String,
      },
    ],

    experience: [
      {
        jobTitle: String,
        title: String,
        company: String,
        coutry: String,
        city: String,
        startDate: Date,
        endDate: Date,
        description: String,
      },
    ],

    education: [
      { institution: String, degree: String, startDate: Date, endDate: Date },
    ],

    resume: {
      link : String,
      resumeName: String,
    } ,
    interestedTopics: [
      {
        type: Schema.Types.ObjectId,
        ref: "Topic",
      },
    ],

    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

//Register Function
userSchema.statics.register = async function (
  email,
  password,
  role,
  studioData = null
) {
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

  if (!role) {
    console.log(role);
    throw Error("Role is invalid");
  }

  const exists = await this.findOne({ email });

  if (exists) {
    throw new Error("User with this email already exists");
  }

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  let user = null;

  if (role === "artist") {
    user = await this.create({
      email,
      password: hash,
      userType: role,
    });

    const tokenVf = await new VfToken({
      userId: user._id,
      tokenVf: crypto.randomBytes(32).toString("hex"),
    }).save();

    const url = `${process.env.API_ENDPOINT}/api/users/${user._id}/verify/${tokenVf.tokenVf}`;
    await sendEmail(user.email, "Verify your email", url);
  }

  // If the user is HR, create a studio profile
  if (role === "studio") {
    if (!studioData || !studioData.name || !studioData.contactInfor) {
      throw Error("Studio information is incomplete");
    }

    user = await this.create({
      email,
      password: hash,
      userType: role,
    });

    const tokenVf = await new VfToken({
      userId: user._id,
      tokenVf: crypto.randomBytes(32).toString("hex"),
    }).save();

    const studio = await Studio.create({
      name: studioData.name,
      studioAdminId: user._id,
      description: studioData.description,
      contactInfor: studioData.contactInfor,
    });

    user.studioId = studio._id;
    await user.save();

    const url = `${process.env.API_ENDPOINT}/api/users/${user._id}/verify/${tokenVf.tokenVf}`;
    await sendEmail(user.email, "Verify your email", url);
  }

  console.log(user);

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
      const url = `${process.env.API_ENDPOINT}/api/users/${user._id}/verify/${tokenVf.tokenVf}`;
      await sendEmail(user.email, "Verify your email", url);
    }
    throw new Error("An Email sent your account please check");
  }
  return user;
};

module.exports = mongoose.model("User", userSchema);
