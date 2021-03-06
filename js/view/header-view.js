import AbstractView from './abstract-view.js';

const BLINK_TIME = 5;

class HeaderView extends AbstractView {
  constructor(state) {
    super();
    this.state = state;
  }

  get template() {
    let timerClass = `game__timer`;
    timerClass += this.state.time <= BLINK_TIME ? ` game__timer--blink` : ``;
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
      <div class="${timerClass}">${this.state.time}</div>
      <div class="game__lives">
        ${new Array(3 - this.state.lives)
          .fill(`<img src="img/heart__empty.svg" class="game__heart" alt=" Missed Life" width="31" height="27">`)
          .join(``)}
        ${new Array(this.state.lives)
          .fill(`<img src="img/heart__full.svg" class="game__heart" alt="Life" width="31" height="27">`)
          .join(``)}
      </div>
    </header>`;
  }

  bind(element) {
    const backBtn = element.querySelector(`.back`);

    backBtn.addEventListener(`click`, () => {
      this.onBackClick();
    });
  }

  onBackClick() {}
}

export default HeaderView;
