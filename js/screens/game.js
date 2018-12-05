import {INITIAL_GAME, levels} from '../data/game-data.js';
import showScreen from '../utils/show-screen.js';
import Application from '../application.js';

import GameView from '../view/game-view.js';
import HeaderView from '../view/header-view.js';
import ResultsView from '../view/results-view.js';

const ONE_SECOND = 1000;
const TIME_TO_ANSWER = INITIAL_GAME.time;
const TOTAL_LEVELS = levels.length;

class GameScreen {
  constructor(model) {
    this.model = model;
    this.content = new GameView(this.model.state);
    this.header = new HeaderView(this.model.state);

    this.root = document.createElement(`div`);
    this.root.appendChild(this.header.element);
    this.root.appendChild(this.content.element);

    this._timer = null;
  }

  _tick() {
    this.updateHeaderView();
    this.model.tick();

    if (!this.model.time) {
      this.updateGame();
    }

    this._timer = setTimeout(() => {
      this._tick();
    }, ONE_SECOND);
  }

  stopTimer() {
    clearInterval(this._timer);
  }

  updateHeaderView() {
    const header = new HeaderView(this.model.state);
    this.root.replaceChild(header.element, this.header.element);
    this.header = header;
    this.header.onBackClick = () => {
      Application.showGreeting();
    };
  }

  updateContentView() {
    const content = new GameView(this.model.state);
    this.root.replaceChild(content.element, this.content.element);
    this.content = content;
  }

  updateGame(answer = false) {
    this.stopTimer();

    const answerTime = TIME_TO_ANSWER - this.model.time;

    this.model.saveAnswer(answer, answerTime);

    if (!answer) {
      if (this.model.isDead()) {
        this.endGame();
        return;
      }
      this.model.removeLive();
    }

    this.model.nextLevel();
    this.model.resetTime();
    this.startGame();
  }

  updateScreen() {
    if (this.model.state.level === TOTAL_LEVELS) {
      this.endGame();
      return;
    }

    this.updateHeaderView();
    this.updateContentView();
    this.content.updateGame = this.updateGame.bind(this);

    showScreen(this.root);
  }

  startGame() {
    this.updateScreen();
    this._tick();
  }

  endGame() {
    const resultsElement = new ResultsView(this.model.state);

    resultsElement.onBackClick = () => {
      Application.showGreeting();
    };

    showScreen(resultsElement.element);
  }
}

export default GameScreen;
