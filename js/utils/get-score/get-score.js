import {AnswerData} from '../../data/game-data.js';

const getScore = (answers, lives) => {
  const wrongAnswers = answers.filter((answer) => !answer.isTrue).length;

  if (answers.length < AnswerData.MAX_ANSWERS || wrongAnswers > AnswerData.MAX_WRONG_ANSWERS) {
    return -1;
  }

  let points = 0;

  answers.forEach((answer) => {
    if (answer.isTrue) {
      points += AnswerData.TRUE_POINTS;

      if (answer.time < AnswerData.FAST_TIME) {
        points += AnswerData.TIME_BONUS_OR_PENALTY;
      }

      if (answer.time > AnswerData.SLOW_TIME) {
        points -= AnswerData.TIME_BONUS_OR_PENALTY;
      }
    }
  });

  points += lives * AnswerData.LIVE_POINTS;

  return points;
};

export default getScore;
