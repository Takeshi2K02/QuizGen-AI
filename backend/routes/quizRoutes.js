import express from 'express';
import { generateQuiz, getMyQuizzes, getQuizById } from '../controllers/quizController.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/generate', requireAuth, generateQuiz);
router.get('/my', requireAuth, getMyQuizzes);
router.get('/:id', requireAuth, getQuizById);

export default router;