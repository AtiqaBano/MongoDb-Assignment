const express = require("express");
const router = express.Router();

const User = require("../models/User");

const {
  register,
  login,
  logout,
} = require("../controllers/authController");

const protect = require("../middleware/authMiddleware");


// Register
router.post("/register", register);


// Login
router.post("/login", login);


// Logout
router.post("/logout", logout);


// Protected Profile
router.get("/profile", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select(
      "-password"
    );

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.json({
      message: "Profile fetched successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {
    console.error("Profile error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
});


module.exports = router;