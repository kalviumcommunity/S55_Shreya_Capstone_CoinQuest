const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./User');  // User schema
const Category = require('./Category');  // Category schema
const Budget = require('./Budget');  // Budget schema

// Register a new user
router.post('/register', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, password: hashedPassword });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Error registering user', details: err });
    }
});

// Login user and return JWT
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        const token = jwt.sign({ id: user._id, username: user.username }, process.env.SECRET_KEY);
        res.status(200).json({ message: 'Login successful', token });
    } catch (err) {
        res.status(500).json({ error: 'Error logging in', details: err });
    }
});

// Middleware to protect routes
const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Access denied, token missing' });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ error: 'Invalid token' });
    }
};

// Add a new category
router.post('/categories', authenticate, async (req, res) => {
    const { newCategory } = req.body;

    if (!newCategory) {
        return res.status(400).json({ error: 'Category name is required' });
    }

    try {
        const category = new Category({
            name: newCategory,
            user: req.user.id  // User who is adding the category
        });
        await category.save();
        res.status(201).json({ message: 'Category added successfully', category });
    } catch (err) {
        res.status(500).json({ error: 'Error adding category', details: err });
    }
});

// Assign budget to a category
router.post('/assign-amount', authenticate, async (req, res) => {
    const { category, amount, month } = req.body;

    if (!category || !amount || !month) {
        return res.status(400).json({ error: 'Category, amount, and month are required' });
    }

    try {
        const categoryDoc = await Category.findOne({ name: category, user: req.user.id });
        if (!categoryDoc) {
            return res.status(404).json({ error: 'Category not found' });
        }

        const budget = new Budget({
            category: categoryDoc._id,
            amount,
            month,
            user: req.user.id
        });

        await budget.save();
        res.status(201).json({ message: 'Budget assigned successfully', budget });
    } catch (err) {
        res.status(500).json({ error: 'Error assigning budget', details: err });
    }
});

// Get all categories
router.get('/categories', authenticate, async (req, res) => {
    try {
        const categories = await Category.find({ user: req.user.id });
        res.status(200).json(categories);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching categories', details: err });
    }
});

module.exports = router;
