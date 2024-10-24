const Course = require("../models/Course");
const User = require("../models/User");
const Category = require("../models/Category");
const { name } = require("ejs");

exports.createCourse = async (req, res) => {
  try {
    const course = await Course.create({
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      user: req.session.userID
    });

    req.flash('success', `${req.body.name} course has been created successfully`)
    res.status(201).redirect('/courses')
  } catch (err) {
    res.status(400).json({
      status: "failed",
      err,
    });
  }
};

exports.getAllCourses = async (req, res) => {
  try {
    const categorySlug = req.query.categories;
    const query = req.query.search;
    const category = await Category.findOne({slug: categorySlug})


    let filter = {}

    if(categorySlug){
      filter = {category: category._id}
    }
    if(query){
      filter = {name: query}
    }
    if(!categorySlug && !query){
      filter.name = ""
      filter.category = null
    }

    const courses = await Course.find({
      $or:[
        {name: { $regex: '.*' + filter.name + '.*', $options: 'i'}},
        {category: filter.category}
      ]
    }).sort('-createdAt').populate('user');
    const categories = await Category.find();

    res.status(200).render("courses", {
      courses,
      categories,
      page_name: "courses",
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      err,
    });
  }
};

exports.getOneCourse = async (req, res) => {
  try {
    const user = await User.findById(req.session.userID)
    const course = await Course.findOne({slug: req.params.slug}).populate('user');
    res.status(200).render('course-single', {
      course,
      user,
      page_name: "courses",
    })
  } catch (err) {
    res.status(400).json({
      status: "failed",
      err,
    });
  }
};


exports.enrollCourse = async (req, res) => {
  try {
    const user = await User.findById(req.session.userID);
    await user.courses.addToSet({_id: req.body.course_id}); 
    await user.save();
    res.status(200).redirect('/users/dashboard')
  } catch (err) {
    res.status(400).json({
      status: "failed",
      err,
    });
  }
};

exports.releaseCourse = async (req, res) => {
  try {
    const user = await User.findById(req.session.userID);
    await user.courses.pull({_id: req.body.course_id}); 
    await user.save();
    res.status(200).redirect('/users/dashboard')
  } catch (err) {
    res.status(400).json({
      status: "failed",
      err,
    });
  }
};


exports.deleteCourse = async (req, res) => {
  try {
    await Course.findOneAndDelete({slug: req.params.slug});
    await User.deleteMany({ courses: req.params.id });
    res.status(200).redirect('/users/dashboard')
  } catch (err) {
    res.status(400).json({
      status: "failed",
      err,
    });
  }
};

exports.updateCourse = async (req, res) => {
  try {
    const course = await Course.findOne({slug: req.params.slug});
    course.name = req.body.name;
    course.description = req.body.description;
    course.category = req.body.category;
    course.save();
    res.status(200).redirect('/users/dashboard')
  } catch (err) {
    res.status(400).json({
      status: "failed",
      err,
    });
  }
};