const router = require('express').Router()

const {
    getAllPictures,
    getPictureById
} = require('../controllers/ProfilePictures')

// GET / get all Pictures
router.get('/', getAllPictures)

// GET / get Picture by Id
router.get('/:id', getPictureById)


module.exports = router