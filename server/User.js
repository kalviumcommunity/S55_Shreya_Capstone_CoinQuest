const mongoose = require('mongoose');

// Define User schema with timestamps for tracking creation and updates
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true // Removes leading/trailing spaces
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true }); // Adds createdAt and updatedAt fields

// Create and export the User model
const User = mongoose.model('User', userSchema);
module.exports = User;