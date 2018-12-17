import showScreen from '../utils/show-screen.js';
import Application from '../application.js';
import GreetingView from '../view/greeting-view.js';

class GreetingScreen {
  constructor(data, fade) {
    this.data = data;
    this.content = new GreetingView(fade);
  }

  updateScreen() {
    showScreen(this.content.element);

    this.content.onBtnClick = () => {
      Application.showRules(this.data);
    };
  }
}

export default GreetingScreen;
