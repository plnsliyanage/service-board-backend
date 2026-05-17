import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user || user.password !== password) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // 🔐 FIXED: SAME SECRET USED EVERYWHERE
  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
      role: user.role,
    },
    "SECRET_KEY",
    { expiresIn: "1h" }
  );

  res.json({
    token,
    role: user.role,
  });
});

export default router;