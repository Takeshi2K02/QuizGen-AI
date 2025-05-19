import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  quiz: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' },
  prompt: { type: String, required: true },
  type: {
    type: String,
    enum: ['single', 'multiple', 'dragdrop'], // future extensibility
    default: 'single',
  },
  options: [{ type: String }], // used in all question types
  correctAnswers: [{ type: Number }], // index-based (single: [2], multiple: [1,3])
  explanation: String,
  difficulty: { type: String, enum: ['easy', 'medium', 'hard'], default: 'medium' },
  tags: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Question', questionSchema);