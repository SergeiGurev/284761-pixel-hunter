import ErrorView from '../view/error-view.js';

class ErrorModal {
  constructor(error) {
    this.error = error;
    this.content = new ErrorView(this.error);
  }

  updateScreen() {
    const body = document.querySelector(`body`);
    body.appendChild(this.content.element);
  }
}

export default ErrorModal;
