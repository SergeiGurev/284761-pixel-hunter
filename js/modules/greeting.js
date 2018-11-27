import getElementFromTemplate from './utils/get-element-from-template.js';
import showScreen from './utils/show-screen.js';
import rulesElement from './rules.js';
import renderGreeting from '../templates/greeting.js';

const greetingElement = getElementFromTemplate(renderGreeting());
const switchScreenBtn = greetingElement.querySelector(`.greeting__continue`);

switchScreenBtn.addEventListener(`click`, () => {
  showScreen(rulesElement);
});

export default greetingElement;
