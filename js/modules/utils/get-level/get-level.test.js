import {assert} from 'chai';
import getLevel from './get-level.js';

const GAME = {
  level: 0
};

describe(`getLevel`, () => {
  it(`Должен вернуть новый обьект с обновленным значением уровня`, () => {
    assert.equal(getLevel(GAME, 1).level, 1);
    assert.equal(getLevel(GAME, 3).level, 3);
    assert.equal(getLevel(GAME, 4).level, 4);
    assert.equal(getLevel(GAME, 7).level, 7);
  });

  it(`Номер уровня не может быть отрицательным`, () => {
    assert.throws(() => getLevel(GAME, -1).level, /Номер уровня не может быть отрицательным/);
    assert.throws(() => getLevel(GAME, -10).level, /Номер уровня не может быть отрицательным/);
  });

  it(`Номер уровня должен быть числом`, () => {
    assert.throws(() => getLevel(GAME, {}).level, /Номер уровня должен быть числом/);
    assert.throws(() => getLevel(GAME, `fdfdfdf`).level, /Номер уровня должен быть числом/);
    assert.throws(() => getLevel(GAME, undefined).level, /Номер уровня должен быть числом/);
    assert.throws(() => getLevel(GAME, null).level, /Номер уровня должен быть числом/);
  });
});
