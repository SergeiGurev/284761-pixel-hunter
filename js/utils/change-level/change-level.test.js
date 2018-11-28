import {assert} from 'chai';
import changeLevel from './change-level.js';

const GAME = {
  level: 0
};

describe(`getLevel`, () => {
  it(`Должен вернуть новый обьект с обновленным значением уровня`, () => {
    assert.equal(changeLevel(GAME, 1).level, 1);
    assert.equal(changeLevel(GAME, 3).level, 3);
    assert.equal(changeLevel(GAME, 4).level, 4);
    assert.equal(changeLevel(GAME, 7).level, 7);
  });

  it(`Номер уровня не может быть отрицательным`, () => {
    assert.throws(() => changeLevel(GAME, -1).level, /Номер уровня не может быть отрицательным/);
    assert.throws(() => changeLevel(GAME, -10).level, /Номер уровня не может быть отрицательным/);
  });

  it(`Номер уровня должен быть числом`, () => {
    assert.throws(() => changeLevel(GAME, {}).level, /Номер уровня должен быть числом/);
    assert.throws(() => changeLevel(GAME, `fdfdfdf`).level, /Номер уровня должен быть числом/);
    assert.throws(() => changeLevel(GAME, undefined).level, /Номер уровня должен быть числом/);
    assert.throws(() => changeLevel(GAME, null).level, /Номер уровня должен быть числом/);
  });
});
