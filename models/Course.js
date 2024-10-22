const mongoose = require("mongoose"); // Mongodb için (NPM)
const slugify = require("slugify"); // CORE
const Schema = mongoose.Schema;

const CourseSchema = new Schema({
  name: {
    type: String,
    unique: true,
    require: true,
  },
  description: {
    type: String,
    require: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  slug: {
    type: String,
    unique: true,
  }
});

CourseSchema.pre('validate', function(next){
  this.slug = slugify(this.name, {
    lower: true,
    strict: true,
  });
  next();
})

const Course = mongoose.model("Course", CourseSchema);

module.exports = Course;
