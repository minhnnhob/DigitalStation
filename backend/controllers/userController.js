const User = require("../models/userModel");
const Topic = require("../models/topicModel");
const Follower = require("../models/followersModel");
const jwt = require("jsonwebtoken");
const VfToken = require("../models/vfTokenModel");
const cloudinary = require("cloudinary").v2;

const generateToken = (_id) => {
  return jwt.sign({ _id: _id }, process.env.JWT_SECRET, {
    expiresIn: "180d",
  });
};

const getVerifyToken = async (req, res) => {
  const id = req.params.id;

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
    console.log(userData.profilePicture);
    res.status(200).json({
      id: userData._id,
      email: userData.email,
      role: userData.userType,
      name: userData.name,
      profilePicture: userData.profilePicture,
    });
  } catch (error) {
    console.error("Error fetching authenticated user:", error.message);
    res.status(500).json({ error: "Server Error" });
  }
};

const getUserById = async (req, res) => {
  const id = req.user.id;

  try {
    const user = await User.findById(id).populate("interestedTopics", "name");

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
      userType: user.userType,

      hiring: user.hiring,
      experience: user.experience,
      proSumarry: user.proSumarry,
      resume: user.resume.link,
      skills: user.skills,
      resumeName: user.resume.resumeName,

      headline: user.headline,
      city: user.city,
      country: user.country,
      socialLinks: user.socialLinks,
      interestedTopics: user.interestedTopics,
      followersCount: followers,
      followingCount: following,
      createdAt: user.createdAt,
    };

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
    res.cookie("token", token, {
      httpOnly: true, // Prevent access by JavaScript
      secure: process.env.NODE_ENV === "production", // Use HTTPS in production
      sameSite: "Strict", // Strict CSRF prevention
    });
    res.status(200).json({
      email,
      
    });
   
  } catch (error) {
   
    console.error("Error logging in user:", error.message);
    res.status(400).json({ error: error.message });
  }
};

const registerUser = async (req, res) => {
  const { email, password, role, studioData } = req.body;

  try {
     await User.register(email, password, role, studioData);

    res.status(201).json({
      message:
        "An email has been sent to your email address. Please verify your email address to complete registration.",
    });
  } catch (error) {
    console.error("Error registering user:", error.message);
    res.status(400).json({ error: error.message });
  }
};

const logoutUser = async (req, res) => {
  res.clearCookie("token").json({ message: "Logged out" });
};

const updateUser = async (req, res) => {
  try {
    const id = req.user.id; // Get the user ID from the request object

    if (!id) {
      return res.status(400).json({ error: "User not found (!id)" });
    }

    const userData = req.body; // Extract all fields from the request body dynamically
    const resume = req.files.resume ? req.files.resume[0].path : null;
    userData.resume = resume; // Resume file path

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if the user is authorized to update this profile
    if (user._id.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ error: "Unauthorized to update this profile" });
    }
    // Handle interestedTopics if provided
    if (
      Array.isArray(userData.interestedTopics) &&
      userData.interestedTopics.length > 0
    ) {
      const interested = await Topic.find({
        name: { $in: userData.interestedTopics },
      });
      if (interested.length === 0) {
        return res.status(400).json({ error: "No valid topics found" });
      }
      userData.interestedTopics = interested;
    }

    if (userData.skills && Array.isArray(userData.skills)) {
      if (!Array.isArray(user.skills)) {
        user.skills = [];
      }
      userData.skills.forEach((skill, index) => {
        if (user.skills[index]) {
          user.skills[index] = skill;
        } else {
          user.skills.push(skill);
        }
      });
    } else if (userData.skills === null || userData.skills === "") {
      userData.skills = [];
    }

    if (Array.isArray(userData.experience)) {
      // If experience exists in request
      user.experience = []; // Reset existing experiences

      if (userData.experience.length > 0) {
        // Process each experience if array is not empty
        userData.experience.forEach((exp) => {
          const formattedExp = {
            company: exp.company || "",
            title: exp.title || "",
            country: exp.country || "",
            city: exp.city || "",
            startDate: exp.startDate ? new Date(exp.startDate) : null,
            endDate:
              exp.endDate && exp.endDate !== "null"
                ? new Date(exp.endDate)
                : null,
            currentlyWorking:
              exp.currentlyWorking === "true" || exp.currentlyWorking === true,
            description: exp.description || "",
          };
          user.experience.push(formattedExp);
        });
      }
    } else if (userData.experience === null || userData.experience === "") {
      // Handle null or empty string case
      userData.experience = [];
    }

    // If files are present in the request, upload them to Cloudinary
    if (req.files) {
      // Upload profile picture if present
      if (req.files.profilePicture) {
        const profilePic = req.files.profilePicture[0];
        userData.profilePicture = profilePic.path; // Add profile picture to userData
      }

      // Upload cover picture if present
      if (req.files.coverPicture) {
        const coverPic = req.files.coverPicture[0];
        userData.coverPicture = coverPic.path; // Add cover picture to userData
      }
    }

    if (userData.resume) {
      const resume = req.files.resume[0];
      userData.resume = {
        link: resume.path,
        resumeName: resume.originalname,
      };
    }

    // Update the user document with new information dynamically
    const updatedUser = await User.findByIdAndUpdate(id, userData, {
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
};
