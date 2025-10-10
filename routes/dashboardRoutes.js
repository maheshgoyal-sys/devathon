const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Lesson = require('../models/Lesson');
const testController = require('../controllers/testController'); 

// ✅ Auth middleware
const isAuthenticated = (req, res, next) => {
  if (!req.session || !req.session.userId) {
    return res.redirect('/');
  }
  next();
};

// ✅ Random Topics List (for AI Speaking)
const speakingTopics = [
  "Describe your favorite movie and why you like it.",
  "What would you do if you won a million dollars?",
  "Talk about a hobby that makes you happy.",
  "Describe your dream job and why it interests you.",
  "What is your opinion about artificial intelligence?",
  "Describe a memorable vacation you have taken.",
  "If you could change one thing in the world, what would it be?",
  "Talk about a challenge you overcame recently.",
  "Who is your role model and why?",
  "Do you think technology has made life better or worse?"
];

// ✅ API: Random Topic Generator
router.get('/api/random-topic', isAuthenticated, (req, res) => {
  const randomTopic = speakingTopics[Math.floor(Math.random() * speakingTopics.length)];
  res.json({ topic: randomTopic });
});

// --------- Lessons & Dashboard Routes ---------

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
    res.status(500).render('error', { message: 'Something went wrong', error: {} });
  }
});

// ✅ Dashboard main page
router.get('/dashboard', isAuthenticated, (req, res) => {
  res.render('dashboard', {
    title: 'English Learning Dashboard',
    userName: req.session.userName || 'Student'
  });
});

// ✅ Settings page
router.get('/dashboard/settings', isAuthenticated, (req, res) => {
  res.render('settings', {
    title: 'Settings - English Learning Platform',
    userName: req.session.userName || 'Student'
  });
});

// ✅ Profile page
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
    res.status(500).render('error', { message: 'Something went wrong', error: {} });
  }
});

module.exports = router;
