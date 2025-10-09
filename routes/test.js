const express = require('express');
const router = express.Router();
const testController = require('../controllers/testController');
const isAuthenticated = (req, res, next) => {
  if (!req.session || !req.session.userId) return res.redirect('/');
  next();
};

// Show all tests
router.get('/dashboard/test', isAuthenticated, testController.showTests);

// Start a test
router.get('/dashboard/test/start/:id', isAuthenticated, testController.startTest);

// Submit test
router.post('/dashboard/test/submit', isAuthenticated, testController.submitTest);

module.exports = router;
