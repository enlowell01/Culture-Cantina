const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
      username: {
        type: String,
        required: true
      },
      firstname: {
        type: String,
        required: true
      },
      lastname: {
        type: String,
        required: true
      },
      email: {
        type: String,
        required: true
      },
      password: {
        type: String,
        required: true
      },
      bio: {
        type: String
      }
  }, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);

