const express = require('express');
const authController = require('../controllers/authControllers');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.route('/signup').post(authController.createUser); //Localhost:3000/
router.route('/login').post(authController.loginUser);
router.route('/logout').get(authController.loginOutUser);
router.route('/dashboard').get(authMiddleware, authController.getDashboardPage);


module.exports = router;