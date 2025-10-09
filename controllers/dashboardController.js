const Lesson = require('../models/Lesson');

exports.showDashboard = (req, res) => {
  res.render('dashboard', {
    title: 'GLA English Learning Platform',
    userName: req.session.userName
  });
};

exports.listLessons = async (req, res) => {
  const lessons = await Lesson.find().sort({ createdAt: 1 });
  res.render('lessons', {
    title: 'All Lessons',
    userName: req.session.userName,
    lessons
  });
};

exports.showLesson = async (req, res) => {
  const lesson = await Lesson.findById(req.params.id);
  if (!lesson) return res.redirect('/lessons');

  res.render('lesson', {
    title: lesson.title,
    userName: req.session.userName,
    lesson
  });
};
