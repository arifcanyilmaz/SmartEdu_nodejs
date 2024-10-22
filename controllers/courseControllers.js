const Course = require("../models/Course");

exports.createCourse = async (req, res) => {
  try {
    const course = await Course.create(req.body);

    res.status(201).json({
      status: "succes",
      course,
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      err,
    });
  }
};

exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find().sort('-createdAt');
    res.status(200).render('courses', {
      courses,
      page_name: 'courses',
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      err,
    });
  }
};