import showScreen from '../utils/show-screen.js';
import greetingElement from './greeting.js';
import {INITIAL_GAME, levels} from '../data/game-data.js';

import Game from '../view/game-view.js';
import Results from '../view/results-view.js';

import changeLevel from '../utils/change-level/change-level.js';
import changeLives from '../utils/change-lives/change-lives.js';

const onBackClick = () => {
  greetingElement();
};

const endGame = (state) => {
  const resultsElement = new Results(state);

  resultsElement.onBackClick = onBackClick;
  showScreen(resultsElement.element);
};

const updateScreen = (state) => {
  if (state.level === levels.length) {
    endGame(state);
    return;
  }

  const game = new Game(state);

  game.updateGame = updateGame;
  game.onBackClick = onBackClick;

  showScreen(game.element);
};

const updateGame = (state, answer) => {
  let newState = Object.assign({}, state);
  newState.answers.push({
    isTrue: answer,
    time: 15
  });

  if (!answer) {
    if (newState.lives === 0) {
      endGame(newState);
      return;
    }
    newState = changeLives(newState, newState.lives - 1);
  }

  newState = changeLevel(newState, newState.level + 1);

  updateScreen(newState);
};

export default () => {
  let game = Object.assign({}, INITIAL_GAME, {
    answers: []
  });

  updateScreen(game);
};
