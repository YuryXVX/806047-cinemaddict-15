export class RootPresenter {
  constructor(store) {
    this._model = store;

    this._model.addDataChangeListener((data) => {
      this._rerender(data);
    });
  }

  _rerender() {}
}
