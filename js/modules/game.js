import getElementFromTemplate from './utils/get-element-from-template.js';
import showScreen from './utils/show-screen.js';
import backToGreeting from './utils/back-to-greeting.js';
import {INITIAL_GAME, levels} from '../data/game-data.js';

import renderHeader from '../templates/header.js';
import renderGame from '../templates/game.js';
import renderGameStats from '../templates/game-stats.js';
import renderResults from '../templates/results.js';

import changeLevel from './utils/change-level/change-level.js';
import changeLives from './utils/change-lives/change-lives.js';

const getLevel = (state) => levels[state.level];

const endGame = (state) => {
  const resultsElement = getElementFromTemplate(`${renderResults(state)}`);
  backToGreeting(resultsElement);
  showScreen(resultsElement);
};

const updateScreen = (state) => {
  if (state.level === levels.length) {
    endGame(state);
    return;
  }

  const level = getLevel(state);
  const element = getElementFromTemplate(`${renderHeader(state)}
    <section class="game">
      ${renderGame(level)}
      ${renderGameStats(state.answers)}
    </section>`);

  updateListeners(state, element);
  backToGreeting(element);
  showScreen(element);
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

const updateListeners = (state, element) => {
  const options = [...element.querySelectorAll(`.game__option`)];
  let optionAnswers = new Map();
  const levelPics = getLevel(state).images;

  options.forEach((option, index) => {
    const buttons = [...option.querySelectorAll(`.game__answer`)];

    if (buttons.length) {
      for (const button of buttons) {
        const input = button.querySelector(`input`);

        input.addEventListener(`click`, () => {
          const isImageBtn = button.classList.contains(`game__answer--paint`);
          const isNotImageBtn = button.classList.contains(`game__answer--photo`);

          optionAnswers.set(index, (levelPics[index].isImage && isImageBtn) || (!levelPics[index].isImage && isNotImageBtn));

          if ((optionAnswers.size === options.length)) {
            let levelAnswer = [...optionAnswers.values()].every((answer) => answer);

            updateGame(state, levelAnswer);
          }
        });
      }
    } else {
      option.addEventListener(`click`, () => {
        const levelAnswer = levelPics[index].isImage;

        updateGame(state, levelAnswer);
      });
    }
  });
};

const startGame = () => {
  let game = Object.assign({}, INITIAL_GAME, {
    answers: []
  });

  updateScreen(game);
};

export default startGame;
