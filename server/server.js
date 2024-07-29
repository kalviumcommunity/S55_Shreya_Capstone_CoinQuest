const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const routes = require('./Routes'); 
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;
let status = "disconnected";

dotenv.config();
const secretKey = process.env.SECRET_KEY;

// Debugging: Verify that the MONGO environment variable is loaded
console.log(`MONGO: ${process.env.MONGO}`);

const startConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    status = "connected"; 
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err); 
    status = "error";
  }
};

const stopConnect = async () => {
  try {
    await mongoose.disconnect();
    status = "disconnected"; 
    console.log("Disconnected from MongoDB");
  } catch (err) {
    console.error("Failed to disconnect from MongoDB:", err);
  }
};



app.use(cors());
app.use(express.json());
app.use(routes);

app.get('/', (req, res) => {
  res.send(status);
});

startConnect(); 
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
