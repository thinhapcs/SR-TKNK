const mongoose = require('mongoose');
const { isEmail } = require('validator');
//const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    require: [true, 'Please enter your first name']
  },
  lastName: {
    type: String,
    require: [true, 'Please enter your last name']
  },
  email: {
    type: String,
    required: [true, 'Please enter an email'],
    unique: true,
    lowercase: true,
    validate: [isEmail, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Please enter a password'],
    minlength: [6, 'Minimum password length is 6 characters'],
  },
  phone: {
    type: String,
    required: [true, 'Please enter a phone'],
    minlength: [10, 'Please enter a valid phone number']
  },
  address: {
    type: String,
    default: ""
  },
  bankCode: {
    type: String,
    default: ""
  },
  isVIP: {
    type: Boolean,
    default: false
  },
  isActivate: {
    type: Boolean,
    default: false
  }
});


// fire a function before doc saved to db
// userSchema.pre('save', async function(next) {
//   const salt = await bcrypt.genSalt();
//   this.password = await bcrypt.hash(this.password, salt);
//   next();
// });

// static method to login user
// userSchema.statics.login = async function(email, password) {
  // const user = await this.findOne({ email });
  // if (user) {
  //   const auth = await bcrypt.compare(password, user.password);
  //   if (auth) {
  //     return user;
  //   }
  //   throw Error('invalid');
  // }
  // throw Error('invalid');
// };

const User = mongoose.model('user', userSchema);

module.exports = User;