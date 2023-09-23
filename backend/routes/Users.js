const router = require('express').Router()

const {
    createUser,
    getUser,
    updateUserById,
    deleteUserById,
    userLogin,
    userLogout
} = require('../controllers/Users')

// POST / create a User
router.post('/', createUser)
router.post('/login', userLogin)
router.post('/logout', userLogout)
//  GET / get User by Id
router.get('/profile', getUser)

// PUT / edit User account
router.put('/:id', updateUserById)

// DELETE / delete User by id
router.delete('/:id', deleteUserById)


module.exports = router