import { generateQuiz, getMyQuizzes } from '../controllers/quizController.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/generate', requireAuth, generateQuiz);
router.get('/my', requireAuth, getMyQuizzes);

export default router;