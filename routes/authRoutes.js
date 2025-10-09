const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Routes
router.get('/', authController.showLogin);
router.post('/login', authController.login);
router.get('/logout', authController.logout);
router.get('/refresh-captcha', authController.refreshCaptcha);

// ✅ Protected dashboard route
router.get('/dashboard', (req, res) => {
  if (!req.session.userId) {
    return res.redirect('/');
  }

  res.render('dashboard', {
    title: 'Dashboard - GLA English Learning Platform',
    userName: req.session.userName,
    userType: req.session.userType
  });
});

module.exports = router;
