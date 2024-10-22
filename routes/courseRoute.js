const express = require("express");
const courseControllers = require('../controllers/courseControllers') // Sayfa Yönlendirme Controllers Import
const router = express.Router();

router.route("/").post(courseControllers.createCourse); // Localhost:3000/courses 
router.route("/").get(courseControllers.getAllCourses);
router.route("/:slug").get(courseControllers.getOneCourse); // Localhost:3000/courses/41541651415132 

module.exports = router;
