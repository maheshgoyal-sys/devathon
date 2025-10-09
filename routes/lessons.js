const express = require('express');
const router = express.Router();
const Lesson = require('../models/Lesson');
const { isAuthenticated } = require('../middleware/auth');

router.get('/lessons', isAuthenticated, async (req, res) => {
  const lessons = await Lesson.find({}); // show all lessons
  res.render('lessons', { title: 'All Lessons', userName: req.session.userName, lessons });
});

// Lesson Detail page
router.get('/lessons/:id', isAuthenticated, async (req, res) => {
  const lesson = await Lesson.findById(req.params.id);
  if (!lesson) return res.status(404).render('error', { message: 'Lesson not found' });
  res.render('lessonDetail', { title: lesson.title, userName: req.session.userName, lesson });
});

module.exports = router;
