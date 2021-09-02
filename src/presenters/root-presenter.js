import Api from '../api/api';
import { ApiConfig } from '../const';

const api = new Api(ApiConfig.TOKEN, ApiConfig.END_POINT);

export default class RootPresenter {
  constructor(store, containers) {
    this._model = store;
    this._api = api;
    this._rerender = this.rerender.bind(this);
    this._filtered = this.filtered.bind(this);

    setTimeout(() => this.beforeRender(), 0);

    this._containers = containers;
  }

  filtered() {}

  rerender() {}

  renderToast() {}

  beforeRender() {}


  render() {
    this._model.addDataChangeListener(this._rerender);
    this._model.addFiltersChangeListener(this._filtered);
  }

  destroy() {
    this._model.removeDataChangeListener(this._rerender);
    this._model.removeFiltersChangeListener(this._filtered);
  }
}
