import {INITIAL_GAME} from '../data/game-data.js';

import changeLevel from '../utils/change-level/change-level.js';
import changeLives from '../utils/change-lives/change-lives.js';
import changeTime from '../utils/change-time/change-time.js';

class GameModel {
  constructor(data, playerName) {
    this.playerName = playerName;
    this._data = data;
    this.start();
  }

  get state() {
    return this._state;
  }

  get time() {
    return this._state.time;
  }

  get data() {
    return this._data;
  }

  resetTime() {
    this._state.time = INITIAL_GAME.time;
  }

  start() {
    this._state = Object.assign({}, INITIAL_GAME, {
      answers: []
    });
  }

  end() {
    return this._state.level === this._data.length;
  }

  saveAnswer(answer, time) {
    this._state.answers.push({
      isTrue: answer,
      time
    });
  }

  nextLevel() {
    this._state = changeLevel(this._state, this._state.level + 1);
  }

  removeLive() {
    this._state = changeLives(this._state, this._state.lives - 1);
  }

  isDead() {
    return this._state.lives <= 0;
  }

  tick() {
    this._state = changeTime(this._state, this._state.time - 1);
  }
}

export default GameModel;
