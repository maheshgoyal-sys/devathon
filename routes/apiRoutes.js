const express = require('express');
const router = express.Router();
const Progress = require('../models/Progress');
const Lesson = require('../models/Lesson');

// Middleware
const isAuth = (req, res, next) => {
  if (!req.session || !req.session.userId) return res.status(401).json({ error: 'Not authenticated' });
  next();
};

// GET /api/stats
router.get('/stats', isAuth, async (req, res) => {
  try {
    const userId = req.session.userId;
    let progress = await Progress.findOne({ userId }).populate('completedLessons');

    // If no progress doc, create default
    if (!progress) {
      progress = await Progress.create({ userId });
    }

    const totalLessons = await Lesson.countDocuments();

    // Simple streak calculation
    let streakDays = 0;
    if (progress.lastActive) {
      const last = new Date(progress.lastActive);
      const today = new Date();
      const diffDays = Math.floor((today.setHours(0,0,0,0) - last.setHours(0,0,0,0)) / (1000*60*60*24));
      streakDays = diffDays === 0 ? 1 : 0;
    }

    res.json({
      completedLessons: (progress.completedLessons || []).length,
      totalLessons,
      vocabLearned: progress.vocabLearned || 0,
      testsTaken: progress.testsTaken || 0,
      streakDays
    });
  } catch (err) {
    console.error('API /stats error', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
