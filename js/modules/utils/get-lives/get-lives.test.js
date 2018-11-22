import {assert} from 'chai';
import getLives from './get-lives.js';

const GAME = {
  lives: 3
};

describe(`getLives`, () => {
  it(`Должен вернуть новый обьект с обновленным значением кол-ва жизней`, () => {
    assert.equal(getLives(GAME, 1).lives, 1);
    assert.equal(getLives(GAME, 2).lives, 2);
  });

  it(`Кол-во жизней не может быть отрицательным`, () => {
    assert.throws(() => getLives(GAME, -1).lives, /Кол-во жизней не может быть отрицательным/);
    assert.throws(() => getLives(GAME, -10).lives, /Кол-во жизней не может быть отрицательным/);
  });

  it(`Кол-во жизней должно быть числом`, () => {
    assert.throws(() => getLives(GAME, {}).lives, /Кол-во жизней должно быть числом/);
    assert.throws(() => getLives(GAME, `fdfdfdf`).lives, /Кол-во жизней должно быть числом/);
    assert.throws(() => getLives(GAME, undefined).lives, /Кол-во жизней должно быть числом/);
    assert.throws(() => getLives(GAME, null).lives, /Кол-во жизней должно быть числом/);
  });
});
