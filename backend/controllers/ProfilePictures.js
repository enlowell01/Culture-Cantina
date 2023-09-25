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

async function getPictureById(req, res){
    try {
        const { id } = req.params
        const picture = await ProfilePicture.findById(id) 
        res.json(picture)
    } catch (error) {
        console.log('errpr getting Picture', error)
        res.json({'message': 'error getting Picture'})
    }
};

module.exports = {
    getAllPictures,
    getPictureById
};