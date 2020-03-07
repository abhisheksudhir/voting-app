const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    // unique: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
  polls: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Poll' }],
});

//below function takes place before password is saved so that we can encrypt the password
//in edge case or gotcha you need to use the keyword function instead of arrow function
userSchema.pre('save', async function(next) {
    try {
      if (!this.isModified('password')) {
        return next();    //if password isn't modified you send it to next function
      }
      const hashed = await bcrypt.hash(this.password, 10);    //hashing function with strength 10
      this.password = hashed;   //saving the hashed password in the actual schema object
      return next();
    } catch (err) {
      return next(err);
    }
  });
  
  //to compare the attempted password with the one stored
  userSchema.methods.comparePassword = async function(attempt, next) {
    try {
      return await bcrypt.compare(attempt, this.password);
    } catch (err) {
      return next(err);
    }
  };

module.exports = mongoose.model('User', userSchema);