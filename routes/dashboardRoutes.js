const express = require('express');
const router = express.Router();
const User = require('../models/User'); // use this if you want real DB fetch
const Lesson = require('../models/Lesson'); // import Lesson model

// ✅ Middleware: user logged in check
const isAuthenticated = (req, res, next) => {
  if (!req.session || !req.session.userId) {
    return res.redirect('/'); // redirect to login if not authenticated
  }
  next();
};
router.get('/dashboard/lessons/:slug/:topicName', isAuthenticated, async (req, res) => {
  try {
    const { slug } = req.params;
    const topicName = decodeURIComponent(req.params.topicName); // ✅ decode

    const lesson = await Lesson.findOne({ slug });
    if (!lesson) return res.status(404).render('error', { message: 'Lesson not found', error: {} });

    let topicData = null;
    lesson.modules.forEach(mod => {
      mod.topics.forEach(topic => {
        if (topic.name.toLowerCase() === topicName.toLowerCase()) {
          topicData = topic;
        }
      });
    });

    if (!topicData) return res.status(404).render('error', { message: 'Topic not found', error: {} });

    res.render('topicDetail', {
      title: topicData.name,
      userName: req.session.userName || 'Student',
      topic: topicData,
      lessonTitle: lesson.title
    });
  } catch (err) {
    console.error('Topic route error:', err);
    res.status(500).render('error', { message: 'Something went wrong', error: process.env.NODE_ENV === 'development' ? err : {} });
  }
});


// ✅ Dashboard route
router.get('/dashboard', isAuthenticated, (req, res) => {
  res.render('dashboard', {
    title: 'English Learning Dashboard',
    userName: req.session.userName || 'Student'
  });
});

// ✅ Lessons route
// ✅ Individual lesson detail page

// Individual lesson detail page
router.get('/dashboard/lessons/:slug', isAuthenticated, async (req, res) => {
  try {
    const { slug } = req.params;
    const lesson = await Lesson.findOne({ slug });

    if (!lesson) return res.status(404).render('error', { message: 'Lesson not found', error: {} });

    // Check if the slug is for 'Grammar' and render the new view
    if (slug.toLowerCase() === 'grammar') {
      return res.render('basicGrammar', {
        title: 'Grammar & Usage',
        userName: req.session.userName || 'Student'
      });
    }

    res.render('lessonDetail', {
      title: lesson.title,
      userName: req.session.userName || 'Student',
      lesson
    });
  } catch (err) {
    console.error('Lesson route error:', err);
    res.status(500).render('error', { message: 'Something went wrong', error: process.env.NODE_ENV === 'development' ? err : {} });
  }
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
