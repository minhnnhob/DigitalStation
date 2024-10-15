const express = require("express");
const { requireAuth } = require("../middleware/requireAuth");
const {
  loginUser,
  registerUser,
  logoutUser,
  getUserById,
  getAuthUser,
  updateUser,
  getVerifyToken,
} = require("../controllers/userController");
const { uploadUser } = require("../config/cloudinary");

const router = express.Router();

router.post("/login", loginUser);

router.post("/register", registerUser);

router.get("/logout", logoutUser);

router.get("/:id/verify/:token", getVerifyToken);

router.use(requireAuth);

router.get("/", getAuthUser);

router.patch("/", uploadUser, updateUser);

router.get("/:id", getUserById);

module.exports = router;
