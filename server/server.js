const express = require('express');
const app = express();
const connection = require('./database/connection');
const cors = require("cors");
const cookieParser = require('cookie-parser');
const authRoute = require("./Routes/AuthRoute");
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
app.use('/uploads', express.static(path.join(__dirname, '../images')));

const PORT = process.env.PORT || 5050;

app.get('/',(req, res) => {
    res.send("Hello world");
})


app.listen(PORT, () => {
    connection();
    console.log(`Server is running on port http://localhost:${PORT}`);
})

app.use("/", authRoute);

// mongoose,jsonWebToken(authorization), cookie, (loginSystem ), middleware (authorization, authentication )