import showScreen from '../utils/show-screen.js';
import Application from '../application.js';
import RulesView from '../view/rules-view.js';

class RulesScreen {
  constructor() {
    this.content = new RulesView();
  }

  updateScreen() {
    showScreen(this.content.element);

    this.content.onSubmit = () => {
      Application.showGame();
    };

    this.content.onBackClick = () => {
      Application.showGreeting();
    };
  }
}

export default RulesScreen;
