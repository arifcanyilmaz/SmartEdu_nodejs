const express = require('express');
const categoryController = require('../controllers/categoryControllers');
const roleMiddleware = require('../middlewares/roleMiddleware');
const router = express.Router();


router.route('/').post(categoryController.createCategory); //Localhost:3000/categories


module.exports = router;