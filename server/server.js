const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const router = require('./Routes'); 
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;
let status = "disconnected";

app.use(cors());
app.use(express.json()); 

dotenv.config();
const secretKey = process.env.SECRET_KEY;

// Debugging: Verify that the MONGO environment variable is loaded
console.log(process.env.MONGO);

const startConnect = async () => {
    console.log(process.env.MONGO);
    try {
        await mongoose.connect(process.env.MONGO);
        status = "connected"; 
        console.log("Connected to MongoDB");
    } catch (err) {
        console.error("Failed to connect to MongoDB:", err); 
        status = "error";
    }
};

const stopConnect = async () => {
    await mongoose.disconnect();
    status = "disconnected"; 
    console.log("Disconnected from MongoDB");
};

app.use(router);

app.get('/', (req, res) => {
    res.send(status);
});

startConnect(); 
app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
