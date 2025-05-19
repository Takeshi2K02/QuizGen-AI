import { generateGeminiContent } from '../services/geminiService.js';
import { parseGeminiOutput } from '../utils/parseGeminiOutput.js';
import Quiz from '../models/Quiz.js';

export const generateQuizFromPassage = async (req, res) => {
  const { passage, total = 5, difficulty = 'medium', title } = req.body;

  if (!passage || !title) {
    return res.status(400).json({ error: 'Missing passage or title' });
  }

  const prompt = `
From the following passage, generate exactly ${total} ${difficulty}-difficulty multiple-choice questions.
Each question must have 5 answer choices, numbered like this:
1. ...
2. ...
3. ...
4. ...
5. ...

After each question, specify the correct answer like this:
Correct: [number]

Do not include explanations or any extra text.

Passage:
"""
${passage}
"""`;

  try {
    const responseText = await generateGeminiContent(prompt);
    const questions = parseGeminiOutput({ candidates: [{ content: { parts: [{ text: responseText }] } }] });

    const quiz = new Quiz({
      title,
      questions
    });

    await quiz.save();

    res.status(201).json(quiz);
  } catch (err) {
    res.status(500).json({ error: 'Gemini request failed', detail: err.message });
  }
};

export const getAllQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find().sort({ createdAt: -1 });
    res.json(quizzes);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch quizzes', detail: err.message });
  }
};

export const getQuizById = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) return res.status(404).json({ error: 'Quiz not found' });
    res.json(quiz);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch quiz', detail: err.message });
  }
};