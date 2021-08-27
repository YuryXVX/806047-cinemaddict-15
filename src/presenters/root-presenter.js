export class RootPresenter {
  constructor(store) {
    this._model = store;

    this._rerender = this.rerender.bind(this);
    this._model.addDataChangeListener(this._rerender);
  }

  rerender() {}
}
