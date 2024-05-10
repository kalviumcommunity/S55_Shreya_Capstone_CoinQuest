const express = require('express');
const router = express.Router();


let categories = {
    category1: 'Default Category 1',
    category2: 'Default Category 2',
    category3: 'Default Category 3'
};


router.get('/categories', (req, res) => {
    res.json(categories);
});

module.exports = router;
