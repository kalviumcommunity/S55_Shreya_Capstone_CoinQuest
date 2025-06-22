// server/Budget.js
const mongoose = require("mongoose");

const BudgetSchema = new mongoose.Schema({
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  month: { type: Number, required: true }, // 0 = Jan, 11 = Dec
  year: { type: Number, required: true },
  amount: { type: Number, required: true },
});

BudgetSchema.index({ user: 1, category: 1, month: 1, year: 1 }, { unique: true });

module.exports = mongoose.model("Budget", BudgetSchema);
