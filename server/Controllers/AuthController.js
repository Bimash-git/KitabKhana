
const User = require("../database/models/user.model");
const Book = require("../database/models/book.model");
const { createSecretToken } = require("../database/secretToken");
const bcrypt = require("bcryptjs");
const recommendations = require("../Recommendation");
// const pickle = require("picklejs");
const fs = require("fs");
const axios = require('axios');


// for data models

const { resolveSoa } = require("dns");
const Main = require("../database/models/main.model");
const { title } = require("process");
const { set } = require("mongoose");


module.exports.Signup = async (req, res, next) => {
    try {
        const { email, password, username, createdAt } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.json({ message: "User already exists" });
        }
        const user = await User.create({ username, email, password, createdAt });
        const token = createSecretToken(user._id);
        res.cookie("token", token, {
            withCredentials: true,
            httpOnly: false
        });
        res.status(201).json({ message: "User signed in successfully", success: true, user });
    }
    catch (error) {
        console.error(error);
    }
};

module.exports.Login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.json({ message: "All fields are required " });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.json({ message: "Incorrect password or email" });
        }
        const auth = await bcrypt.compare(password, user.password);
        if (!auth) {
            return res.json({ message: "Incorrect password or email" });
        }
        const token = createSecretToken(user._id);
        res.cookie("token", token, {
            withCredentials: true,
            httpOnly: false
        });
        res.status(201).json({ message: "User logged in successfully", success: true });
        next();
    }
    catch (error) {
        console.error(error);
    }
}
module.exports.uploadImage = async (req, res, next) => {
    console.log("uploadImage");

    try {
        res.status(200).send(req.file);
        console.log(req.file);

    } catch (err) {
        res.status(500).send({
            message: err.message,
        });
    }
}

module.exports.getUploadForm = (req, res) => {
    res.status(200).send("uploadForm");
};

module.exports.BookForm = async (req, res, next) => {
    // const {data} = req.body;
    // console.log(data);
    console.log(req.body);
    const { data } = req.body;
    const bookData = JSON.parse(data);
    console.log(bookData);

    try {
        const books = await Book.create(bookData);

        return res.status(201).json({
            success: true, message: "Books uploaded successfully",
        });
    }
    catch (error) {
        console.error(error);

        return res.status(400).json({
            success: false,
            message: "Unable to upload books inforamtion"
        })
    }
}

module.exports.AllBooks = async(req, res, next) => {
    const { data } = req.b 
}

module.exports.Recommendation = async (req, res, next) => {

}
// module.exports.Images = async (req, res, next) => {

// }

module.exports.Box = async (req, res, next) => {
    try {
        const findBooks = await Book.find();
        if (!findBooks || findBooks === 0) {
            return res.status(404).send({ error: "Books not found in the database" });
        }
        else {
            return res.status(200).send(findBooks);
        }
    }
    catch (error) {
        return res.status(500).json({ error: "connection error" });
    }
}

module.exports.GetAllBooks = async (req, res, next ) => {
    try {
        const allBooks = await Main.find();
        if (!allBooks || allBooks === 0) {
            return res.status(404).send({ error: "Books not found in the database" });
        }
        else {
            return res.status(200).send(allBooks);
        }
    } catch (error) {
        return res.status(500).json({ error: "connection error" });
    }
}

module.exports.Recommendations = async ( req, res, next ) => {

    let books = [];

    // functions to fetch data 
    async function fetchData() {
        try {
            const response = await axios.get('http://www.localhost:4001/getAllBooks');
            books = response.data;
            console.log('Data fetched from api');
        }
        catch(error) {
            console.error('Error fetching data from the api', error.message);
        }
    }

    await fetchData();

    const searchQuery = req.query.query;

    
    const recommendations = books.map((book) => {

        const titleWords = new Set(book['BookTitle'].toLowerCase().split(''));
        const genreSet = new Set(book['Genre']?.split(','));

        const queryWords = new Set(searchQuery.toLowerCase().split(''));
        const queryGenre = new Set(searchQuery.split(','));

        const titleIntersection = new Set([...titleWords].filter((word) => queryWords.has(word)));
        const genreIntersection = new Set([...genreSet].filter((genre) => queryGenre.has(genre)));

        const titleUnion = new Set([...titleWords, ...queryWords]);
        const genreUnion = new Set([...genreSet, ...queryGenre])

        const titleSimilarity = titleIntersection.size / titleUnion.size;
        const genreSimilarity = genreIntersection.size / genreUnion.size;

        const combinedSimilarity =  (0.5 * titleSimilarity) + (0.5 * genreSimilarity);

        return {
            ...book,
            similarity: combinedSimilarity
        };
    });

    recommendations.sort((a,b) => b.similarity - a.similarity);

    // return recommended books
    const topRecommendations = recommendations.slice(0, 10);

    res.json(topRecommendations);

}