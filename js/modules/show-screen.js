const showScreen = (node) => {
  const main = document.querySelector(`#main`);
  main.innerHTML = ``;
  main.appendChild(node);
};

export default showScreen;
