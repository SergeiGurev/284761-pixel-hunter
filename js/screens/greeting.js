import showScreen from '../utils/show-screen.js';
import Application from '../application.js';
import GreetingView from '../view/greeting-view.js';

class GreetingScreen {
  constructor() {
    this.content = new GreetingView();
  }

  updateScreen() {
    showScreen(this.content.element);

    this.content.onBtnClick = () => {
      Application.showRules();
    };
  }
}

export default GreetingScreen;
