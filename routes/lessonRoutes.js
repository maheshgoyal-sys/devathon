const express = require('express');
const Lesson = require('../models/Lesson');
const router = express.Router();

router.get('/lessons', async (req, res) => {
  try {
    const lessons = await Lesson.find();
    res.render('lessons', { lessons });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error loading lessons');
  }
});

module.exports = router;
