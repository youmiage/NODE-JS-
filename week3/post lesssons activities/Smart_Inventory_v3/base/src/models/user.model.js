const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique : true ,
      lowercase : true,
      trim : true
    },
    passwordhash: {
      type: String,
      required: true,
      
    },
    role: {
      type: String,
      enum: ['user', 'manager','admin'],
      default: 'user',
    },
  },
  { timestamps : true } 
);
const User = mongoose.model('user',userSchema);
module.exports = User;
