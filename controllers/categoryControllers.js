const Category = require("../models/Category");

exports.createCategory = async (req, res) => {
  try {
    const category = await Category.create(req.body);

    res.status(201).json({
      status: "succes",
      category,
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      err,
    });
  }
};

