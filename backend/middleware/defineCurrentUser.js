const User = require('../models/Users');

async function defineCurrentUser(req, res, next) {
    try {
        let user = await User.findOne({
            where: {
                _id: req.session.userId
            }
        })
        req.currentUser = user
        next()
    } catch {
        next()
    }
}

module.exports = defineCurrentUser