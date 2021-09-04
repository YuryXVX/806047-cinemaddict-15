
import { createElement } from '../utils/render';

export default class Component {
  constructor() {
    if(new.target === Component) {
      throw new Error('this is abstract class');
    }

    this._element = null;
  }

  get element() {
    if(!this._element) {
      this._createElement();
    }

    return this._element;
  }

  getTemplate() {
    throw new Error('this method must be implemented: getTemplate');
  }

  updateComponent() {
    if(this.element) {
      this._rerenderElement();
    }
  }

  getElement() {
    if(!this._element) {
      this._createElement();
    }

    this._addEventListeners();
    return this._element;
  }

  destroyElement() {
    this._removeEventListeners();
    this._element.remove();
    this._element = null;
  }

  _rerenderElement() {
    const oldElement = this._element;

    this._removeEventListeners();
    this._removeElement();

    oldElement.replaceWith(this.element);

    this._addEventListeners();
  }

  _createElement() {
    const template = this.getTemplate();
    this._element = createElement(template);
  }

  _removeElement() {
    this._element = null;
  }

  _addEventListeners() {}

  _removeEventListeners() {}
}
