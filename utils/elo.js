function calculateElo(winnerRating, loserRating, k = 32) {
  const expectedWin = 1 / (1 + Math.pow(10, (loserRating - winnerRating) / 400));
  const winnerNew = winnerRating + k * (1 - expectedWin);
  const loserNew = loserRating - k * (1 - expectedWin);
  return [Math.round(winnerNew), Math.round(loserNew)];
}

function calculateTeamElo(team1Ratings, team2Ratings, team1Won, k = 32) {
  const avg1 = team1Ratings.reduce((a, b) => a + b, 0) / team1Ratings.length;
  const avg2 = team2Ratings.reduce((a, b) => a + b, 0) / team2Ratings.length;
  
  const [newAvg1, newAvg2] = calculateElo(
    team1Won ? avg1 : avg2,
    team1Won ? avg2 : avg1,
    k
  );
  
  const delta1 = newAvg1 - Math.round(avg1);
  const delta2 = newAvg2 - Math.round(avg2);
  
  return {
    team1: team1Ratings.map(r => Math.max(0, r + (team1Won ? delta1 : -delta2))),
    team2: team2Ratings.map(r => Math.max(0, r + (team1Won ? -delta1 : delta2)))
  };
}

module.exports = { calculateElo, calculateTeamElo };
