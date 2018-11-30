import showScreen from '../utils/show-screen.js';
import rulesElement from './rules.js';
import Greeting from '../templates/greeting.js';

export default () => {
  const greetingElement = new Greeting();

  greetingElement.onBtnClick = () => {
    rulesElement();
  };

  showScreen(greetingElement.element);
};
