const router = require('express').Router()
const {
    getAllUsers,
    createUser,
} = require('../controllers/User')

// GET / get all Users
router.get('/', getAllUsers)


// POST / create a user
router.post('/', createUser)


module.exports = router