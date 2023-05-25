const express = require('express');
const app = express();

// const mongoose = require('mongoose');
// const User = require('./database/models/user.model');

const dotenv = require("dotenv");
dotenv.config();

const cors = require("cors");
const connection = require('./database/connection');
app.use(cors());

const PORT = process.env.PORT || 5050;

app.use(express.json());
    
app.get('/',(req, res) => {
    res.send("Hello world");
})

app.listen(PORT, () => {
    connection();
    console.log(`Server is running on port http://localhost:${PORT}`);
})