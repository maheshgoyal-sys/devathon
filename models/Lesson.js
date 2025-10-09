const mongoose = require('mongoose');

const topicSchema = new mongoose.Schema({
  name: String,         // e.g., "Nouns"
  content: String,      // Explanation
  examples: [String]    // Array of examples
});

const moduleSchema = new mongoose.Schema({
  title: String,        // e.g., "Basic Grammar"
  topics: [topicSchema] // Array of topics
});

const lessonSchema = new mongoose.Schema({
  slug: { type: String, unique: true }, // e.g., "Grammar"
  title: String,                        // e.g., "Grammar & Usage"
  modules: [moduleSchema]
});

module.exports = mongoose.model('Lesson', lessonSchema);
