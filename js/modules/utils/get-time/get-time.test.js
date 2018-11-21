import {assert} from 'chai';
import getTime from './get-time.js';

const GAME = {
  time: 3000
};

describe(`getTime`, () => {
  it(`Должен вернуть новый обьект с обновленным значением времени`, () => {
    assert.equal(getTime(GAME, 1000).time, 1000);
    assert.equal(getTime(GAME, 2000).time, 2000);
  });

  it(`Значение времени не может быть отрицательным`, () => {
    assert.throws(() => getTime(GAME, -10000).level, /Значение времени не может быть отрицательным/);
    assert.throws(() => getTime(GAME, -5000).level, /Значение времени не может быть отрицательным/);
  });

  it(`Значение времени должно быть числом`, () => {
    assert.throws(() => getTime(GAME, {}).level, /Значение времени должно быть числом/);
    assert.throws(() => getTime(GAME, `fdfdfdf`).level, /Значение времени должно быть числом/);
    assert.throws(() => getTime(GAME, undefined).level, /Значение времени должно быть числом/);
    assert.throws(() => getTime(GAME, null).level, /Значение времени должно быть числом/);
  });
});
