import showScreen from '../utils/show-screen.js';
import Application from '../application.js';
import IntroView from '../view/intro-view.js';

class IntroScreen {
  constructor() {
    this.content = new IntroView();
  }

  updateScreen() {
    showScreen(this.content.element);

    this.content.onBtnClick = () => {
      Application.showGreeting();
    };
  }
}

export default IntroScreen;
