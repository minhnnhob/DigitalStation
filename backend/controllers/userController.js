const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const generateToken = (_id) => {
  return jwt.sign({ _id: _id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

// const getUserById = async (req, res) => {
//   const id = req.params.id;

//   try {
//     const user = await User.findById(id);

//     res.status(200).json(user);
//   } catch (error) {
//     res.status(404).json({ error: error.message });
//   }
// };

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    // create jwt token

    const token = generateToken(user._id);

    res.cookie( "token", token);

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

    const token = generateToken(user._id);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const logoutUser = async (req, res) => {
  
  res.clearCookie("token").json({ message: "Logged out" });
};

module.exports = { loginUser, registerUser, logoutUser };
