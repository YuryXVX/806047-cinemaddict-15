import { FilterType, SortType } from '../const';
import { getFilmsByFilter, getUserRaiting } from '../mock';

const getSortFilms = (films ,sortType = SortType.DEFAULT) => {
  switch(sortType) {
    case SortType.RATING:
      return films.slice().sort((a, b) => a.info.totalRating > b.info.totalRating ? -1 : 0);

    case SortType.DATE:
      return films.slice();

    default:
      return films.slice();
  }
};

export default class FilmsStore {
  constructor(films) {
    this._store = films;

    this._activeSortButon = SortType.DEFAULT;

    this._listeners = [];
  }

  get activeSortButton() {
    return this._activeSortButon;
  }

  set activeSortButton(value) {
    this._activeSortButon = value;

    this._callListeners(this._listeners);
  }

  updateFilm(oldData, newData) {
    const index = this._store.films.findIndex((film) => film.id === oldData.id);
    this._store.films = [].concat(this._store.films.slice(0, index), newData, this._store.films.slice(index + 1));

    this._callListeners(this._listeners);
    return new Promise((resolve) => resolve(newData));
  }

  get films() {
    return getSortFilms(this._store.films, this.activeSortButton);
  }

  get userRating() {
    return this._store.userRating;
  }

  set userRating(value) {
    this._store.userRating = getUserRaiting(getFilmsByFilter(value, FilterType.HISTORY).length);

    this._callListeners(this._listeners);
  }

  get filters() {
    return this._store.filters;
  }

  set filters(value) {
    this._store.filters = value;
  }

  get topRated() {
    return this._store.topRated;
  }

  get commentsList() {
    return this._store.commentsList;
  }

  get mostCommented() {
    return this._store.mostCommented;
  }

  set films(value) {
    this._store = value;
  }

  _callListeners(listeners) {
    listeners.forEach((listner) => listner(this));
  }

  updateFilters() {
    const filters = Object.keys(FilterType).map((filter) => ({
      name: FilterType[filter],
      count: getFilmsByFilter(this.films, filter).length,
      active: FilterType[filter] === FilterType.ALL,
    }));

    return filters;
  }

  addDataChangeListener(listener) {
    this._listeners.push(listener);
  }
}

