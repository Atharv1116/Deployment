const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
  roomId: { type: String, required: true, unique: true },
  type: { type: String, enum: ['1v1', '2v2', 'battle-royale'], required: true },
  players: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  playerSocketIds: [String],
  teams: {
    red: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    blue: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
  },
  question: { type: mongoose.Schema.Types.ObjectId, ref: 'Question' },
  winner: mongoose.Schema.Types.ObjectId,
  winnerTeam: String,
  winners: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // For battle royale
  results: [{
    player: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    solved: { type: Boolean, default: false },
    timeTaken: Number, // milliseconds
    attempts: { type: Number, default: 0 },
    score: { type: Number, default: 0 }
  }],
  status: { type: String, enum: ['waiting', 'active', 'finished', 'cancelled'], default: 'waiting' },
  startedAt: Date,
  finishedAt: Date,
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Match', matchSchema);
