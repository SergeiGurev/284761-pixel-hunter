import showScreen from '../utils/show-screen.js';
import game from './game.js';
import greetingElement from './greeting.js';
import Rules from '../view/rules-view.js';

export default () => {
  const rulesElement = new Rules();
  const rulesFormBtn = rulesElement.element.querySelector(`.rules__button`);
  const rulesFormInput = rulesElement.element.querySelector(`.rules__input`);

  rulesElement.onInput = () => {
    rulesFormBtn.disabled = !rulesFormInput.value;
  };

  rulesElement.onSubmit = () => {
    game();
  };

  rulesElement.onBackClick = () => {
    greetingElement();
  };

  showScreen(rulesElement.element);
};
