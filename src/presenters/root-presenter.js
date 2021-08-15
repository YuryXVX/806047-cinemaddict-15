export class RootPresenter {
  constructor(store) {
    this._store = store;

    this._store.addDataChangeListener((data) => {
      this._rerender(data);
    });

    setTimeout(() => this._prepare());
  }

  _prepare() {}

  _rerender() {}

  render() {}

  init() {}

  destroy() {}
}
