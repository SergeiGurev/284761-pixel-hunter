import resize from '../utils/resize/resize.js';
import {levelTypes} from '../data/game-data.js';

const renderGame = (level) => {
  const levelType = level.type;
  const frameSize = levelTypes[levelType].imageSize;
  let contentClass = `game__content`;
  contentClass += (levelType === `images-1`) ? ` game__content--wide` : ``;
  contentClass += (levelType === `images-3`) ? ` game__content--triple` : ``;

  return `<p class="game__task">${level.text}</p>
  <form class="${contentClass}">
  ${level.images.map((image, index) => {
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
  </form>`;
};

export default renderGame;
