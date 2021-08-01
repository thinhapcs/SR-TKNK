const { Router } = require('express');
const authController = require('../controllers/authController');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');

const router = Router();

// router.get('/signup', authController.signup_get);
// router.post('/signup', authController.signup_post);
// router.get('/login', authController.login_get);
router.post('/login', requireAuth, authController.login);
router.get('/logout', authController.logout);

module.exports = router;