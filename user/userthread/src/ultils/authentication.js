const jwt = require("jsonwebtoken");
const config = require("../../config.json")

module.exports = class Authentication {
    constructor({ passwordHasher }) {
        this.passwordHasher = passwordHasher;
        this.sign = this.sign.bind(this);
        this.verify = this.verify.bind(this);
        this.handleErrors = this.handleErrors.bind(this);
    }

    sign(payload) {
        const token = jwt.sign(payload, 'sr-tknk');
        return token;
    }

    verify(req, res, next) {
        const token = req.header("token");
        if (!token) return res.status(401).send("Acess denined");
        return jwt.verify(token, config.Server.SECRET_KEY, (err, decoded) => {
            if (err) return res.status(401).send("Invalid token");
            req.curCustomer = decoded;
            return next();
        });
    }

    handleErrors(err) {
        console.log(err.message, err.code);
        let errors = { email: '', password: '' };

        // Qr-code is invalid
        if (err.message === 'invalid') {
            errors.email = 'QR-code is invalid!';
        }

        // duplicate email error
        if (err.code === 11000) {
            errors.email = 'that email is already registered';
            return errors;
        }

        // validation errors
        if (err.message.includes('user validation failed')) {
            // console.log(err);
            Object.values(err.errors).forEach(({ properties }) => {
                // console.log(val);
                // console.log(properties);
                errors[properties.path] = properties.message;
            });
        }

        return errors;
    }
};