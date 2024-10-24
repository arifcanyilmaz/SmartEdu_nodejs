const express = require('express');
const User = require("../models/User");
const authController = require('../controllers/authControllers');
const authMiddleware = require('../middlewares/authMiddleware');
const {body} = require('express-validator');
const Category = require('../models/Category');
const router = express.Router();

router.route('/signup').post(
    [
        body('name').not().isEmpty().withMessage('Please Enter Your Name!'),
        body('email').isEmail().withMessage('Please Enter Valied Email!')
        .custom((userEmail)=> {
            return User.findOne({email: userEmail}).then(user => {
                if(user){
                    return Promise.reject('Email is already exists!')
                }
            })
        }),
        body('password').not().isEmpty().withMessage('Please Enter Your Password!'),
    ]
    ,authController.createUser); //Localhost:3000/
router.route('/login').post(authController.loginUser);
router.route('/logout').get(authController.loginOutUser);
router.route('/dashboard').get(authMiddleware, authController.getDashboardPage);
router.route('/:id').delete(authController.deleteUsers);



module.exports = router;