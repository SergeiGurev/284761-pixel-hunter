import IntroScreen from './screens/intro.js';
import RulesScreen from './screens/rules.js';
import GreetingScreen from './screens/greeting.js';
import GameScreen from './screens/game.js';
import GameModel from './models/game-model.js';

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
    window.fetch(`https://es.dump.academy/pixel-hunter/questions`)
      .then((response) => response.json())
      .then((data) => {
        this.data = data;
        return [].concat(...data.map(({answers}) => answers.map(({image}) => loadImage(image.url))));
      })
      .then((images) => Promise.all(images))
      .then((images) => {
        this.image = images;
        intro.stopPreloader();
        return this.data;
      })
      .then((data) => Application.showGreeting(data))
      .catch();
  }

  static showGreeting(data) {
    const greeting = new GreetingScreen(data);
    greeting.updateScreen();
  }

  static showRules(data) {
    const rules = new RulesScreen(data);
    rules.updateScreen();
  }

  static showGame(data, userName = ``) {
    const model = new GameModel(data, userName);
    const gameScreen = new GameScreen(model);
    gameScreen.updateScreen();
  }

}
