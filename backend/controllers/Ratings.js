const Rating = require('../models/Ratings');

// Get Functions

async function getAllRatings(req, res){
    try {
        const rating = await Rating.find()
        res.json(rating)
    } catch (error) {
        console.log('error finding Ratings',error)
        res.json({ 'message': 'error finding Ratings'})
    }
}

/*async function getRatingById(req, res){
    try {
        const { id } = req.params
        const rating = await Rating.findById(id) 
        res.json(rating)
    } catch (error) {
        console.log('errpr getting Rating', error)
        res.json({'message': 'error getting Rating'})
    }
};*/

// Post Functions

async function createRating(req, res){
    try {
        await new Rating(req.body).save()
        res.status(201).json({ 'message': 'Rating created'})
    } catch (error) {
        console.log('error creating Rating', error)
        res.json({'message': 'error creating Rating'})
    }
};

// Put Functions
async function updateRatingById(req, res){
    try {
        const { id } = req.params
        await Rating.findByIdAndUpdate(id, req.body)
        res.status(204).json({'message': 'Rating updated' })
    } catch (error) {
        console.log('error updating Rating', error)
        res.json(({'message': "error updating Rating"}))    
    }
};

// Delete Functions

async function deleteRatingById(req, res){
    try {
        const { id } = req.params
        await Rating.findByIdAndDelete(id)
        res.status(204).json({'message': 'Rating account deleted'})
    } catch (error) {
        console.log('error deleting Rating account')
        res.json({'message': 'error deleting Rating account'})
    }
};

module.exports = {
    getAllRatings,
    createRating,
    //getRatingById,
    updateRatingById,
    deleteRatingById
};