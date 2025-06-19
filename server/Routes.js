const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./User');
const Category = require('./Category');
const Budget = require('./Budget');

// 🔐 Register Route
router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res.status(400).json({ error: 'Username and password are required' });

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Error registering user', details: err });
  }
});

// 🛂 Login Route with Debug Logs
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  console.log('Login request received for:', username);

  if (!username || !password)
    return res.status(400).json({ error: 'Username and password are required' });

  try {
    const user = await User.findOne({ username });
    console.log('User found:', user);

    if (!user) return res.status(401).json({ error: 'Invalid username or password' });

    const passwordMatch = await bcrypt.compare(password, user.password);
    console.log('Password match:', passwordMatch);

    if (!passwordMatch) return res.status(401).json({ error: 'Invalid username or password' });

    const token = jwt.sign({ id: user._id, username: user.username }, process.env.SECRET_KEY);
    res.status(200).json({ message: 'Login successful', token });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Error logging in', details: err.message });
  }
});

// 🔒 Auth Middleware
const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Access denied, token missing' });

  try {
    req.user = jwt.verify(token, process.env.SECRET_KEY);
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// 📁 Add Category
router.post('/categories', authenticate, async (req, res) => {
  const { newCategory } = req.body;

  if (!newCategory) return res.status(400).json({ error: 'Category name is required' });

  try {
    const category = new Category({ name: newCategory, user: req.user.id });
    await category.save();
    res.status(201).json({ message: 'Category added successfully', category });
  } catch (err) {
    res.status(500).json({ error: 'Error adding category', details: err });
  }
});

// 💰 Assign Budget
router.post('/assign-amount', authenticate, async (req, res) => {
  const { category, amount, month } = req.body;

  if (!category || !amount || !month)
    return res.status(400).json({ error: 'Category, amount, and month are required' });

  try {
    const categoryDoc = await Category.findOne({ name: category, user: req.user.id });
    if (!categoryDoc) return res.status(404).json({ error: 'Category not found' });

    const budget = new Budget({ category: categoryDoc._id, amount, month, user: req.user.id });
    await budget.save();
    res.status(201).json({ message: 'Budget assigned successfully', budget });
  } catch (err) {
    res.status(500).json({ error: 'Error assigning budget', details: err });
  }
});

// 📋 Get All Categories
router.get('/categories', authenticate, async (req, res) => {
  try {
    const categories = await Category.find({ user: req.user.id });
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching categories', details: err });
  }
});

// 📝 Update Category
router.put('/categories/:id', authenticate, async (req, res) => {
  const { id } = req.params;
  const { newCategory } = req.body;

  if (!newCategory)
    return res.status(400).json({ error: 'New category name is required' });

  try {
    const category = await Category.findOneAndUpdate(
      { _id: id, user: req.user.id },
      { name: newCategory },
      { new: true }
    );

    if (!category) return res.status(404).json({ error: 'Category not found' });

    res.status(200).json({ message: 'Category updated successfully', category });
  } catch (err) {
    res.status(500).json({ error: 'Error updating category', details: err });
  }
});

// 💸 Update Budget
router.put('/budgets/:id', authenticate, async (req, res) => {
  const { id } = req.params;
  const { amount } = req.body;

  if (amount === undefined)
    return res.status(400).json({ error: 'Amount is required' });

  try {
    const budget = await Budget.findOneAndUpdate(
      { _id: id, user: req.user.id },
      { amount },
      { new: true }
    );

    if (!budget) return res.status(404).json({ error: 'Budget not found' });

    res.status(200).json({ message: 'Budget updated successfully', budget });
  } catch (err) {
    res.status(500).json({ error: 'Error updating budget', details: err });
  }
});

module.exports = router;
