import Api from '../api/api';

const api = new Api();

export default class RootPresenter {
  constructor(store) {
    this._model = store;
    this._api = api;
    this._rerender = this.rerender.bind(this);

    setTimeout(() => this.beforeRender(), 0);
  }

  beforeRender() {}

  rerender() {}

  render() {
    this._model.addDataChangeListener(this._rerender);
  }

  destroy() {
    this._model.removeDataChangeListener(this._rerender);
  }
}
