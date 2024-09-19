const User = require("../models/userModel");
const Follower = require("../models/followersModel");
const jwt = require("jsonwebtoken");
const VfToken = require("../models/vfTokenModel");
const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    let folder = "profilePicture"; // Default folder for user uploads

    // Determine which folder to store the file in based on file field
    if (file.mimetype.fieldname === "profilePicture") {
      folder = "profilePicture";
    } else if (file.fieldname === "coverPicture") {
      folder = "coverPicture";
    }

    return {
      folder: folder,
      public_id: file.originalname.split(".")[0], // Store with the original file name (excluding extension)
      resource_type: "auto", // Automatically detect resource type (image, video, etc.)
    };
  },
});

// Set up multer with Cloudinary storage for profile and cover pictures
const upload = multer({ storage: storage }).fields([
  { name: "profilePicture", maxCount: 1 },
  { name: "coverPicture", maxCount: 1 },
]);

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
      profilePicture: userData.profilePicture,
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
      " email name profilePicture coverPicture interestedTopics headline city country socialLinks"
    );

    const followers = await Follower.countDocuments({ followingId: id });
    const following = await Follower.countDocuments({ followerId: id });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    userData = {
      id: user._id,
      email: user.email,
      name: user.name,
      profilePicture: user.profilePicture,
      coverPicture: user.coverPicture,
      interestedTopics: user.interestedTopics,
      headline: user.headline,
      city: user.city,
      country: user.country,
      socialLinks: user.socialLinks,

      followersCount: followers,
      followingCount: following,
      
    };

    console.log(userData);

    res.status(200).json(userData);
  } catch (error) {
    console.error("Error fetching user by ID:", error.message);
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
    const id = req.params.id; // Get userId from the URL parameters
    const { name, headline, city, country } = req.body; // Extract other fields from the request body
    let profilePicture, coverPicture; // Variables to store URLs for uploaded images

    // Find the user by ID
    const user = await User.findById(id);

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if the user is authorized to update this profile (you may want to add more checks here)
    if (user._id.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ error: "Unauthorized to update this profile" });
    }

    // If files are present in the request, upload them to Cloudinary
    if (req.files) {
      // Upload profile picture if present
      if (req.files.profilePicture) {
        const profilePic = req.files.profilePicture[0];
        const profileUploadResult = await cloudinary.uploader.upload(
          profilePic.path,
          {
            folder: "profilePictures",
          }
        );
        profilePicture = profileUploadResult.secure_url;
      }

      // Upload cover picture if present
      if (req.files.coverPicture) {
        const coverPic = req.files.coverPicture[0];
        const coverUploadResult = await cloudinary.uploader.upload(
          coverPic.path,
          {
            folder: "coverPictures",
          }
        );
        coverPicture = coverUploadResult.secure_url;
      }
    }

    // Prepare updates with the new data
    const updates = {
      name: name || user.name,
      headline: headline || user.headline,
      city: city || user.city,
      country: country || user.country,
      profilePicture: profilePicture || user.profilePicture,
      coverPicture: coverPicture || user.coverPicture,
    };

    // Update the user document with new information
    const updatedUser = await User.findByIdAndUpdate(id, updates, {
      new: true, // Return the updated document
      runValidators: true, // Ensure validators are run for updated fields
    });

    // Return the updated user information
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error.message);
    res.status(500).json({ error: "Server Error" });
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
  upload,
};
