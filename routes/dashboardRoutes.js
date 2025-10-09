const express = require('express');
const router = express.Router();

// ✅ Middleware: user logged in check
const isAuthenticated = (req, res, next) => {
  if (!req.session.userId) {
    return res.redirect('/');
  }
  next();
};

// ✅ Dashboard route
router.get('/dashboard', isAuthenticated, (req, res) => {
  res.render('dashboard', {
    title: 'English Learning Dashboard',
    userName: req.session.userName
  });
});

// ✅ Lessons route
router.get('/lessons', isAuthenticated, (req, res) => {
  const lessons = [
    { title: 'Lesson 1: Basic Grammar', description: 'Learn sentence formation and structure.' },
    { title: 'Lesson 2: Vocabulary Booster', description: 'Improve your English words knowledge.' },
    { title: 'Lesson 3: Speaking Practice', description: 'Enhance pronunciation and fluency.' }
  ];

  res.render('lessons', {
    title: 'All English Lessons',
    userName: req.session.userName,
    lessons
  });
});

module.exports = router;
