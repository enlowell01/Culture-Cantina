const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
      username: {
        type: String,
        
      },
      firstname: {
        type: String,
        
      },
      lastname: {
        type: String,
        
      },
      email: {
        type: String,
        
      },
      password: {
        type: String,
        
      },
      bio: {
        type: String
      }
  }, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);

