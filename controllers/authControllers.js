const User = require("../models/User");
const bcrypt = require("bcrypt"); // Şifreleme için (NPM)
const session = require("express-session");

exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);

    res.status(201).json({
      status: "succes",
      user,
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      err,
    });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).send("User Not Found!");
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(400).send("Invalid Password");
    }
    req.session.userID = user._id;
    res.status(200).redirect("/users/dashboard");
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "failed",
      err,
    });
  }
};

exports.loginOutUser = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
};

exports.getDashboardPage = async (req, res) => {
  const user = await User.findOne({_id:  req.session.userID })
  res.status(200).render("dashboard", {
    page_name: "dashboard",
    user,
  });
};
