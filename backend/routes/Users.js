const router = require('express').Router()

const {
    createUser,
    getUserById,
    updateUserById,
    deleteUserById,
} = require('../controllers/Users')

// POST / create a User
router.post('/', createUser)

//  GET / get User by Id
router.get('/:id', getUserById)

// PUT / edit User account
router.put('/:id', updateUserById)

// DELETE / delete User by id
router.delete('/:id', deleteUserById)


module.exports = router