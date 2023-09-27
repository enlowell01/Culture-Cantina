const User = require('../models/Users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// It's better to store the JWT secretKey securely, not hardcoded in the code.
const secretKey = process.env.SECRET_KEY;


// Get Functions

async function getUser(req, res) {
    try {
        const { token } = req.cookies;
        jwt.verify(token, secretKey, {}, (err, info) => {
          if (err) {
            // Handle JWT verification error
            console.error('JWT verification error:', err);
            return res.status(401).json({ message: 'Unauthorized' });
          }
          // JWT verification succeeded, send user info
          res.json(info);
        });
      } catch (error) {
        console.error('Error in /profile route:', error);
        res.status(500).json({ message: 'Internal server error' });
      }        
};

async function getUserById(req, res){
  try {
      const { id } = req.params
      const rating = await User.findById(id) 
      res.json(rating)
  } catch (error) {
      console.log('errpr getting User', error)
      res.json({'message': 'error getting User'})
  }
};

async function getAllUsers(req, res){
  try {
      const user = await User.find()
      res.json(user)
  } catch (error) {
      console.log('error finding Users',error)
      res.json({ 'message': 'error finding Users'})
  }
}

// Post Functions

async function createUser(req, res) {
  const { username, firstname, lastname, email, password, bio, pictureURL } = req.body;
  try {
    const userDoc = await User.create({
      username,
      firstname,
      lastname,
      email,
      password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
      bio,
      pictureURL
    });
    res.json(userDoc);
  } catch (error) {
    console.error('Error creating User', error);
    res.status(500).json({ message: 'Error creating Profile' });
  }
}

async function userLogin(req, res) {
    const { username, password } = req.body;
     try {
      const userDoc = await User.findOne({ username });
      if (!userDoc) {
        return res.status(400).json('User not found');
      }
  
      const passOk = bcrypt.compareSync(password, userDoc.password);
  
      if (passOk) {
        // Generate a JWT token with appropriate configuration
        const token = jwt.sign({ username, id: userDoc._id }, secretKey, { expiresIn: '24h' });
  
        // Set the token as a cookie in the response
        res.cookie('token', token, {
          httpOnly: true, // Helps protect against XSS attacks
          secure: false, //process.env.NODE_ENV === 'production', // Requires HTTPS in production
          sameSite: 'none' // Helps prevent CSRF attacks
        });
        
        res.json({ id: userDoc._id, username });
      } else {
        res.status(400).json('Wrong credentials');
      }
    } catch (error) {
      console.error('Error during login', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
async function userLogout(req, res) {
  res.clearCookie('token').json('OK');
}

// Put Functions
async function updateUserById(req, res) {
  try {
    const { id } = req.params;
    const { password, username, firstname, lastname, email, bio, pictureURL } = req.body;

    // Create an object to store the fields you want to update
    const updatedFields = {};

    // Hash the new password if it's provided
    if (password) {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      updatedFields.password = hashedPassword;
    }

    // Add other fields to the updatedFields object
    if (username) updatedFields.username = username;
    if (firstname) updatedFields.firstname = firstname;
    if (lastname) updatedFields.lastname = lastname;
    if (email) updatedFields.email = email;
    if (bio) updatedFields.bio = bio;
    if (pictureURL) updatedFields.pictureURL = pictureURL;

    // Update the user with the new values
    await User.findByIdAndUpdate(id, updatedFields);

    res.status(204).json({ message: 'User account updated' });
  } catch (error) {
    console.error('Error updating User account', error);
    res.status(500).json({ message: 'Error updating User account' });
  }
}

// Delete Functions
async function deleteUserById(req, res) {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.status(204).json({ message: 'User account deleted' });
  } catch (error) {
    console.error('Error deleting User account', error);
    res.status(500).json({ message: 'Error deleting User account' });
  }
}

module.exports = {
  createUser,
  getUser,
  updateUserById,
  deleteUserById,
  userLogin,
  userLogout,
  getUserById,
  getAllUsers
};
