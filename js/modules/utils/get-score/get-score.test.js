import {assert} from 'chai';
import getScore from './get-score.js';

const answers = [];
for (let i = 0; i < 10; i++) {
  answers.push({
    isTrue: true,
    time: 15000
  });
}

describe(`getScore`, () => {
  it(`Должен вернуть количество очков`, () => {
    assert.equal(getScore(answers, 3), 1150); // все ответы правильные, 3 жизни
    assert.equal(getScore(answers, 1), 1050); // все ответы правильные, 1 жизнь

    answers[0].isTrue = false;
    assert.equal(getScore(answers, 2), 1000); // 1 неправильный ответ, 2 жизни
    answers[1].isTrue = false;
    assert.equal(getScore(answers, 1), 850); // 2 неправильных ответа, 1 жизнь

    answers[2].time = 5000;
    assert.equal(getScore(answers, 2), 950); // 2 неправильных ответа и 1 быстрый, 2 жизни

    answers[3].time = 25000;
    assert.equal(getScore(answers, 2), 900); // 2 неправильных ответа и 1 медленный, 2 жизни
  });

  it(`Должен вернуть -1 при недостаточном количестве ответов`, () => {
    const fewAnswers = answers.slice(0, -1);
    assert.equal(getScore(fewAnswers, 3), -1);
  });
});
