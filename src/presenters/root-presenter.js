import { toast } from '../utils/toast';

export default class RootPresenter {
  constructor(store, api) {
    this._model = store;
    this._api = api;
    this._rerender = this.rerender.bind(this);
    this._filtered = this.filtered.bind(this);
  }

  filtered() {}

  rerender() {}

  renderToast(message) {
    toast(message);
  }

  render() {
    this._model.addDataChangeListener(this._rerender);
    this._model.addFiltersChangeListener(this._filtered);
  }

  destroy() {
    this._model.removeDataChangeListener(this._rerender);
    this._model.removeFiltersChangeListener(this._filtered);
  }
}
