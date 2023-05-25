// username - bimaskhadka
// password - kGxuKo79SOgXqhHp

// const { MongoClient } = require('mongodb'); 
const dotenv = require("dotenv");
dotenv.config();

const mongoose = require('mongoose');
const URI = process.env.ATLAS_URI;

const connection = async() => {
    try {
        await mongoose.connect(URI, {
            // newUrlParser: true, it's alreadt deprecated
            useUnifiedTopology: true
        
        });
        console.log("Successfully connected to database");
    }
    catch(err) {
        console.log("Unable to connect to the database", err);
    }
}

module.exports = connection;