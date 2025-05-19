import express from 'express';
import Question from '../models/Question.js';
import Quiz from '../models/Quiz.js';

const router = express.Router();

// Add a question to a quiz
router.post('/', async (req, res) => {
  try {
    const { quizId, prompt, type, options, correctAnswers, explanation, difficulty, tags } = req.body;

    const question = new Question({ quiz: quizId, prompt, type, options, correctAnswers, explanation, difficulty, tags });
    await question.save();

    // Push the question into the quiz
    await Quiz.findByIdAndUpdate(quizId, { $push: { questions: question._id } });

    res.status(201).json(question);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all questions (or by quiz)
router.get('/', async (req, res) => {
  const { quizId } = req.query;
  const filter = quizId ? { quiz: quizId } : {};
  const questions = await Question.find(filter);
  res.json(questions);
});

export default router;