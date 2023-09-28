const router = require('express').Router()

const {
    createUser,
    getUser,
    updateUserById,
    deleteUserById,
    userLogin,
    userLogout,
    getUserById,
    getAllUsers
} = require('../controllers/Users')

// POST / create a User
router.post('/', createUser)
router.post('/login', userLogin)

//  GET / get logged in User profile
router.get('/profile', getUser)
// GET / log User out
router.get('/logout', userLogout)
// GET / get User by id
router.get('/:id', getUserById)
// GET / get all Users
router.get('/', getAllUsers)

// PUT / edit User account
router.put('/:id', updateUserById)

// DELETE / delete User by id
router.delete('/:id', deleteUserById)


module.exports = router
