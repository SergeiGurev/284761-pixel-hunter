const changeLives = (game, lives) => {
  if (typeof lives !== `number`) {
    throw new Error(`Кол-во жизней должно быть числом`);
  }

  if (lives < 0) {
    throw new Error(`Кол-во жизней не может быть отрицательным`);
  }

  return Object.assign({}, game, {
    lives
  });
};

export default changeLives;
