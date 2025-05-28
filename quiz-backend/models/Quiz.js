const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  question: { type: String, required: true },
  questionType: { type: String, enum: ['TrueFalse', 'MultipleChoice', 'ShortAnswer'], required: true },
  answer: { type: String, required: true },
  charLimit: { type: Number, default: 200 },
  feedbackMode: { type: String, enum: ['Default', 'Reveal', 'Retry'], default: 'Default' },
  maxQuestions: { type: Number, default: 1 }
}, { timestamps: true });

module.exports = mongoose.model('Quiz', quizSchema);
