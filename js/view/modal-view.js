import AbstractView from './abstract-view.js';

const KEY_CODE_ESC = 27;

class ModalView extends AbstractView {
  constructor() {
    super();
  }

  get template() {
    return `<section class="modal">
      <form class="modal__inner">
        <button class="modal__close" type="button">
          <span class="visually-hidden">Закрыть</span>
        </button>
        <h2 class="modal__title">Подтверждение</h2>
        <p class="modal__text">Вы уверены что хотите начать игру заново?</p>
        <div class="modal__button-wrapper">
          <button class="modal__btn modal__btn--ok">Ок</button>
          <button class="modal__btn modal__btn--cancel">Отмена</button>
        </div>
      </form>
    </section>`;
  }

  bind(element) {
    const closeBtn = element.querySelector(`.modal__close`);
    const okBtn = element.querySelector(`.modal__btn--ok`);
    const cancelBtn = element.querySelector(`.modal__btn--cancel`);

    const onCancelClick = (evt) => {
      evt.preventDefault();
      this.onCancelClick();
      document.removeEventListener(`keydown`, onEscPress);
    };

    const onEscPress = (evt) => {
      if (evt.keyCode === KEY_CODE_ESC) {
        this.onCancelClick();
        document.removeEventListener(`keydown`, onEscPress);
      }
    };

    document.addEventListener(`keydown`, onEscPress);
    closeBtn.addEventListener(`click`, onCancelClick);
    cancelBtn.addEventListener(`click`, onCancelClick);

    okBtn.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      this.onOkClick();
      document.removeEventListener(`keydown`, onEscPress);
    });
  }

  onOkClick() {}
  onCancelClick() {}
}

export default ModalView;
