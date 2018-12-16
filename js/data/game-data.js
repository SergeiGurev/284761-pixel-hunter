export const INITIAL_GAME = {
  level: 0,
  lives: 3,
  time: 30,
  answers: []
};

export const QuestionType = {
  TWO_OF_TWO: `two-of-two`,
  TINDER_LIKE: `tinder-like`,
  ONE_OF_THREE: `one-of-three`
};

export const AnswerType = {
  PAINTING: `painting`,
  PHOTO: `photo`
};

export const AnswerData = {
  TRUE_POINTS: 100,
  LIVE_POINTS: 50,
  TIME_BONUS_OR_PENALTY: 50,
  FAST_TIME: 10,
  SLOW_TIME: 20,
  MAX_ANSWERS: 10,
  MAX_WRONG_ANSWERS: 3
};
