const renderGame = (level) => {
  switch (level.type) {
    case 1:
      return `<p class="game__task">${level.text}</p>
      <form class="game__content">
        <div class="game__option">
          <img src=${level.images[0].url} alt="Option 1" width="468" height="458">
          <label class="game__answer game__answer--photo">
            <input class="visually-hidden" name="question1" type="radio" value="photo">
            <span>Фото</span>
          </label>
          <label class="game__answer game__answer--paint">
            <input class="visually-hidden" name="question1" type="radio" value="paint">
            <span>Рисунок</span>
          </label>
        </div>
        <div class="game__option">
          <img src=${level.images[1].url} alt="Option 2" width="468" height="458">
          <label class="game__answer  game__answer--photo">
            <input class="visually-hidden" name="question2" type="radio" value="photo">
            <span>Фото</span>
          </label>
          <label class="game__answer  game__answer--paint">
            <input class="visually-hidden" name="question2" type="radio" value="paint">
            <span>Рисунок</span>
          </label>
        </div>
      </form>`;
    case 2:
      return `<p class="game__task">${level.text}</p>
      <form class="game__content  game__content--wide">
        <div class="game__option">
          <img src=${level.images[0].url} alt="Option 1" width="705" height="455">
          <label class="game__answer  game__answer--photo">
            <input class="visually-hidden" name="question1" type="radio" value="photo">
            <span>Фото</span>
          </label>
          <label class="game__answer  game__answer--paint">
            <input class="visually-hidden" name="question1" type="radio" value="paint">
            <span>Рисунок</span>
          </label>
        </div>
      </form>`;
    case 3:
      return `<p class="game__task">${level.text}</p>
      <form class="game__content  game__content--triple">
        <div class="game__option">
          <img src=${level.images[0].url} alt="Option 1" width="304" height="455">
        </div>
        <div class="game__option  game__option--selected">
          <img src=${level.images[1].url} alt="Option 2" width="304" height="455">
        </div>
        <div class="game__option">
          <img src=${level.images[2].url} alt="Option 3" width="304" height="455">
        </div>
      </form>`;
    default:
      return ``;
  }
};

export default renderGame;
