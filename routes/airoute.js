const express = require("express");
const router = express.Router();
const User = require("../models/User");
require("dotenv").config();

const { GoogleGenerativeAI } = require("@google/generative-ai");

// Gemini Client
const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
);

// ------------------ Topics ------------------
const aiTopics = [
  "Describe your daily routine in English.",
  "Talk about your favorite movie.",
  "Explain your hobbies.",
  "Describe a memorable trip.",
  "Talk about your future goals.",
  "Describe a person who inspired you.",
  "What is your dream job?",
  "Importance of education in life.",
  "Advantages and disadvantages of social media.",
  "Describe your college experience."
];

// ------------------ Auth Middleware ------------------
function isAuthenticated(req, res, next) {
  if (req.session && req.session.userId) {
    return next();
  }
  return res.redirect("/login");
}

// ------------------ Random Topic API ------------------
router.get("/dashboard/api/random-topic", (req, res) => {
  const topic =
    aiTopics[Math.floor(Math.random() * aiTopics.length)];

  res.json({
    success: true,
    topic
  });
});

// ------------------ GET AI Page ------------------
router.get("/dashboard/ai", isAuthenticated, async (req, res) => {
  try {
    const user = await User.findById(req.session.userId);

    const randomTopic =
      aiTopics[Math.floor(Math.random() * aiTopics.length)];

    res.render("ai", {
      title: "AI English Speaking Feedback",
      userName: req.session.userName,
      user,
      topic: randomTopic,
      studentAnswer: "",
      feedback: "",
      showAlert: true
    });

  } catch (error) {
    console.error(error);
    res.redirect("/dashboard");
  }
});

// ------------------ POST AI Feedback ------------------
router.post("/dashboard/ai", isAuthenticated, async (req, res) => {
  try {
    const { topic, studentAnswer } = req.body;

    if (!topic || !studentAnswer) {
      return res.redirect("/dashboard/ai");
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash"
    });

    const prompt = `
You are an expert English speaking trainer.

Topic:
${topic}

Student Answer:
${studentAnswer}

Analyze the student's answer and provide:

1. Overall Evaluation
2. Grammar Mistakes
3. Vocabulary Improvements
4. Fluency Score (out of 10)
5. Confidence Score (out of 10)
6. Corrected Version
7. Improved Professional Version
8. Ideal Sample Answer

Format the response clearly using headings.
`;

    const result = await model.generateContent(prompt);

    const feedback = result.response.text();

    const user = await User.findById(req.session.userId);

    res.render("ai", {
      title: "AI English Speaking Feedback",
      userName: req.session.userName,
      user,
      topic,
      studentAnswer,
      feedback,
      showAlert: false
    });

  } catch (error) {
    console.error("Gemini Error:", error);

    const user = await User.findById(req.session.userId);

    res.render("ai", {
      title: "AI English Speaking Feedback",
      userName: req.session.userName,
      user,
      topic: req.body.topic || "",
      studentAnswer: req.body.studentAnswer || "",
      feedback:
        "❌ Unable to generate AI feedback. Please check your Gemini API key and try again.",
      showAlert: false
    });
  }
});

module.exports = router;