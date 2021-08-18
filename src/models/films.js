import { FilterType, SortType } from '../const';
import { getFilmsByFilter, getUserRaiting } from '../mock';

const getSortFilms = (films ,sortType = SortType.DEFAULT) => {
  switch(sortType) {
    case SortType.RATING: {
      return films.slice().sort((a, b) => a.info.totalRating > b.info.totalRating ? -1 : 0);
    }

    case SortType.DATE: {
      return films.slice().sort((a, b) => new Date(a.filmDetails.watchingDate) - new Date(b.filmDetails.watchingDate));
    }

    default: {
      return films.slice();
    }
  }
};

export default class FilmsStore {
  constructor(films) {
    this._state = films;

    this._activeSortButon = SortType.DEFAULT;

    this._acitveFilter = 'ALL';

    this._listeners = new Set();

    this._listersFiltes = new Set();
  }

  get films() {
    return getSortFilms(
      getFilmsByFilter(this._state.films.slice(), this._acitveFilter),
      this._activeSortButon,
    );
  }

  set films(value) {
    this._state = Array.from(value);
  }

  get activeSortButton() {
    return this._activeSortButon;
  }

  set activeSortButton(value) {
    this._activeSortButon = value;
    this._callListeners(this._listeners);
  }

  updateFilm(oldData, newData) {
    const index = this._state.films.findIndex((film) => film.id === oldData.id);

    if(index === -1) {
      return;
    }

    this._callListeners(this._listersFiltes);

    this._state.films = [].concat(this._state.films.slice(0, index), newData, this._state.films.slice(index + 1));

    return new Promise((resolve) => resolve(newData));
  }

  get userRating() {
    return this._state.userRating;
  }

  updateRating(value) {
    this._state.userRating = getUserRaiting(getFilmsByFilter(value, FilterType.HISTORY).length);
  }

  get filters() { return this._state.filters; }

  set filters(value) {
    this._state.filters = value;
  }

  get activeFilter() { return this._acitveFilter; }

  set activeFilter(value) {
    this._acitveFilter = value;
    this._callListeners(this._listeners);
  }

  get topRated() {
    return this._state.topRated;
  }

  get commentsList() {
    return this._state.commentsList;
  }

  get mostCommented() {
    return this._state.mostCommented;
  }

  _callListeners(listeners) {
    listeners.forEach((listner) => listner(this));
  }

  updateFilters(films) {
    const filters = Object.keys(FilterType).map((filter) => ({
      name: FilterType[filter],
      count: getFilmsByFilter(films, filter).length,
      active: FilterType[filter] === this._acitveFilter,
    }));

    return filters;
  }

  addDataChangeListener(listener) {
    this._listeners.add(listener);
  }

  removeDataChangeListener(listener) {
    this._listeners.delete(listener);
  }

  addFilterChangeListener(listener) {
    this._listersFiltes.add(listener);
  }

  removeFilterChangeListener(listener) {
    this._listersFiltes.delete(listener);
  }
}

