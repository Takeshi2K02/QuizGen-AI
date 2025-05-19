import mongoose from 'mongoose';

const embeddedQuestionSchema = new mongoose.Schema({
  prompt: { type: String, required: true },
  type: {
    type: String,
    enum: ['single', 'multiple', 'dragdrop'],
    default: 'single',
  },
  options: [{ type: String }],
  correctAnswers: [{ type: Number }],
  explanation: { type: String, default: '' },
}, { _id: false });

const quizSchema = new mongoose.Schema({
  title: { type: String, required: true },
  questions: [embeddedQuestionSchema],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Quiz', quizSchema);
