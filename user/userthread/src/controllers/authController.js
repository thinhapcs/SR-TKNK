class AuthController {
  constructor({ loginService }) {
    this.authentication = authentication;
    this.loginService = loginService;

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  async login(req, res) {
    try {
      const params = req.body;
      const serviceResult = await this.loginService.execute(params);
      if (serviceResult.failure) throw new Error(serviceResult.message);
      res.status(200).header("token", serviceResult.token).send({
        valid: true,
        userId: serviceResult.userId,
      });
    } catch (err) {
      const errors = this.authentication.handleErrors(err.message)
      res.status(400).send({ valid: false, message: errors });
    }
  }
  async logout(req, res) {
    res.header('jwt', '');
    res.redirect('/');
  }
}

module.exports = AuthController;

//const User = require("../models/User");
//const jwt = require('jsonwebtoken');

// handle errors
// const handleErrors = (err) => {
//   console.log(err.message, err.code);
//   let errors = { email: '', password: '' };

//   // Qr-code is invalid
//   if (err.message === 'invalid') {
//     errors.email = 'QR-code is invalid!';
//   }

//   // duplicate email error
//   if (err.code === 11000) {
//     errors.email = 'that email is already registered';
//     return errors;
//   }

//   // validation errors
//   if (err.message.includes('user validation failed')) {
//     // console.log(err);
//     Object.values(err.errors).forEach(({ properties }) => {
//       // console.log(val);
//       // console.log(properties);
//       errors[properties.path] = properties.message;
//     });
//   }

//   return errors;
// }

// create json web token
// const maxAge = 3 * 24 * 60 * 60;
// const createToken = (id) => {
//   return jwt.sign({ id }, 'sr-tknk', {
//     expiresIn: maxAge
//   });
// };

// controller actions
// module.exports.signup_get = (req, res) => {
//   res.render('signup');
// }

// module.exports.login_get = (req, res) => {
//   res.render('login');
// }

// module.exports.signup_post = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.create({ email, password });
//     const token = createToken(user._id);
//     res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
//     res.status(201).json({ user: user._id });
//   }
//   catch(err) {
//     const errors = handleErrors(err);
//     res.status(400).json({ errors });
//   }

// }

// module.exports.login_post = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.login(email, password);
//     const token = createToken(user._id);
//     // res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
//     // res.status(200).json({ user: user._id });
//     res.status(200).header("token", token).send({user : user._id});
//   } 
//   catch (err) {
//     const errors = handleErrors(err);
//     res.status(400).json({ errors });
//   }

// }

// module.exports.logout_get = (req, res) => {
//   res.cookie('jwt', '', { maxAge: 1 });
//   res.redirect('/');
// }