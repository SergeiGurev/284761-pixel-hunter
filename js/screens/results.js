import showScreen from '../utils/show-screen.js';
import Application from '../application.js';
import ResultsView from '../view/results-view.js';

class ResultsScreen {
  constructor(model, data) {
    this.model = model;
    this.data = data;
    this.content = new ResultsView(this.data);
  }

  updateScreen() {
    showScreen(this.content.element);

    this.content.onBackClick = () => {
      Application.showGreeting(this.model.data);
    };
  }
}

export default ResultsScreen;
