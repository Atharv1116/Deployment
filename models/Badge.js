const mongoose = require('mongoose');

const badgeSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: String,
  icon: String,
  category: { type: String, enum: ['achievement', 'streak', 'skill', 'special'], default: 'achievement' },
  requirement: mongoose.Schema.Types.Mixed, // Flexible requirement object
  rarity: { type: String, enum: ['common', 'rare', 'epic', 'legendary'], default: 'common' }
});

module.exports = mongoose.model('Badge', badgeSchema);
