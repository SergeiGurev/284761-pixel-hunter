import {assert} from 'chai';
import changeLives from './change-lives.js';

const GAME = {
  lives: 3
};

describe(`getLives`, () => {
  it(`Должен вернуть новый обьект с обновленным значением кол-ва жизней`, () => {
    assert.equal(changeLives(GAME, 1).lives, 1);
    assert.equal(changeLives(GAME, 2).lives, 2);
  });

  it(`Кол-во жизней не может быть отрицательным`, () => {
    assert.throws(() => changeLives(GAME, -1).lives, /Кол-во жизней не может быть отрицательным/);
    assert.throws(() => changeLives(GAME, -10).lives, /Кол-во жизней не может быть отрицательным/);
  });

  it(`Кол-во жизней должно быть числом`, () => {
    assert.throws(() => changeLives(GAME, {}).lives, /Кол-во жизней должно быть числом/);
    assert.throws(() => changeLives(GAME, `fdfdfdf`).lives, /Кол-во жизней должно быть числом/);
    assert.throws(() => changeLives(GAME, undefined).lives, /Кол-во жизней должно быть числом/);
    assert.throws(() => changeLives(GAME, null).lives, /Кол-во жизней должно быть числом/);
  });
});
