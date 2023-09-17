const router = require('express').Router()
const {
    getAllUsers,
    createUser,
    getUserById,
    updateUserById,
    deleteUserById,
} = require('../controllers/User')

// GET / get all Users
router.get('/', getAllUsers)

//  GET ? get User by Id
router.get('/:id', getUserById)


// POST / create a user
router.post('/', createUser)


// PUT / edit user account
router.put('/:id', updateUserById)

// DELETE / delete user by id
router.delete('/:id', deleteUserById  )


module.exports = router