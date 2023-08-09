const User = require("../database/models/user.model");
const Book = require("../database/models/book.model");
const { createSecretToken } = require("../database/secretToken");
const bcrypt = require("bcryptjs");
const recommendations = require("../Recommendation");

module.exports.Signup = async(req, res, next) => {
    try {
        const { email, password, username, createdAt } = req.body;
        const existingUser = await User.findOne({ email });
        if(existingUser) {
            return res.json({ message: "User already exists"});
        }
        const user = await User.create({ username, email, password, createdAt });
        const token = createSecretToken(user._id);
        res.cookie("token", token, {
            withCredentials: true,
            httpOnly: false
        });
        res.status(201).json({ message: "User signed in successfully", success: true, user });
    }
    catch(error) {
        console.error(error);
    }
};

module.exports.Login = async(req, res, next) => {
    try {
        const { email, password } = req.body;
        if( !email || !password ) {
            return res.json({ message: "All fields are required "});
        }
        const user = await User.findOne({ email });
        if(!user) {
            return res.json({ message: "Incorrect password or email"});
        }
        const auth = await bcrypt.compare(password, user.password);
        if(!auth) {
            return res.json({ message: "Incorrect password or email"});
        }
        const token = createSecretToken(user._id);
        res.cookie("token", token, {
            withCredentials: true,
            httpOnly: false
        });
        res.status(201).json({ message: "User logged in successfully", success: true});
        next();
    }
    catch(error) {
        console.error(error);
    }
}
module.exports.uploadImage = async(req,res,next)=>{
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
  
module.exports.BookForm = async(req, res, next) => {
    // const {data} = req.body;
    // console.log(data);
    console.log(req.body);
    const {data} =req.body;
    const bookData = JSON.parse(data);
    console.log(bookData); 

    try {
        const books = await Book.create(bookData);

        return res.status(201).json({ 
            success: true, message: "Books uploaded successfully",  });
    }
    catch(error) {
        console.error(error);

        return res.status(400).json({
            success:false,
            message:"Unable to upload books inforamtion"
        })
    }
}

module.exports.Box = async(req, res, next) => {
    try {
        const { id } = req.params;
        console.log(id);

        const data = await Book.findById(id);

        if(!data) {
            return res.status(404).json({ error: "Data isn't found on the database"});
        }

        return res.json(data);
    
    }
    catch(error) {
        console.error("Error fetching data: "+ error);
        return res.status(500).json({ error: "Internal server error"});
    }
}

module.exports.Recommendations = async (req, res, next) => {
    const userInput = req.query.input;
    const books = await recommendations.getRecommendations(userInput);
    return res.json(books);
}  