const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const requireAuth = async (req, res, next) => {
  // Get the token from the cookies
  const authorization = req.headers.cookie;

  if (!authorization) {
    return res.status(401).json({ error: "You must be logged in" });
  }

  try {
    // Verify the token
    const token = authorization.split("=")[1]; // Extract the token from the authorization string
    const { _id } = jwt.verify(token, process.env.JWT_SECRET);

    // Find the user associated with the token
    req.user = await User.findOne({ _id }).select("_id");
    next();
    
  } catch (err) {
    console.log(err);
    return res.status(401).json({ error: "You must be logged in" });
  }
};

module.exports = { requireAuth };
