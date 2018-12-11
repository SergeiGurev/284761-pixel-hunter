import showScreen from '../utils/show-screen.js';
import ErrorView from '../view/error-view.js';

class ErrorScreen {
  constructor(error) {
    this.error = error;
    this.content = new ErrorView(error);
  }

  updateScreen() {
    showScreen(this.content.element);
  }
}

export default ErrorScreen;
