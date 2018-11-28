import getElementFromTemplate from '../utils/get-element-from-template.js';
import backToGreeting from '../utils/back-to-greeting.js';
import game from './game.js';
import renderRules from '../templates/rules.js';

const rulesElement = getElementFromTemplate(renderRules());
const rulesForm = rulesElement.querySelector(`.rules__form`);
const rulesFormInput = rulesElement.querySelector(`.rules__input`);
const rulesFormBtn = rulesElement.querySelector(`.rules__button`);

rulesFormInput.addEventListener(`input`, () => {
  rulesFormBtn.disabled = !rulesFormInput.value;
});

rulesForm.addEventListener(`submit`, (e) => {
  e.preventDefault();
  game();
});

backToGreeting(rulesElement);

export default rulesElement;
