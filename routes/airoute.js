const express = require("express");
const router = express.Router();
const OpenAI = require("openai");
const User = require("../models/User");
require("dotenv").config();

// ------------------ OpenRouter client ------------------
const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
  defaultHeaders: {
    "HTTP-Referer": "http://localhost:3000",
    "X-Title": "GLA English AI",
  },
});

const aiTopics = [
  "Describe your daily routine in English.",
  "Talk about your favorite movie.",
  "Explain your hobbies.",
  "Describe a memorable trip.",
  "Talk about your future goals.",
];

// ------------------ Auth middleware ------------------
function isAuthenticated(req, res, next) {
  if (req.session && req.session.userId) next();
  else res.redirect("/login");
}

// ------------------ GET ------------------
router.get("/dashboard/ai", isAuthenticated, async (req, res) => {
  const user = await User.findById(req.session.userId);
  const randomTopic = aiTopics[Math.floor(Math.random() * aiTopics.length)];
  res.render("ai", {
    title: "AI Feedback System",
    userName: req.session.userName,
    user,
    topic: randomTopic,
    studentAnswer: "",
    feedback: "",
  });
});

// ------------------ POST ------------------
router.post("/dashboard/ai", isAuthenticated, async (req, res) => {
  const { topic, studentAnswer } = req.body;
  if (!studentAnswer || !topic) return res.redirect("/dashboard/ai");

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content:
            "You are an English teacher. Evaluate the student's English answer and give detailed feedback about grammar, vocabulary, fluency, and improvement suggestions.",
        },
        {
          role: "user",
          content: `Topic: ${topic}\nStudent Answer: ${studentAnswer}`,
        },
      ],
    });

    const feedback = completion.choices?.[0]?.message?.content || "No feedback generated.";
    const user = await User.findById(req.session.userId);

    res.render("ai", {
      title: "AI Feedback System",
      userName: req.session.userName,
      user,
      topic,
      studentAnswer,
      feedback,
    });
  } catch (error) {
    console.error("OpenRouter AI error:", error.response ? error.response.data : error);
    const user = await User.findById(req.session.userId);
    res.render("ai", {
      title: "AI Feedback System",
      userName: req.session.userName,
      user,
      topic,
      studentAnswer,
      feedback: "Error evaluating your answer. Please try again later.",
    });
  }
});

module.exports = router;
