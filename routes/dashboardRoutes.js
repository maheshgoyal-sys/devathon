const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Lesson = require('../models/Lesson');
const testController = require('../controllers/testController'); // ✅ test controller
const isAuthenticated = (req, res, next) => {
  if (!req.session || !req.session.userId) {
    return res.redirect('/');
  }
  next();
};

// --------- Lessons & Dashboard Routes (same as before) ---------

router.get('/dashboard/lessons/:slug/:topicName', isAuthenticated, async (req, res) => {
  try {
    const { slug } = req.params;
    const topicName = decodeURIComponent(req.params.topicName);

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

router.get('/dashboard', isAuthenticated, (req, res) => {
  res.render('dashboard', {
    title: 'English Learning Dashboard',
    userName: req.session.userName || 'Student'
  });
});

// Individual lesson pages
router.get('/dashboard/lessons/Writting', isAuthenticated, (req, res) => {
  res.render('writting', {
    title: 'Writting Skills',
    userName: req.session.userName || 'Student'
  });
});
router.get('/dashboard/lessons/Speaking', isAuthenticated, (req, res) => {
  res.render('speaking', {
    title: 'Speaking Skills',
    userName: req.session.userName || 'Student'
  });
});
router.get('/dashboard/lessons/:slug', isAuthenticated, async (req, res) => {
  try {
    const { slug } = req.params;
    const lesson = await Lesson.findOne({ slug });

    if (!lesson) return res.status(404).render('error', { message: 'Lesson not found', error: {} });

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

// --------- Test Routes using Controller ---------

// Show all tests
router.get('/dashboard/test', isAuthenticated, testController.showTests);

// Start a test
router.get('/dashboard/test/start/:id', isAuthenticated, testController.startTest);

// Submit test
router.post('/dashboard/test/submit', isAuthenticated, testController.submitTest);

// --------- Profile & Other Routes ---------
router.get('/dashboard/profile', isAuthenticated, async (req, res) => {
  try {
    const user = await User.findById(req.session.userId);
    if (!user) return res.status(404).render('error', { message: 'User not found', error: {} });

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
    res.status(500).render('error', { message: 'Something went wrong', error: process.env.NODE_ENV === 'development' ? err : {} });
  }
});

module.exports = router;
