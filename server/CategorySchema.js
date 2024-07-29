const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    category: String,
    item: String,
    price: Number,
});

const Category = mongoose.model('Category', CategorySchema);

module.exports = Category;
