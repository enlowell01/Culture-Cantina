const ProfilePicture = require('../models/ProfilePictures');

// Get Functions

async function getAllPictures(req, res){
    try {
        const picture = await ProfilePicture.find()
        res.json(picture)
    } catch (error) {
        console.log('error finding Pictures',error)
        res.json({ 'message': 'error finding Pictures'})
    }
}

module.exports = {
    getAllPictures
};