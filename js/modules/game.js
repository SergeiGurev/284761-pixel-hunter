import getElementFromTemplate from './utils/get-element-from-template.js';
import showScreen from './utils/show-screen.js';
import backToGreeting from './utils/back-to-greeting.js';
import {INITIAL_GAME, levels} from '../data/game-data.js';

import renderHeader from '../templates/header.js';
import renderGame1 from '../templates/game-1.js';
import renderGame2 from '../templates/game-2.js';
import renderGame3 from '../templates/game-3.js';
import renderGameStats from '../templates/game-stats.js';
import renderResults from '../templates/results.js';

import changeLevel from './utils/change-level/change-level.js';
import changeLives from './utils/change-lives/change-lives.js';

const startGame = () => {
  let game = Object.assign({}, INITIAL_GAME, {
    answers: []
  });

  const choiceTypeRender = (type) => {
    let render = null;
    switch (type) {
      case 1:
        render = renderGame1;
        break;
      case 2:
        render = renderGame2;
        break;
      case 3:
        render = renderGame3;
    }
    return render;
  };

  const gameContainerElement = getElementFromTemplate();
  const getLevel = () => levels[game.level];

  const endGame = (state) => {
    const resultsContainerElement = getElementFromTemplate();
    resultsContainerElement.innerHTML = `${renderResults(state)}`;
    backToGreeting(resultsContainerElement);
    showScreen(resultsContainerElement);
  };

  const updateState = (answer) => {

    game.answers.push({
      isTrue: answer,
      time: 15
    });

    if (!answer) {
      if (game.lives === 0) {
        endGame(game);
        return;
      }
      game = changeLives(game, game.lives - 1);
    }

    game = changeLevel(game, game.level + 1);
  };

  const updateGame = (state) => {
    if (state.level === 10) {
      endGame(state);
      return;
    }
    gameContainerElement.innerHTML = (
      `${renderHeader(state)}
      <section class="game">
        ${choiceTypeRender(getLevel().type)(getLevel())}
        ${renderGameStats(state.answers)}
      </section>`
    );

    updateListeners(gameContainerElement);
    backToGreeting(gameContainerElement);
  };

  const updateListeners = (element) => {
    const options = [...element.querySelectorAll(`.game__option`)];
    let optionAnswers = new Map();

    options.forEach((option, index) => {
      const buttons = [...option.querySelectorAll(`.game__answer`)];

      if (buttons.length > 0) {
        for (const button of buttons) {
          const input = button.querySelector(`input`);

          input.addEventListener(`click`, () => {
            const isImageBtn = button.classList.contains(`game__answer--paint`);
            const isNotImageBtn = button.classList.contains(`game__answer--photo`);

            optionAnswers.set(index, (getLevel().images[index].isImage && isImageBtn) || (!getLevel().images[index].isImage && isNotImageBtn));

            if ((optionAnswers.size === options.length)) {
              let levelAnswer = true;

              for (let answer of optionAnswers.values()) {
                levelAnswer = levelAnswer && answer;
              }

              updateState(levelAnswer);
              updateGame(game);
            }
          });
        }
      } else {
        option.addEventListener(`click`, () => {
          const levelAnswer = getLevel().images[index].isImage;

          updateState(levelAnswer);
          updateGame(game);
        });
      }
    });
  };

  updateGame(game);
  showScreen(gameContainerElement);
};

export default startGame;
