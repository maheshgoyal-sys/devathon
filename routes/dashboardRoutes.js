const express = require('express');
const router = express.Router();
const User = require('../models/User'); // use this if you want real DB fetch

// ✅ Middleware: user logged in check
const isAuthenticated = (req, res, next) => {
  if (!req.session || !req.session.userId) {
    return res.redirect('/'); // redirect to login if not authenticated
  }
  next();
};

// ✅ Dashboard route
router.get('/dashboard', isAuthenticated, (req, res) => {
  res.render('dashboard', {
    title: 'English Learning Dashboard',
    userName: req.session.userName || 'Student'
  });
});

// ✅ Lessons route
router.get('/dashboard/lessons', isAuthenticated, (req, res) => {
  const lessons = [
    { title: 'Lesson 1: Basic Grammar', description: 'Learn sentence formation and structure.' },
    { title: 'Lesson 2: Vocabulary Booster', description: 'Improve your English words knowledge.' },
    { title: 'Lesson 3: Speaking Practice', description: 'Enhance pronunciation and fluency.' }
  ];

  res.render('lessons', {
    title: 'All English Lessons',
    userName: req.session.userName || 'Student',
    lessons
  });
});

// ✅ Profile route (real data fetch from MongoDB)
// Profile route
router.get('/dashboard/profile', isAuthenticated, async (req, res) => {
  console.log('Session data:', req.session); // safe place
  try {
    if (!req.session.userId) {
      return res.redirect('/');
    }

    // Correct query
    const user = await User.findById(req.session.userId); // ✅ use findById since session has _id
    if (!user) {
      return res.status(404).render('error', { message: 'User not found', error: {} });
    }

    res.render('profile', {
      title: 'Your Profile',
      user: {
        name: user.name || 'Student',
        email: user.email || 'Not provided',
        role: user.userType || 'Student'
      }
    });
  } catch (err) {
    console.error('Profile route error:', err);
    res.status(500).render('error', {
      message: 'Something went wrong',
      error: process.env.NODE_ENV === 'development' ? err : {}
    });
  }
});




module.exports = router;
