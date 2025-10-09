// models/Progress.js
const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  completedLessons: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' }],
  vocabLearned: { type: Number, default: 0 },
  testsTaken: { type: Number, default: 0 },
  lastActive: { type: Date, default: null }, // for streak calc
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Progress', progressSchema);
