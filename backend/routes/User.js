const router = require('express').Router()
const {
    getAllUsers,
    createUser,
    getUserById
} = require('../controllers/User')

// GET / get all Users
router.get('/', getAllUsers)

//  GET ? get User by Id
router.get('/:id', getUserById)


// POST / create a user
router.post('/', createUser)


module.exports = router