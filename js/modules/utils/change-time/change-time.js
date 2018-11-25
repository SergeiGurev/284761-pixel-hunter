const changeTime = (game, time) => {
  if (typeof time !== `number`) {
    throw new Error(`Значение времени должно быть числом`);
  }

  if (time < 0) {
    throw new Error(`Значение времени не может быть отрицательным`);
  }

  return Object.assign({}, game, {
    time
  });
};

export default changeTime;
