import resize from '../utils/resize/resize.js';
import {QuestionType, AnswerType} from '../data/game-data.js';
import AbstractView from './abstract-view.js';
import GameStats from './game-stats-view.js';

class Game extends AbstractView {
  constructor(state, data) {
    super();
    this.data = data;
    this.state = state;
  }

  get level() {
    return this.data[this.state.level];
  }

  get template() {
    const renderGameStats = new GameStats(this.state.answers);
    const levelType = this.level.type;
    let contentClass = `game__content`;
    contentClass += (levelType === QuestionType.TINDER_LIKE) ? ` game__content--wide` : ``;
    contentClass += (levelType === QuestionType.ONE_OF_THREE) ? ` game__content--triple` : ``;

    return `<section class="game">
      <p class="game__task">${this.level.question}</p>
      <form class="${contentClass}">
    ${this.level.answers.map((answer, index) => {
    const image = new Image();
    image.src = answer.image.url;

    const size = resize({
      width: answer.image.width,
      height: answer.image.height
    }, {
      width: image.width,
      height: image.height
    });

    const imageElement = `<img src=${answer.image.url} alt="Option ${index + 1}" width="${size.width}" height="${size.height}">`;
    const tempAnswer = `<span style="position: absolute; font-size: 25px; color: red">${answer.type}</span>`;

    if (levelType === QuestionType.ONE_OF_THREE) {
      return `<div class="game__option">
        ${tempAnswer}
        ${imageElement}
      </div>`;
    }

    return `<div class="game__option">
      ${tempAnswer}
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
    const options = [...element.querySelectorAll(`.game__option`)];
    const levelAnswers = this.level.answers;
    let optionAnswers = new Map();
    let answerType;

    if (this.level.type === QuestionType.ONE_OF_THREE) {
      const paintAnswers = this.level.answers.filter((answer) => answer.type === AnswerType.PAINTING);
      answerType = paintAnswers.length === 1 ? AnswerType.PAINTING : AnswerType.PHOTO;
    }

    options.forEach((option, index) => {
      const buttons = [...option.querySelectorAll(`.game__answer`)];

      if (buttons.length) {
        for (const button of buttons) {
          const input = button.querySelector(`input`);

          input.addEventListener(`click`, () => {
            const isImageBtn = button.classList.contains(`game__answer--paint`);
            const isNotImageBtn = button.classList.contains(`game__answer--photo`);
            const isImage = levelAnswers[index].type === AnswerType.PAINTING;
            const isNotImage = levelAnswers[index].type === AnswerType.PHOTO;

            optionAnswers.set(index, ((isImage && isImageBtn) || (isNotImage && isNotImageBtn)));

            if (optionAnswers.size === options.length) {
              let levelAnswer = [...optionAnswers.values()].every((answer) => answer);

              this.updateGame(levelAnswer);
            }
          });
        }
      } else {
        option.addEventListener(`click`, () => {
          const levelAnswer = levelAnswers[index].type === answerType;

          this.updateGame(levelAnswer);
        });
      }
    });
  }

  updateGame() {}
}

export default Game;
