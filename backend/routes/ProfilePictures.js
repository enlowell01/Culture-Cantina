const router = require('express').Router()

const { getAllPictures } = require('../controllers/ProfilePictures')

// GET / get all Pictures
router.get('/', getAllPictures)

module.exports = router