'use strict';

const KEY_CODE_LEFT = 37;
const KEY_CODE_RIGHT = 39;
const templates = document.querySelectorAll(`template`);
const main = document.querySelector(`#main`);

// функциия пересоздающая шаблон, для того чтобы избежать баг с svg
const wrap = (it) => {
  const shadow = document.createElement(`div`);
  const content = it.content.cloneNode(true);
  shadow.appendChild(content);
  return shadow.cloneNode(true);
};

const showScreen = (number) => {
  const screenContent = wrap(templates[number]);
  main.innerHTML = ``;
  main.appendChild(screenContent);
};

let currentScreen = 1;

showScreen(currentScreen);

// Навигация по экранам
// Функции-переключатели
const switchPrevScreen = () => {
  currentScreen = currentScreen !== 0 ? --currentScreen : (templates.length - 1);
  showScreen(currentScreen);
};

const switchNextScreen = () => {
  currentScreen = currentScreen !== (templates.length - 1) ? ++currentScreen : 0;
  showScreen(currentScreen);
};

// Добавляем блок с кнопками
const navigationBlock = document.createElement(`div`);

navigationBlock.innerHTML = (`
  <div class="arrows__wrap">
    <style>
      .arrows__wrap {
        position: absolute;
        top: 95px;
        left: 50%;
        margin-left: -56px;
      }
      .arrows__btn {
        background: none;
        border: 2px solid black;
        padding: 5px 20px;
      }
    </style>
    <button class="arrows__btn arrows__btn--prev"><-</button>
    <button class="arrows__btn arrows__btn--next">-></button>
  </div>
`);

document.body.appendChild(navigationBlock);

const navButtonPrev = document.querySelector(`.arrows__btn--prev`);
const navButtonNext = document.querySelector(`.arrows__btn--next`);

// Обработчики

document.addEventListener(`keyup`, (e) => {
  if (e.keyCode === KEY_CODE_LEFT) {
    switchPrevScreen();
  }

  if (e.keyCode === KEY_CODE_RIGHT) {
    switchNextScreen();
  }
});

navButtonPrev.addEventListener(`click`, () => {
  switchPrevScreen();
});

navButtonNext.addEventListener(`click`, () => {
  switchNextScreen();
});
