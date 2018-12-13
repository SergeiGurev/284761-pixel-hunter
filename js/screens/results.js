import showScreen from '../utils/show-screen.js';
import Application from '../application.js';
import ResultsView from '../view/results-view.js';

class ResultsScreen {
  constructor(gameData, resultsData) {
    this.gameData = gameData;
    this.resultsData = resultsData;
    this.content = new ResultsView(this.resultsData);
  }

  updateScreen() {
    showScreen(this.content.element);

    this.content.onBackClick = () => {
      Application.showGreeting(this.gameData);
    };
  }
}

export default ResultsScreen;
