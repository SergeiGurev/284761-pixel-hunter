import getScore from '../utils/get-score/get-score.js';
import AbstractView from './abstract-view.js';
import GameStats from './game-stats-view.js';

class Results extends AbstractView {
  constructor(data) {
    super();
    this.data = data.reverse();
    this.win = true;
  }

  get template() {
    const results = this.data.map((game, index) => {
      const renderGameStats = new GameStats(game.answers);
      const score = getScore(game.answers, game.lives);
      const correctAnswers = game.answers.filter((answer) => answer.isTrue).length;
      const fastAnswers = game.answers.filter((answer) => answer.time < 10).length;
      const slowAnswers = game.answers.filter((answer) => answer.time > 20).length;
      if (!index) {
        this.win = !(score < 0);
      }

      return `<table class="result__table">
        <tr>
          <td class="result__number">${index + 1}.</td>
          <td colspan="2">
            ${renderGameStats.template}
          </td>
          <td class="result__points">× 100</td>
          <td class="result__total">${correctAnswers * 100}</td>
        </tr>
        ${fastAnswers > 0 ? `<tr>
          <td></td>
          <td class="result__extra">Бонус за скорость:</td>
          <td class="result__extra">${fastAnswers} <span class="stats__result stats__result--fast"></span></td>
          <td class="result__points">× 50</td>
          <td class="result__total">${fastAnswers * 50}</td>
        </tr>` : ``}
        ${game.lives > 0 ? `<tr>
          <td></td>
          <td class="result__extra">Бонус за жизни:</td>
          <td class="result__extra">${game.lives} <span class="stats__result stats__result--alive"></span></td>
          <td class="result__points">× 50</td>
          <td class="result__total">${game.lives * 50}</td>
        </tr>` : ``}
        ${slowAnswers > 0 ? `<tr>
          <td></td>
          <td class="result__extra">Штраф за медлительность:</td>
          <td class="result__extra">${slowAnswers} <span class="stats__result stats__result--slow"></span></td>
          <td class="result__points">× 50</td>
          <td class="result__total">${-slowAnswers * 50}</td>
        </tr>` : ``}
        <tr>
          <td colspan="5" class="result__total  result__total--final">${score < 0 ? `FAIL` : score}</td>
        </tr>
      </table>`;
    })
    .join(``);

    return `<header class="header">
      <button class="back">
        <span class="visually-hidden">Вернуться к началу</span>
        <svg class="icon" width="45" height="45" viewBox="0 0 45 45" fill="#000000">
          <use xlink:href="img/sprite.svg#arrow-left"></use>
        </svg>
        <svg class="icon" width="101" height="44" viewBox="0 0 101 44" fill="#000000">
          <use xlink:href="img/sprite.svg#logo-small"></use>
        </svg>
      </button>
    </header>
    <section class="result">
      <h2 class="result__title">${this.win ? `Победа!` : `Поражение!`}</h2>
      ${results}
    </section>`;
  }

  bind(element) {
    const backBtn = element.querySelector(`.back`);

    backBtn.addEventListener(`click`, () => {
      this.onBackClick();
    });
  }

  onBackClick() {}
}

export default Results;
