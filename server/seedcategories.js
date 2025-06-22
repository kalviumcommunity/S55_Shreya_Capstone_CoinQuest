// seedCategories.js
require('dotenv').config(); // Load .env file

const mongoose = require('mongoose');
const Category = require('./Category');

// ✨ Replace this with a valid user ID from your DB
const userId = '6854f2c3b9891f7121dee8af';

const defaultCategories = [
  { name: 'Groceries', user: userId },
  { name: 'Essentials', user: userId },
  { name: 'Entertainment', user: userId },
  { name: 'Miscellaneous', user: userId }
];

// 🧠 Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(async () => {
  console.log('✅ Connected to MongoDB');

  // 🧹 Clear previous categories for this user
  await Category.deleteMany({ user: userId });

  // ✨ Insert default categories
  await Category.insertMany(defaultCategories);

  console.log('🌟 Default categories inserted successfully!');
  process.exit();
})
.catch((err) => {
  console.error('❌ MongoDB connection error:', err);
});
