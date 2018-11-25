import {assert} from 'chai';
import changeTime from './change-time.js';

const GAME = {
  time: 3000
};

describe(`getTime`, () => {
  it(`Должен вернуть новый обьект с обновленным значением времени`, () => {
    assert.equal(changeTime(GAME, 1000).time, 1000);
    assert.equal(changeTime(GAME, 2000).time, 2000);
  });

  it(`Значение времени не может быть отрицательным`, () => {
    assert.throws(() => changeTime(GAME, -10000).level, /Значение времени не может быть отрицательным/);
    assert.throws(() => changeTime(GAME, -5000).level, /Значение времени не может быть отрицательным/);
  });

  it(`Значение времени должно быть числом`, () => {
    assert.throws(() => changeTime(GAME, {}).level, /Значение времени должно быть числом/);
    assert.throws(() => changeTime(GAME, `fdfdfdf`).level, /Значение времени должно быть числом/);
    assert.throws(() => changeTime(GAME, undefined).level, /Значение времени должно быть числом/);
    assert.throws(() => changeTime(GAME, null).level, /Значение времени должно быть числом/);
  });
});
