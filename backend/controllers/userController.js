const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const VfToken = require("../models/vfTokenModel");

const generateToken = (_id) => {
  return jwt.sign({ _id: _id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

const getVerifyToken = async (req, res) => {
  const id = req.params.id;
  console.log(id);
  try {
    const user = await User.findOne({ _id: id });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const token = await VfToken.findOne({
      userId: id,
      tokenVf: req.params.token,
    });
    if (!token) {
      return res.status(404).json({ error: "Token not found" });
    }

    await User.updateOne({ _id: user._id }, { isVerified: true });
    await token.deleteOne({ userId: user._id });
    res.status(200).json({ message: "Email verified" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server Error" });
  }
};

const getAuthUser = async (req, res) => {
  try {
    // Assuming `req.user` contains the authenticated user's information.
    const user = req.user;

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const userData = await User.findById(req.user._id);

    // Structure the response to include only the necessary user details

    res.status(200).json({
      id: userData._id,
      email: userData.email,
      role: userData.role,
      name: userData.name,
    });
  } catch (error) {
    console.error("Error fetching authenticated user:", error.message);
    res.status(500).json({ error: "Server Error" });
  }
};

const getUserById = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await User.findById(id).select(
      "name , email , email name profilePicture followers following feedPreferences headline city country"
    );

    followersCount = user.followers.length;
    followingCount = user.following.length;

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    userData = {
      id: user._id,
      email: user.email,
      name: user.name,
      profilePicture: user.profilePicture,
      followers: user.followers,
      following: user.following,
      feedPreferences: user.feedPreferences,
      headline: user.headline,
      city: user.city,
      country: user.country,
      followersCount,
      followingCount,
    };

    console.log(userData);

    res.status(200).json(userData);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    // create jwt token

    const token = generateToken(user._id);

    res.cookie("token", token);

    res.status(200).json({ email, userId: user._id, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const registerUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.register(email, password);

    // create jwt token

    // const token = generateToken(user._id);

    res.status(201).json({
      message:
        "An email has been sent to your email address. Please verify your email address to complete registration.",
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const logoutUser = async (req, res) => {
  res.clearCookie("token").json({ message: "Logged out" });
};

const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const updates = req.body;
    const user = await User.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    //
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = {
  loginUser,
  registerUser,
  logoutUser,
  getUserById,
  getAuthUser,
  updateUser,
  getVerifyToken,
};
