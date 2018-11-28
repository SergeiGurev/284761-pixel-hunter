import showScreen from './show-screen.js';
import greetingElement from '../modules/greeting.js';

const backToGreeting = (element) => {
  const backBtn = element.querySelector(`.back`);

  backBtn.addEventListener(`click`, () => {
    showScreen(greetingElement);
  });
};

export default backToGreeting;
