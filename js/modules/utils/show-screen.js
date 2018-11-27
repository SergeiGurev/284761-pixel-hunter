const main = document.querySelector(`#main`);
const showScreen = (node) => {
  main.innerHTML = ``;
  main.appendChild(node);
};

export default showScreen;
