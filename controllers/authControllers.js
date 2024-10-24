const User = require("../models/User");
const Category = require("../models/Category");
const Course = require("../models/Course");
const bcrypt = require("bcrypt"); // Şifreleme için (NPM)
const session = require("express-session");
const { validationResult } = require("express-validator");

exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);

    res.status(201).redirect('/login')
  } catch (err) {
    const errors = validationResult(req);

    for(let i= 0; i< errors.array().length; i++){
      req.flash('error', ` ${errors.array()[i].msg}`)
    }

    
    res.status(400).redirect('/register')
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (user) {
      bcrypt.compare(password, user.password, (err, same) => {
        if (same) {
          req.session.userID = user._id;
          req.flash('success', 'Welcome to SmartEdu')
          res.status(200).redirect('/users/dashboard');
        } else {
          req.flash('error', `Your Password Is Not Valid!`)
          res.status(400).redirect('/login');
        }
      });
    } else {
      req.flash('error', `User Is Not Exist!`)
      res.status(400).redirect('/login');
    }
  } catch (error) {
    req.flash('error', `ERROR`)
    res.status(400).redirect('/login');
  }
};

exports.loginOutUser = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
};

exports.getDashboardPage = async (req, res) => {
  const user = await User.findOne({_id:  req.session.userID }).populate('courses');
  const categories = await Category.find();
  const courses = await Course.find({user: req.session.userID});
  const users = await User.find();
  res.status(200).render("dashboard", {
    page_name: "dashboard",
    user,
    categories,
    courses,
    users,
  });
};

exports.deleteUsers = async (req, res) => {
  try {

    await User.findByIdAndDelete(req.params.id);
    await Course.deleteMany({user: req.params.id})
    res.status(200).redirect('/users/dashboard')
  } catch (err) {
    res.status(400).json({
      status: "failed",
      err,
    });
  }
};