
import { createElement } from '../utils/render';

export default class Component {
  constructor() {
    if(new.target === Component) {
      throw new Error('this is abstract class');
    }
    this._element = null;
  }

  getTemplate() {
    throw new Error('this method must be impuplement: getTemplate');
  }

  getElement() {
    if(!this._element) {
      this._element = createElement(this.getTemplate());
    }

    this._addListener();
    return this._element;
  }

  _addListener() {}

  _removeListener() {}

  removeElement() {
    this._removeListener();
    this._element.remove();
    this._element = null;
  }
}
