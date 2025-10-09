// models/Grammar.js
const mongoose = require('mongoose');

const topicSchema = new mongoose.Schema({
  name: String,
  content: String,
  examples: [String],
  practice: [String] // practice questions
});

const moduleSchema = new mongoose.Schema({
  title: String, // Basic Grammar, Tenses, etc.
  topics: [topicSchema]
});

const grammarSchema = new mongoose.Schema({
  slug: { type: String, unique: true }, // "Grammar"
  title: String, // "Grammar & Usage"
  modules: [moduleSchema]
});

module.exports = mongoose.model('Grammar', grammarSchema);
