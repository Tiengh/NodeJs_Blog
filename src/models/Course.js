const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');

mongoose.plugin(slug);

const CourseSchema = new Schema({
  name: { type: String, maxLength: 255 },
  description: { type: String, maxLength: 600 },
  image: { type: String, maxLength: 255 },
  slug: { type: String, slug: 'name', unique: true, slug_padding_size: 1 },
  videoId: { type: String },
  level: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Course', CourseSchema);
