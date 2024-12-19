const express = require("express");
const generateToken = require("../utils/generateToken");

const router = express.Router();

const users = [];


router.post("/register", (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const userExists = users.find((user) => user.email === email);
  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }

  const newUser = { id: Date.now(), name, email, password };
  users.push(newUser);

  res.status(201).json({ message: "User registered successfully" });
});

// Login route
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  const user = users.find((user) => user.email === email && user.password === password);

  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const token = generateToken(user.id);
  res.json({ token });
});

module.exports = router;
