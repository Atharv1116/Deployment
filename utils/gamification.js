// XP calculation based on match result
function calculateXP(result, difficulty, matchType) {
  let baseXP = 0;
  
  // Base XP by difficulty
  const difficultyMultiplier = { easy: 10, medium: 25, hard: 50 };
  baseXP = difficultyMultiplier[difficulty] || 10;
  
  // Match type multiplier
  const typeMultiplier = { '1v1': 1, '2v2': 1.2, 'battle-royale': 1.5 };
  baseXP *= typeMultiplier[matchType] || 1;
  
  // Win bonus
  if (result === 'win') baseXP *= 2;
  else if (result === 'draw') baseXP *= 1.5;
  
  return Math.round(baseXP);
}

// Coins calculation
function calculateCoins(result, difficulty, matchType, position = null) {
  let coins = 0;
  
  const difficultyCoins = { easy: 10, medium: 25, hard: 50 };
  coins = difficultyCoins[difficulty] || 10;
  
  if (result === 'win') coins *= 2;
  
  // Battle Royale position bonus
  if (matchType === 'battle-royale' && position === 1) {
    coins *= 3; // Winner gets 3x
  } else if (matchType === 'battle-royale' && position <= 3) {
    coins *= 1.5; // Top 3 get bonus
  }
  
  return Math.round(coins);
}

// Check and award badges
async function checkBadges(user, Badge) {
  const newBadges = [];
  const badges = await Badge.find();
  
  for (const badge of badges) {
    if (user.badges.includes(badge.name)) continue;
    
    let earned = false;
    
    switch (badge.name) {
      case 'First Win':
        earned = user.wins >= 1;
        break;
      case 'Win Streak 5':
        earned = user.streak >= 5;
        break;
      case 'Win Streak 10':
        earned = user.streak >= 10;
        break;
      case 'Level 10':
        earned = user.level >= 10;
        break;
      case 'Level 25':
        earned = user.level >= 25;
        break;
      case 'Centurion':
        earned = user.matches >= 100;
        break;
      case 'Battle Royale Champion':
        // Check if user won a battle royale (would need match history)
        break;
    }
    
    if (earned) {
      user.badges.push(badge.name);
      newBadges.push(badge);
    }
  }
  
  if (newBadges.length > 0) {
    await user.save();
  }
  
  return newBadges;
}

module.exports = { calculateXP, calculateCoins, checkBadges };
