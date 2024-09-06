const express = require("express");
const { requireAuth } = require("../middleware/requireAuth");
const {
  loginUser,
  registerUser,
  logoutUser,
  getUserById,
  getAuthUser,
  updateUser,
} = require("../controllers/userController");

const router = express.Router();

router.post("/login", loginUser);

router.post("/register", registerUser);

router.get("/logout", logoutUser);



router.use(requireAuth);

router.get('/',getAuthUser);

router.patch("/:id", updateUser);
router.get("/:id", getUserById);

module.exports = router;
