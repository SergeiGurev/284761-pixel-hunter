import AbstractView from './abstract-view.js';
import {AnswerData} from '../data/game-data.js';

const AnswerShape = {
  CORRECT: `correct`,
  WRONG: `wrong`,
  SLOW: `slow`,
  FAST: `fast`,
  UNKNOWN: `unknown`
};

class GameStatsView extends AbstractView {
  constructor(answers = []) {
    super();
    this.answers = answers;
  }

  get template() {
    const stats = this.answers.map((answer) => {
      if (answer.isTrue && answer.time < AnswerData.FAST_TIME) {
        return AnswerShape.FAST;
      }
      if (answer.isTrue && answer.time > AnswerData.SLOW_TIME) {
        return AnswerShape.SLOW;
      }
      if (answer.isTrue) {
        return AnswerShape.CORRECT;
      }
      return AnswerShape.WRONG;
    });

    while (stats.length !== AnswerData.MAX_ANSWERS) {
      stats.push(AnswerShape.UNKNOWN);
    }

    return `<ul class="stats">
      ${stats.map((stat) => `<li class="stats__result stats__result--${stat}"></li>`).join(``)}
    </ul>`;
  }
}

export default GameStatsView;
