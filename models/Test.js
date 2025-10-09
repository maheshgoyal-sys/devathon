const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  question: String,
  options: [String],
  correct: String
});

const testSchema = new mongoose.Schema({
  _id: String, // <-- use string instead of ObjectId
  title: String,
  level: String,
  questions: [questionSchema]
});

module.exports = mongoose.model('Test', testSchema);
