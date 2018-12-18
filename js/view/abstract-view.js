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
    const element = document.createElement(`div`);
    element.innerHTML = this.template;
    return element;
  }

  bind() {}
}

export default AbstractView;
