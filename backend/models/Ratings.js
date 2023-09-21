const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema({
    rating: {
        type: Number,
        required: true
    },
    review: {
        type: String
    },
    userId: {
        type: String,
        required: true
    },
    productId: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model("Rating", ratingSchema);