const mongoose = require("mongoose"); // Mongodb için (NPM)
const slugify = require("slugify"); // CORE
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  slug: {
    type: String,
    unique: true,
  }
});

CategorySchema.pre('validate', function(next){
  this.slug = slugify(this.name, {
    lower: true,
    strict: true,
  });
  next();
})

const Category = mongoose.model("Category", CategorySchema);

module.exports = Category;
