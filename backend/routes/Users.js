const router = require('express').Router()

const {
    createUser,
    getUser,
    updateUserById,
    deleteUserById,
    userLogin,
    userLogout,
    userAuthentication,
    getUserById,
    getAllUsers
} = require('../controllers/Users')

// POST / create a User
router.post('/', createUser)
router.post('/login', userLogin)
router.post('/logout', userLogout)

//  GET / get logged in User profile
router.get('/profile', getUser)
// GET / get User by id
router.get('/:id', getUserById)
// GET / get all Users
router.get('/', getAllUsers)

// PUT / edit User account
router.put('/:id', updateUserById)

// DELETE / delete User by id
router.delete('/:id', deleteUserById)

// GET current User
router.get('/profile', userAuthentication)


module.exports = router
