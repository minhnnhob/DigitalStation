const express = require("express");
const { requireAuth } = require("../middleware/requireAuth");
const {
  loginUser,
  registerUser,
  logoutUser,
  getUserById,
  getAuthUser,
} = require("../controllers/userController");

const router = express.Router();

router.post("/login", loginUser);

router.post("/register", registerUser);

router.get("/logout", logoutUser);

router.get("/:id", getUserById);

router.use(requireAuth);

router.get('/',getAuthUser);

module.exports = router;
