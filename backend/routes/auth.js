const express = require("express");
const router = express.Router();
const User = require("../models/User.js");
const bcrypt = require("bcryptjs");

const generateRandomAvatar = () => {
  const randomAvatar = Math.floor(Math.random() * 71);
  return `https://i.pravatar.cc/300?img=${randomAvatar} `;
};

//kullanıcı Olursturma

router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const defaultAvatar = generateRandomAvatar();

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ error: "Kullanıcı zaten mevcut." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await new User({
      username,
      email,
      password: hashedPassword,
      avatar: defaultAvatar,
    });
    await newUser.save();

    res.status(201).json({ newUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server Error" });
  }
});

module.exports = router;
