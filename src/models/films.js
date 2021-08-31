import { FilterType, SortType } from '../const';
import { getSortFilms, getFilmsByFilter } from '../utils/filters';
import Model from './model';

const filters = [
  {name: 'All Films', count: 0},
  {name: 'Watchlist', count: 0},
  {name: 'Favorites', count: 0},
  {name: 'History', count: 0},
];

const INITIAL_STATE = {
  commentsList:[],
  films: [],
  filters,
  mostCommented: [],
  topRated: [],
  userRating: '',
};

export default class FilmsStore extends Model {
  constructor(films = INITIAL_STATE) {
    super();
    this._state = films;

    this._activeSortButon = SortType.DEFAULT;

    this._acitveFilter = 'ALL';
  }

  setState(movies) {
    this._state.films = movies;
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
    this._notifyMoviesObservers(this._listeners);
  }

  updateFilm(oldData, newData) {
    const index = this._getFilmIndexById(oldData.id);

    if(index === -1) {
      return;
    }

    this._state.films = [].concat(this._state.films.slice(0, index), newData, this._state.films.slice(index + 1));

    return new Promise((resolve) => resolve(newData));
  }

  get userRating() { return this._state.userRating; }

  set userRating(newValue) { this._state.userRating = newValue; }

  get filters() { return this._state.filters; }

  set filters(value) {
    this._state.filters = value;
    this._notifyMoviesObservers();
  }

  get activeFilter() { return this._acitveFilter; }

  set activeFilter(value) {
    this._acitveFilter = value;
    this._notifyMoviesObservers();
  }

  get topRated() { return this._state.topRated; }

  get commentsList() { return this._state.commentsList; }

  set commentsList(comments) { this._state.commentsList = comments; }

  get mostCommented() { return this._state.mostCommented; }

  _getFilmIndexById(filmId) {
    return this._state.films.findIndex((film) => film.id === filmId);
  }

  updateFilters() {
    return Object.keys(FilterType).map((filter) => ({
      name: FilterType[filter],
      count: filter === this._acitveFilter
        ? getFilmsByFilter(this._state.films, this._acitveFilter).length
        : getFilmsByFilter(this._state.films, filter).length,
    }));
  }

  _updateFilmList(index, newItem) {
    this._state.films = [].concat(this._state.films.slice(0, index), newItem, this._state.films.slice(index + 1));
  }

  deleteComment(filmId, commentId) {
    const { films } = this._state;
    const index = this._getFilmIndexById(filmId);
    const commentIndex = films[index].comments.findIndex((comment) => comment === commentId);

    films[index].comments.splice(commentIndex, 1);

    this._updateFilmList(index, films[index]);

    this._notifyCommentObservers();
    this._notifyMoviesObservers();
  }

  createComment(filmId, comments) {
    const { films } = this._state;
    const index = this._getFilmIndexById(filmId);

    films[index].comments = comments.map((comment) => comment.id);
    this._state.commentsList = comments;

    this._updateFilmList(index, films[index]);

    this._notifyCommentObservers();
    this._notifyMoviesObservers();
  }
}
