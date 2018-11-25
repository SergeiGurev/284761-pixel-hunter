const renderGameStats = (answers = []) => {
  // correct, wrong, slow, fast
  const stats = answers.map((answer) => {
    if (answer.isTrue && answer.time < 10) {
      return `fast`;
    }
    if (answer.isTrue && answer.time > 20) {
      return `slow`;
    }
    if (answer.isTrue) {
      return `correct`;
    }
    return `wrong`;
  });
  while (stats.length !== 10) {
    stats.push(`unknown`);
  }
  return `<ul class="stats">
    ${stats.map((stat) => `<li class="stats__result stats__result--${stat}"></li>`).join(``)}
  </ul>`;
};

export default renderGameStats;
