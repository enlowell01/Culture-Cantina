const User = require('../models/User')

// Get Functions
async function getAllUsers(req, res){
    try {
        const user = await User.find()
        res.json(user)
    } catch (error) {
        console.log('error finding Users',error)
        res.json({ 'message': 'error finding Users'})
    }
}

async function getUserById(req, res){
    try {
        const { id } = req.params
       const user = await User.findById(id) 
       res.json(user)
    } catch (error) {
        console.log('errpr getting user', error)
        res.json({ 'message': 'error getting user'})
    }
}
// Post Functions
async function createUser(req, res){
    try {
        if (!req.body.image) req.body.image = undefined
        await new User(req.body).save()
        res.status(201).json({ 'message': 'User created'})
    } catch (error) {
        console.log('error creating User', error)
        res.json({ 'message': 'error creating Profile'})
        
    }
}
// Put Functions

async function updateUserById(req, res){
    try {
        const { id } = req.params
        if(!req.body.image) req.body.image = undefined
        await User.findByIdAndUpdate(id, req.body)
        res.status(204).json({ 'message': 'User account updated' })
    } catch (error) {
        console.log('error updating User account', error)
        res.json(({ 'message': "error updating User account"}))    
    }
}

// Delete Functions

async function deleteUserById(req, res){
    try {
        const { id } = req.params
        await User.findByIdAndDelete(id)
        res.status(204).json({ 'message': 'User account deleted' })
    } catch (error) {
        console.log('error deleting User account')
        res.json({ 'message': 'error deleting User account'})
    }
}

module.exports = {
    getAllUsers,
    createUser,
    getUserById,
    updateUserById,
    deleteUserById,

}