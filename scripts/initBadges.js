// Initialize default badges
const mongoose = require('mongoose');
const Badge = require('../models/Badge');

const badges = [
  {
    name: 'First Win',
    description: 'Win your first match',
    icon: '🏆',
    category: 'achievement',
    rarity: 'common'
  },
  {
    name: 'Win Streak 5',
    description: 'Win 5 matches in a row',
    icon: '🔥',
    category: 'streak',
    rarity: 'rare'
  },
  {
    name: 'Win Streak 10',
    description: 'Win 10 matches in a row',
    icon: '💪',
    category: 'streak',
    rarity: 'epic'
  },
  {
    name: 'Level 10',
    description: 'Reach level 10',
    icon: '⭐',
    category: 'achievement',
    rarity: 'rare'
  },
  {
    name: 'Level 25',
    description: 'Reach level 25',
    icon: '🌟',
    category: 'achievement',
    rarity: 'epic'
  },
  {
    name: 'Centurion',
    description: 'Play 100 matches',
    icon: '💯',
    category: 'achievement',
    rarity: 'epic'
  },
  {
    name: 'Battle Royale Champion',
    description: 'Win a Battle Royale match',
    icon: '👑',
    category: 'special',
    rarity: 'legendary'
  },
  {
    name: 'Speed Demon',
    description: 'Solve a problem in under 30 seconds',
    icon: '⚡',
    category: 'skill',
    rarity: 'rare'
  }
];

(async () => {
  try {
    require('dotenv').config();
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/codequest');
    console.log('✅ Connected to MongoDB');

    await Badge.deleteMany({});
    await Badge.insertMany(badges);
    console.log(`✅ Inserted ${badges.length} badges`);
  } catch (err) {
    console.error('❌ Error:', err);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
})();
