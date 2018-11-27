const getScore = (answers, lives) => {
  if (answers.length < 10) {
    return -1;
  }

  const TRUE_POINTS = 100;
  const LIVE_POINTS = 50;
  const TIME_BONUS_OR_PENALTY = 50;
  const FAST_TIME = 10;
  const SLOW_TIME = 20;
  let points = 0;

  answers.forEach((answer) => {
    if (answer.isTrue) {
      points += TRUE_POINTS;

      if (answer.time < FAST_TIME) {
        points += TIME_BONUS_OR_PENALTY;
      }

      if (answer.time > SLOW_TIME) {
        points -= TIME_BONUS_OR_PENALTY;
      }
    }
  });

  points += lives * LIVE_POINTS;

  return points;
};

export default getScore;
