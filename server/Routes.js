const express = require('express');
const router = express.Router();
const Category = require('./CategorySchema'); // Adjust the path as necessary

// Get all categories
router.get('/data', async (req, res) => {
    try {
        const categories = await Category.find().maxTimeMS(20000).exec();
        res.json(categories);
    } catch (err) {
        console.error('Error in GET categories request:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
2
module.exports = router;
