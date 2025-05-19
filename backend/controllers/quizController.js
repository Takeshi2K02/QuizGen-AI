import Quiz from '../models/Quiz.js';
import Question from '../models/Question.js';
import { generateQuizFromPassage } from '../services/geminiService.js';
import { parseGeminiOutput } from '../utils/parseGeminiOutput.js';

export const generateQuiz = async (req, res) => {
  try {
    const { passage, title, description } = req.body;

    const geminiRaw = await generateQuizFromPassage(passage);
    const parsed = parseGeminiOutput(geminiRaw);

    const newQuiz = new Quiz({
        title,
        description,
        questions: [],
        createdBy: req.user.userId,
    });

    await newQuiz.save();

    const newQuestion = new Question({
      quiz: newQuiz._id,
      prompt: parsed.question,
      type: 'single',
      options: parsed.options,
      correctAnswers: [parsed.correctIndex],
      explanation: parsed.explanation,
    });

    await newQuestion.save();

    newQuiz.questions.push(newQuestion._id);
    await newQuiz.save();

    res.status(201).json({ quiz: newQuiz, question: newQuestion });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getMyQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find({ createdBy: req.user.userId }).populate('questions');
    res.json(quizzes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};