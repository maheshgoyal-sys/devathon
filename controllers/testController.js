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
exports.submitTest = async (req, res) => {
  try {
    const { testId, answers } = req.body;
    const test = await Test.findById(testId);
    if (!test) return res.status(404).send('Test not found');

    // Convert answers object to array
    const ansArray = Object.values(answers);

    // Calculate score
    let score = 0;
    test.questions.forEach((q, idx) => {
      if (ansArray[idx] === q.correct) score++;
    });

    const percent = Math.round((score / test.questions.length) * 100);

    // Update user stats
    const user = await User.findById(req.session.userId);
    user.testsTaken = (user.testsTaken || 0) + 1;
    user.totalScore = (user.totalScore || 0) + percent;
    user.avgScore = Math.round(user.totalScore / user.testsTaken);
    await user.save();

    res.render('testResult', {
      title: 'Test Result',
      userName: req.session.userName,
      score: percent,
      total: test.questions.length
    });

  } catch (err) {
    console.error(err);
    res.status(500).send('Something went wrong');
  }
};
