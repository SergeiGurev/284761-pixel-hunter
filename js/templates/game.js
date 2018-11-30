import resize from '../utils/resize/resize.js';
import {levelTypes, levels} from '../data/game-data.js';
import AbstractView from './abstract-view.js';
import Header from './header.js';
import GameStats from './game-stats.js';

class Game extends AbstractView {
  constructor(state) {
    super();
    this.state = state;
  }

  get level() {
    return levels[this.state.level];
  }

  get template() {
    const renderGameStats = new GameStats(this.state.answers);
    const renderHeader = new Header(this.state);
    const levelType = this.level.type;
    const frameSize = levelTypes[levelType].imageSize;
    let contentClass = `game__content`;
    contentClass += (levelType === `images-1`) ? ` game__content--wide` : ``;
    contentClass += (levelType === `images-3`) ? ` game__content--triple` : ``;

    return `${renderHeader.template}
    <section class="game">
      <p class="game__task">${this.level.text}</p>
      <form class="${contentClass}">
    ${this.level.images.map((image, index) => {
    const size = resize(frameSize, image.size);
    const imageElement = `<img src=${image.url} alt="Option ${index + 1}" width="${size.width}" height="${size.height}">`;

    if (levelType === `images-3`) {
      return `<div class="game__option">
        ${imageElement}
      </div>`;
    }

    return `<div class="game__option">
      ${imageElement}
      <label class="game__answer game__answer--photo">
        <input class="visually-hidden" name="question${index + 1}" type="radio" value="photo">
        <span>Фото</span>
      </label>
      <label class="game__answer game__answer--paint">
        <input class="visually-hidden" name="question${index + 1}" type="radio" value="paint">
        <span>Рисунок</span>
      </label>
    </div>`;
  }
  ).join(``)}
    </form>
    ${renderGameStats.template}
  </section>`;
  }

  bind(element) {
    const backBtn = element.querySelector(`.back`);
    const options = [...element.querySelectorAll(`.game__option`)];
    let optionAnswers = new Map();
    const levelPics = this.level.images;

    backBtn.addEventListener(`click`, () => {
      this.onBackClick();
    });

    options.forEach((option, index) => {
      const buttons = [...option.querySelectorAll(`.game__answer`)];

      if (buttons.length) {
        for (const button of buttons) {
          const input = button.querySelector(`input`);

          input.addEventListener(`click`, () => {
            const isImageBtn = button.classList.contains(`game__answer--paint`);
            const isNotImageBtn = button.classList.contains(`game__answer--photo`);

            optionAnswers.set(index, (levelPics[index].isImage && isImageBtn) || (!levelPics[index].isImage && isNotImageBtn));

            if (optionAnswers.size === options.length) {
              let levelAnswer = [...optionAnswers.values()].every((answer) => answer);

              this.updateGame(this.state, levelAnswer);
            }
          });
        }
      } else {
        option.addEventListener(`click`, () => {
          const levelAnswer = levelPics[index].isImage;

          this.updateGame(this.state, levelAnswer);
        });
      }
    });
  }

  updateGame() {}
  onBackClick() {}
}

export default Game;
