const router = require('express').Router()

const {
    getAllRatings,
    createRating,
    getRatingById,
    updateRatingById,
    deleteRatingById,
} = require('../controllers/Ratings')

// GET / get all Ratings
router.get('/', getAllRatings)

// GET / get Rating by Id
router.get('/:id', getRatingById)

// POST / create a Rating
router.post('/', createRating)

// PUT / edit Rating account
router.put('/:id', updateRatingById)

// DELETE / delete Rating by id
router.delete('/:id', deleteRatingById)


module.exports = router