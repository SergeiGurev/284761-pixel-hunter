import showScreen from '../utils/show-screen.js';
import greetingElement from './greeting.js';
import Intro from '../templates/intro.js';

export default () => {
  const introElement = new Intro();

  introElement.onBtnClick = () => {
    greetingElement();
  };

  showScreen(introElement.element);
};
