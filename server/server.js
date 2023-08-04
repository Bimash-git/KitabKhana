const express = require('express');
const app = express();
const connection = require('./database/connection');
const cors = require("cors");
const cookieParser = require('cookie-parser');
const authRoute = require("./Routes/AuthRoute");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");
const path = require("path")
// const multer = require('multer');
// const upload = multer({ dest: 'uploads/' });

dotenv.config();

// const mongoose = require('mongoose');
// const User = require('./database/models/user.model');
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(
//     fileUpload({
//       limits: { fileSize: 10 * 1024 * 1024 },
//     })
//   );
app.use(cookieParser());

app.use(cors({
    origin: ["http://localhost:3000"],
    credentials: true
}));

const PORT = process.env.PORT || 5050
 
app.get('/',(req, res) => {
    res.send("Hello world");
})

// app.post("/login", (req, res) => {
//     const { email, password } = req.body;   
//     User.findOne({email: email}, (err, user) => {
//         if(user) {
//             if(password == user.password) {
//                 res.send({ message: "login success", user: user });
//                 const token = secretToken(user._id);
//                 res.status(200).cookie("secretToken", token, { httpOnly: true });
//             }
//             else {
//                 res.status(401).send({message: "wrong credentials"});
//             }
//         }
//         else {
//             res.send("Not signed up");
//         }
//     })
// });

// app.post("/signup", async (req, res)=> {

//     const { name, email, password } = req.body;

//     if(!email || !name || !password){
//         res.status(400).json({
//             success:false,
//             message:"Please enter email password name"
//         })
//     }

//     // const userAlready = await User.findOne({email});

//     // if(userAlready){
//     //     res.status(401).json({
//     //         success:false,
//     //         message:"user already exists"
//     //     })
//     // }


//     User.findOne( {email: email}, (err, user) => {
//         if(user) {
//             res.send({ message: "user already exists"});
//         }
//         else {
//             const user = new User({name, email, password})
//             user.save(err => {
//                 if (err) {
//                     res.send("error: "+ err);
//                 }
//                 else {
//                     const token =secretToken(user._id);
//                     res.cookie("secretToken",token , { httpOnly: true})
//                     res.send({ message: "successful" });
//                 }
//             })
//         }
//     } )
// })

// // logout endpoint
// app.post("/logout", (req, res) => {
//     //clears the token cookies
//     res.clearCookie("secretToken");

//     // sends success response
//     res.status(200).json({ message: "Logout successful"});
// })

// //protected route
// app.get("/protected", authenticateToken, (req, res) => {
//     res.status(200).json({ message: "Protected route accessed successfully"});
// })

// // middleware to verify Token 
// function authenticateToken(req, res, next) {
//     const token = req.cookies.token;

//     if(!token) {
//         return res.status(401).json({ message: "Authentication token not found "});
//     }

//     jwt.verify(token, TOKEN_KEY, (err, decoded) => {
//         if(err) {
//             return res.status(403).json({ message: "Invalid token"});
//         }

//         req.userId = decoded.id

//         next();
//     })
// }


app.listen(PORT, () => {
    connection();
    console.log(`Server is running on port http://localhost:${PORT}`);
})

app.use("/", authRoute);

// mongoose,jsonWebToken(authorization), cookie, (loginSystem ), middleware (authorization, authentication )