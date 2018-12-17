import {INITIAL_GAME} from '../data/game-data.js';
import showScreen from '../utils/show-screen.js';
import Application from '../application.js';

import GameView from '../view/game-view.js';
import HeaderView from '../view/header-view.js';
import ModalView from '../view/modal-view.js';

const ONE_SECOND = 1000;
const TIME_TO_ANSWER = INITIAL_GAME.time;

class GameScreen {
  constructor(model) {
    this.model = model;
    this.content = new GameView(this.model.state, this.model.data);
    this.header = new HeaderView(this.model.state);

    this.root = document.createElement(`div`);
    this.root.appendChild(this.header.element);
    this.root.appendChild(this.content.element);

    this._timer = null;
  }

  _tick() {
    this.updateHeaderView();

    if (!this.model.time) {
      this.updateGame();
      return;
    }

    this.model.tick();

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
      this.stopTimer();
      const modal = new ModalView();
      const body = document.querySelector(`body`);

      body.appendChild(modal.element);

      modal.onCancelClick = () => {
        this._tick();
        body.removeChild(modal.element);
      };

      modal.onOkClick = () => {
        Application.showGreeting(this.model.data);
        body.removeChild(modal.element);
      };
    };
  }

  updateContentView() {
    const content = new GameView(this.model.state, this.model.data);
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
    this.updateScreen();
  }

  updateScreen() {
    if (this.model.end()) {
      this.stopTimer();
      this.endGame();
      return;
    }

    this._tick();
    this.updateContentView();
    this.content.updateGame = this.updateGame.bind(this);

    showScreen(this.root);
  }

  endGame() {
    Application.showResults(this.model);
  }
}

export default GameScreen;
