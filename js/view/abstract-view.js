import getElementFromTemplate from '../utils/get-element-from-template.js';

class AbstractView {
  get template() {
    return ``;
  }

  get element() {
    if (this._element) {
      return this._element;
    }
    this._element = this.render();
    this.bind(this._element);
    return this._element;
  }

  render() {
    return getElementFromTemplate(this.template);
  }

  bind() {}
}

export default AbstractView;
