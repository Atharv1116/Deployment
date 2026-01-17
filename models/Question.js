const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  inputFormat: String,
  outputFormat: String,
  sampleInput: String,
  sampleOutput: String,
  testCases: [{
    input: String,
    output: String,
    isHidden: { type: Boolean, default: false }
  }],
  difficulty: { type: String, enum: ['easy', 'medium', 'hard'], default: 'easy' },
  tags: [{ type: String }], // e.g., ['arrays', 'sorting', 'two-pointers']
  language: { type: String, default: 'any' },
  solution: String,
  timeLimit: { type: Number, default: 2 }, // seconds
  memoryLimit: { type: Number, default: 256 }, // MB
  points: { type: Number, default: 100 },
  solvedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  attempts: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Question', questionSchema);
