const express = require("express");
const {
  loginUser,
  registerUser,
  logoutUser,
  getUserById,
} = require("../controllers/userController");

const router = express.Router();

router.get("/:id", getUserById);

router.post("/login", loginUser);

router.post("/register", registerUser);

router.get("/logout", logoutUser);

module.exports = router;
