const mongoose = require('mongoose');

// User schema definition
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

// Create the User model from the schema
const User = mongoose.model('User', userSchema);

module.exports = User;
