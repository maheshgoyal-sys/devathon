const Test = require('../models/Test');
const User = require('../models/User');

// Show all tests
exports.showTests = async (req, res) => {
  try {
    const tests = await Test.find();
    res.render('test', {
      title: 'Tests & Assessments',
      userName: req.session.userName,
      tests
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Something went wrong');
  }
};

// Start a test
exports.startTest = async (req, res) => {
  try {
    const testId = req.params.id;
    const test = await Test.findById(testId);
    if (!test) return res.status(404).send('Test not found');

    res.render('testStart', {
      title: test.title,
      userName: req.session.userName,
      test
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Something went wrong');
  }
};

// Submit test
// controllers/testController.js

exports.submitTest = async (req, res) => {
  try {
    const { testId, answers } = req.body;
    const test = await Test.findById(testId);
    if (!test) return res.status(404).send('Test not found');

    // Convert answers object to array
    const userAnswers = Object.values(answers);

    // Track correct and wrong questions
    let scoreCount = 0;
    const correctAnswers = [];
    const wrongAnswers = [];

    test.questions.forEach((q, idx) => {
      if (userAnswers[idx] === q.correct) {
        scoreCount++;
        correctAnswers.push(idx);
      } else {
        wrongAnswers.push(idx);
      }
    });

    const percent = Math.round((scoreCount / test.questions.length) * 100);

    // Update user stats
    const user = await User.findById(req.session.userId);
    user.testsTaken = (user.testsTaken || 0) + 1;
    user.totalScore = (user.totalScore || 0) + percent;
    user.avgScore = Math.round(user.totalScore / user.testsTaken);
    await user.save();

    // Render test result with detailed info
    res.render('testResult', {
      title: 'Test Result',
      userName: req.session.userName,
      test,
      score: percent,
      total: test.questions.length,
      userAnswers,
      correctAnswers,
      wrongAnswers
    });

  } catch (err) {
    console.error(err);
    res.status(500).send('Something went wrong');
  }
};

