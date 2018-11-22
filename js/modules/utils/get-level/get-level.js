const getLevel = (game, level) => {
  if (typeof level !== `number`) {
    throw new Error(`Номер уровня должен быть числом`);
  }

  if (level < 0) {
    throw new Error(`Номер уровня не может быть отрицательным`);
  }

  return Object.assign({}, game, {
    level
  });
};

export default getLevel;
