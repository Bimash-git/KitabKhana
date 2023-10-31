const mongoose = require('mongoose');

const mainSchema = new mongoose.Schema({
    BookTitle: { type: String},
    BookRating: { type: Number},
    ISBN: { type: Number},
    Publisher: { type: String},
    Image: { type: String},
    Genre: { type: String}
})

const Main = mongoose.model.mains || mongoose.model("main", mainSchema);
module.exports = Main;