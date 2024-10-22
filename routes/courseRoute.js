const express = require("express");
const courseControllers = require('../controllers/courseControllers') // Sayfa Yönlendirme Controllers Import
const router = express.Router();

router.route("/").post(courseControllers.createCourse); // Localhost:3000/courses 
router.route("/").get(courseControllers.getAllCourses);

module.exports = router;
