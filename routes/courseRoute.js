const express = require("express");
const courseControllers = require('../controllers/courseControllers') // Sayfa Yönlendirme Controllers Import
const roleMiddleware = require('../middlewares/roleMiddleware');
const router = express.Router();


router.route('/').post(roleMiddleware(["teacher", "admin"]), courseControllers.createCourse);  // Localhost:3000/courses 
router.route("/").get(courseControllers.getAllCourses);
router.route("/enroll").post(courseControllers.enrollCourse);
router.route("/release").post(courseControllers.releaseCourse);
router.route("/:slug").get(courseControllers.getOneCourse); // Localhost:3000/courses/41541651415132 
router.route("/:slug").delete(courseControllers.deleteCourse); 
router.route("/:slug").put(courseControllers.updateCourse); 

module.exports = router;
