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

  preloader(preload) {
    this.preload = preload;
    const preloader = this.element.querySelector(`.intro__asterisk`);

    if (this.preload) {
      preloader.classList.add(`intro__asterisk--animation`);
    } else {
      preloader.classList.remove(`intro__asterisk--animation`);
    }
  }
}

export default Intro;