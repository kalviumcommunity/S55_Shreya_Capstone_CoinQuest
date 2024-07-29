const express = require('express');
const router = express.Router();
const Category = require('./CategorySchema'); // Adjust the path as necessary

// Get all categories
router.get('/categories', async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new category
router.post('/categories', async (req, res) => {
    const category = new Category({
        category: req.body.category,
        item: req.body.item,
        price: req.body.price,
    });

    try {
        const newCategory = await category.save();
        res.status(201).json(newCategory);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Add an item to a category
router.post('/categories/:id/items', async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        category.item = req.body.item;
        category.price = req.body.price;

        await category.save();
        res.status(201).json(category);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
