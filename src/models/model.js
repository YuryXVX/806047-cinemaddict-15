export default class Model {
  constructor() {
    this._filmDataChangeSubscribers = new Set();
    this._commentsSubscribers = new Set();
    this._filtersSubscribers = new Set();
  }

  addDataChangeListener(listener) {
    this._filmDataChangeSubscribers.add(listener);
  }

  removeDataChangeListener(listener) {
    this._filmDataChangeSubscribers.delete(listener);
  }

  addFiltersChangeListener(listener) {
    this._filtersSubscribers.add(listener);
  }

  removeFiltersChangeListener(listener) {
    this._filtersSubscribers.delete(listener);
  }

  addCommentsChangeListener(listener) {
    this._commentsSubscribers.add(listener);
  }

  removeCommentsChangeListener(listener) {
    this._commentsSubscribers.delete(listener);
  }

  _notifyMoviesObservers() {
    this._filmDataChangeSubscribers.forEach((dep) => dep(this));
  }

  _notifyCommentObservers() {
    this._commentsSubscribers.forEach((dep) => dep(this));
  }

  _notifyFilterObservers() {
    this._filtersSubscribers.forEach((dep) => dep(this));
  }
}
