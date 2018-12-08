import IntroScreen from './screens/intro.js';
import RulesScreen from './screens/rules.js';
import GreetingScreen from './screens/greeting.js';
import GameScreen from './screens/game.js';
import GameModel from './models/game-model.js';

const onLoad = (item) => {
  console.log(item);
};

const onError = (error) => {
  console.log(error);
};

const loadImage = (url) => {
  return new Promise(() => {
    const image = new Image();
    image.onload = () => onLoad(image);
    image.onerror = () => onError(`Не удалось загрузить картнку: ${url}`);
    image.src = url;
  });
};

export default class Application {

  static showIntro() {
    const intro = new IntroScreen();
    intro.updateScreen();
    window.fetch(`https://es.dump.academy/pixel-hunter/questions`)
      .then((response) => response.json())
      .then((data) => {
        let images = [];
        data.forEach((item) => {
          item.answers.forEach((answer) => {
            images.push(loadImage(answer.image.url));
          });
        });

        return data;
      })
      // .then((images) => Promise.all(images))
      .then((data) => Application.showGreeting(data))
      .catch(onError);
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
