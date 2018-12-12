import IntroScreen from './screens/intro.js';
import ErrorScreen from './screens/error.js';
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

  static showIntro() {
    const intro = new IntroScreen();
    intro.updateScreen();
    intro.startPreloader();
    Loader.loadData()
      .then((data) => {
        this.data = data;
        return [].concat(...data.map(({answers}) => answers.map(({image}) => loadImage(image.url))));
      })
      .then((images) => Promise.all(images))
      .then(() => Application.showGreeting(this.data))
      .catch((error) => Application.showError(error));
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

  static showResults(model) {
    const name = model.playerName;
    Loader.saveResults(model.state, name)
      .then(() => Loader.loadResults(name))
      .then((data) => {
        const results = new ResultsScreen(model.data, data);
        results.updateScreen();
      })
      .catch((error) => Application.showError(error));
  }

  static showError(error) {
    const errorScreen = new ErrorScreen(error);
    errorScreen.updateScreen();
  }

}
