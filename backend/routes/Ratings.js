const router2 = require('express').Router()

const {
    createRating,
    getRatingById,
    updateRatingById,
    deleteRatingById,
} = require('../controllers/Ratings')

// GET / get Rating by Id
router2.get('/:id', getRatingById)

// POST / create a Rating
router2.post('/', createRating)

// PUT / edit Rating account
router2.put('/:id', updateRatingById)

// DELETE / delete Rating by id
router2.delete('/:id', deleteRatingById)


module.exports = router2