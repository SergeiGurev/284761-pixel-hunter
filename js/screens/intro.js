import showScreen from '../utils/show-screen.js';
import IntroView from '../view/intro-view.js';

class IntroScreen {
  constructor() {
    this.content = new IntroView();
  }

  updateScreen() {
    showScreen(this.content.element);
  }

  startPreloader() {
    this.content.preloader(true);
  }

  stopPreloader() {
    this.content.preloader(false);
  }
}

export default IntroScreen;
