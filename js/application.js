import IntroScreen from './screens/intro.js';
import RulesScreen from './screens/rules.js';
import GreetingScreen from './screens/greeting.js';
import GameScreen from './screens/game.js';
import GameModel from './models/game-model.js';

export default class Application {

  static showIntro() {
    const intro = new IntroScreen();
    intro.updateScreen();
  }

  static showGreeting() {
    const greeting = new GreetingScreen();
    greeting.updateScreen();
  }

  static showRules() {
    const rules = new RulesScreen();
    rules.updateScreen();
  }

  static showGame(userName = ``) {
    const model = new GameModel(userName);
    const gameScreen = new GameScreen(model);
    gameScreen.startGame();
  }

}
