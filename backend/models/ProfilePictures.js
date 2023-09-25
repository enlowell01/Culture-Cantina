const mongoose = require("mongoose");

const profilePictureSchema = new mongoose.Schema({
    pictureName: {
        type: String,
        required: true
    },
    imgURL: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("ProfilePicture", profilePictureSchema);