import AbstractView from './abstract-view.js';

class Intro extends AbstractView {
  constructor() {
    super();
  }

  get template() {
    return `<section class="intro">
      <button class="intro__asterisk asterisk" type="button"><span class="visually-hidden">Продолжить</span>*</button>
      <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
    </section>`;
  }

  bind(element) {
    const switchScreenBtn = element.querySelector(`.intro__asterisk`);
    switchScreenBtn.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      this.onBtnClick();
    });
  }

  onBtnClick() {}
}

export default Intro;
