const router = require('express').Router()

const {
    getAllMovies,
    getMovieById
} = require('../controllers/Movies')

// GET / get all Ratings
router.get('/', getAllMovies)

// GET / get Rating by Id
router.get('/:id', getMovieById)

module.exports = router;