const pklToJson = require("pkl-to-json");
const path = require("path");

// converting pkl file into json    
const pklPath = path.resolve("../dataset/recommend.pkl");
let jsonPath;
// const jsonPath = path.resolve("../dataset/recommend.json");

// const recommendations = pklToJson.convert(pklPath, jsonPath);
// console.log(recommendations);
// const recommendations = nodePickle.loads("../dataset/recommend.pkl");

function getRecommendations(userInput) {
    const books = recommendations[userInput];
    return books;
}

module.exports = getRecommendations;