// server/Category.js
const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

CategorySchema.index({ name: 1, user: 1 }, { unique: true });

module.exports = mongoose.model("Category", CategorySchema);
