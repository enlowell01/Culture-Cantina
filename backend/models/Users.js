const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
      userName: {
        type: String,
        required: true
      },
      firstName: {
        type: String,
        required: true
      },
      lastName: {
        type: String,
        required: true
      },
      emailAddress: {
        type: String,
        required: true
      },
      profilePicture: {
        type: String,
        default: 'https://upload.wikimedia.org/wikipedia/commons/b/b5/Windows_10_Default_Profile_Picture.svg'
      },
      getsUpdates: {
        type: Boolean,
        default: false
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

userSchema.pre("save", function (next){
    const user = this
    if(this.isModified("password") || this.isNew){
        bcrypt.genSalt(10,function(saltError, salt){
            if(saltError){
                return next(saltError)
            }else{
                bcrypt.hash(user.password, salt, function(hashError, hash){
                    if(hashError){
                        return next(hashError)
                    }
                    user.password = hash
                    next()
                })
            }
        })
    } else{
        return next()
    }
});

userSchema.methods.comparePassword = function(password, callback){
    bcrypt.compare(password, this.password, function(error, isMatch){
        if(error){
            return callback(error)
        }else{
            callback(null, isMatch)
        }
    })
};

module.exports = mongoose.model('User', userSchema);