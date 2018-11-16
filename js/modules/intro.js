import getElementFromTemplate from './element-maker.js';
import showScreen from './show-screen.js';
import greetingElement from './greeting.js';

const introTemplate = `<section class="intro">
  <button class="intro__asterisk asterisk" type="button"><span class="visually-hidden">Продолжить</span>*</button>
  <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
</section>`;
const introElement = getElementFromTemplate(introTemplate);
const switchScreenBtn = introElement.querySelector(`.intro__asterisk`);

switchScreenBtn.addEventListener(`click`, () => {
  showScreen(greetingElement);
});

export default introElement;
