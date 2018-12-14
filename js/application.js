import IntroScreen from './screens/intro.js';
import ErrorModal from './screens/error.js';
import RulesScreen from './screens/rules.js';
import GreetingScreen from './screens/greeting.js';
import GameScreen from './screens/game.js';
import GameModel from './models/game-model.js';
import ResultsScreen from './screens/results.js';
import Loader from './loader.js';

const loadImage = (url) => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(`Не удалось загрузить картнку: ${url}`);
    image.src = url;
  });
};

export default class Application {

  static start() {
    Application.load().catch((error) => Application.showError(error));
  }

  static async load() {
    const intro = new IntroScreen();
    intro.updateScreen();
    intro.startPreloader();

    try {
      const gameData = await Loader.loadData();
      this.images = await Promise.all([].concat(...gameData.map(({answers}) => answers.map(({image}) => loadImage(image.url)))));
      Application.showGreeting(gameData);
    } finally {
      intro.stopPreloader();
    }
  }

  static showGreeting(data) {
    const greeting = new GreetingScreen(data);
    greeting.updateScreen();
  }

  static showRules(data) {
    const rules = new RulesScreen(data);
    rules.updateScreen();
  }

  static showGame(data, playerName = ``) {
    const model = new GameModel(data, playerName);
    const game = new GameScreen(model);
    game.updateScreen();
  }

  static async showResults(model) {
    const name = model.playerName;

    try {
      await Loader.saveResults(model.state, name);
      const data = await Loader.loadResults(name);
      const results = new ResultsScreen(model.data, data);
      results.updateScreen();
    } catch (error) {
      Application.showError(error);
    }
  }

  static showError(error) {
    const errorScreen = new ErrorModal(error);
    errorScreen.updateScreen();
  }

}
