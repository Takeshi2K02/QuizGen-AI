// routes/quizRoutes.js
import express from 'express';
import { getAllQuizzes, generateQuizFromPassage, getQuizById } from '../controllers/quizController.js';

const router = express.Router();

router.get('/', getAllQuizzes);
router.post('/generate', generateQuizFromPassage);
router.get('/:id', getQuizById);
export default router;