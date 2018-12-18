import {AnswerData} from '../../data/game-data.js';

const getScore = (answers, lives) => {
  const wrongAnswers = answers.filter((answer) => !answer.isTrue).length;

  if (answers.length < AnswerData.MAX_ANSWERS || wrongAnswers > AnswerData.MAX_WRONG_ANSWERS) {
    return -1;
  }

  let points = answers.reduce((total, answer) => {
    let answerPoints = 0;
    if (answer.isTrue) {
      answerPoints += AnswerData.TRUE_POINTS;

      if (answer.time < AnswerData.FAST_TIME) {
        answerPoints += AnswerData.TIME_BONUS_OR_PENALTY;
      }

      if (answer.time > AnswerData.SLOW_TIME) {
        answerPoints -= AnswerData.TIME_BONUS_OR_PENALTY;
      }
    }

    return total + answerPoints;
  }, 0);

  points += lives * AnswerData.LIVE_POINTS;

  return points;
};

export default getScore;
