// routes/apiRoutes.js
const express = require('express');
const router = express.Router();
const Progress = require('../models/Progress');
const Lesson = require('../models/Lesson');

// middleware to ensure authenticated
const isAuth = (req, res, next) => {
  if (!req.session || !req.session.userId) return res.status(401).json({ error: 'Not authenticated' });
  next();
};

// GET /api/stats
// returns { completedLessons, totalLessons, vocabLearned, testsTaken, streakDays }
router.get('/stats', isAuth, async (req, res) => {
  try {
    const userId = req.session.userId;
    let progress = await Progress.findOne({ userId }).populate('completedLessons');

    // If no progress doc, create a default one
    if (!progress) {
      progress = await Progress.create({ userId });
    }

    // total lessons count (for percentage)
    const totalLessons = await Lesson.countDocuments();

    // compute streak (consecutive days)
    let streakDays = 0;
    if (progress.lastActive) {
      const last = new Date(progress.lastActive);
      const today = new Date();
      // compute difference in days (floor)
      const diffDays = Math.floor((today.setHours(0,0,0,0) - last.setHours(0,0,0,0)) / (1000*60*60*24));
      // simple logic: if lastActive is today => streak stays or +1 logic could be more elaborate
      // For demo, if lastActive is today => streak = 1 (or store separate streak count)
      streakDays = diffDays === 0 ? 1 : 0; // simple placeholder
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
