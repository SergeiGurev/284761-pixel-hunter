import showScreen from '../utils/show-screen.js';
import rulesElement from './rules.js';
import Greeting from '../view/greeting-view.js';

export default () => {
  const greetingElement = new Greeting();

  greetingElement.onBtnClick = () => {
    rulesElement();
  };

  showScreen(greetingElement.element);
};
