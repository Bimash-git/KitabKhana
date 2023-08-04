const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    imgUrl: { 
        type:String,
        required:[true,"Please Enter Image Url"],
    
    },
    book: { type: String, required: [true, "Please enter the book's name"]},
    author: { type: String, required: [true, "Please enter the author's name"]},
    genre: { type: String, required: [true, "Please specify the book's genre"]},
    isbn: { type: Number, required: [true, "Please specify the isbn number"]},
    availability: { type: Number, required: [true, "Please specify the number of days for books to be borrowed image"]},
    createdAt: { type: Date, default: new Date() }
})

const Book = mongoose.model("Book", bookSchema);
module.exports = Book;