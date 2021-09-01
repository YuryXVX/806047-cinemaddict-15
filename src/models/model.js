export default class Model {
  constructor() {
    this._moviesSubscribers = new Set();
    this._commentsSubscribers = new Set();
    this._filtersSubscribers = new Set();
  }

  addDataChangeListener(listener) {
    this._moviesSubscribers.add(listener);
  }

  removeDataChangeListener(listener) {
    this._moviesSubscribers.delete(listener);
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
    this._moviesSubscribers.forEach((dep) => dep(this));
  }

  _notifyCommentObservers() {
    this._commentsSubscribers.forEach((dep) => dep(this));
  }

  _notifyFilterObservers() {
    this._filtersSubscribers.forEach((dep) => dep(this));
  }
}
