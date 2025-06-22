const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("./User");
const Category = require("./Category");
const Entry = require("./Entry");
const Budget = require("./Budget");

const SECRET_KEY = process.env.SECRET_KEY;

// Middleware to verify JWT
const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(403).json({ message: "Token required" });

  jwt.verify(token.split(" ")[1], SECRET_KEY, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    req.userId = decoded.id;
    next();
  });
};

// Register with name and password only
router.post("/register", async (req, res) => {
  const { name, password } = req.body;
  try {
    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ name, password: hashed });
    await user.save();
    res.status(201).json({ message: "Registered successfully" });
  } catch (err) {
    res.status(400).json({ error: "User already exists or invalid data" });
  }
});

// Login with name and password only
router.post("/login", async (req, res) => {
  const { name, password } = req.body;
  try {
    const user = await User.findOne({ name });
    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, SECRET_KEY);
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: "Login error" });
  }
});

// Get categories
router.get("/categories", verifyToken, async (req, res) => {
  try {
    const categories = await Category.find({ user: req.userId });
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch categories" });
  }
});

// Add entry
router.post("/entries", verifyToken, async (req, res) => {
  const { title, amount, categoryId, date } = req.body;
  try {
    const entry = new Entry({
      user: req.userId,
      title,
      amount,
      category: categoryId,
      date: date || new Date(),
    });
    await entry.save();
    res.status(201).json(entry);
  } catch (err) {
    res.status(500).json({ error: "Failed to add entry" });
  }
});

// Get entries
router.get("/entries", verifyToken, async (req, res) => {
  try {
    const entries = await Entry.find({ user: req.userId });
    res.json(entries);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch entries" });
  }
});

// Set or update budget
router.post("/budgets", verifyToken, async (req, res) => {
  const { categoryId, month, year, amount } = req.body;
  try {
    const existing = await Budget.findOneAndUpdate(
      { user: req.userId, category: categoryId, month, year },
      { amount },
      { new: true, upsert: true }
    );
    res.status(201).json(existing);
  } catch (err) {
    res.status(500).json({ error: "Failed to set budget" });
  }
});

// Get budgets
router.get("/budgets", verifyToken, async (req, res) => {
  try {
    const budgets = await Budget.find({ user: req.userId });
    res.json(budgets);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch budgets" });
  }
});

module.exports = router;
