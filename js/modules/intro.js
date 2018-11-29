import getElementFromTemplate from '../utils/get-element-from-template.js';
import showScreen from '../utils/show-screen.js';
import greetingElement from './greeting.js';
import renderIntro from '../templates/intro.js';

const introElement = getElementFromTemplate(renderIntro());
const switchScreenBtn = introElement.querySelector(`.intro__asterisk`);

switchScreenBtn.addEventListener(`click`, () => {
  showScreen(greetingElement);
});

export default introElement;
