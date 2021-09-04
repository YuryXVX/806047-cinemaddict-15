import { SortType, FilterForInitialStateApp } from '../const';
import { getSortFilms, getFilmsByFilter } from '../utils/filters';
import Model from './model';

const INITIAL_STATE = {
  commentsList:[],
  films: [],
  filters: FilterForInitialStateApp,
  userRating: '',
};

export default class FilmsStore extends Model {
  constructor(state = INITIAL_STATE) {
    super();
    this._state = state;
    this._activeSortButon = SortType.DEFAULT;
    this._acitveFilter = 'ALL';
  }

  setState(films) {
    this._state.films = films;
  }

  get films() {
    return getSortFilms(getFilmsByFilter(this._state.films.slice(), this._acitveFilter), this._activeSortButon);
  }

  set films(newFilms) {
    this._state.films = Array.from(newFilms);
  }

  get initalFilmsList() {
    return this._state.films.slice();
  }

  get activeSortButton() {
    return this._activeSortButon;
  }

  set activeSortButton(activeSortType) {
    this._activeSortButon = activeSortType;
    this._notifyFilterObservers();
  }

  get userRating() { return this._state.userRating; }

  set userRating(newUserRaiting) { this._state.userRating = newUserRaiting; }

  get filters() { return this._state.filters; }

  set filters(filterType) {
    this._state.filters = filterType;
    this._notifyFilterObservers();
  }

  get activeFilter() { return this._acitveFilter; }

  set activeFilter(activeFilter) {
    this._acitveFilter = activeFilter;
    this._notifyFilterObservers();
  }

  get commentsList() { return this._state.commentsList; }

  set commentsList(comments) { this._state.commentsList = comments; }

  _getFilmIndexById(filmId) {
    return this._state.films.findIndex((film) => film.id === filmId);
  }

  _updateFilmList(index, newItem) {
    this._state.films = [].concat(this._state.films.slice(0, index), newItem, this._state.films.slice(index + 1));
  }

  updateFilm(oldData, newData) {
    const index = this._getFilmIndexById(oldData.id);

    if(index === -1) {
      return;
    }

    this._updateFilmList(index, newData);
    this._notifyMoviesObservers();
  }

  deleteComment(filmId, commentId) {
    const { films } = this._state;
    const index = this._getFilmIndexById(filmId);

    films[index].comments = this.films[index].comments.filter((comment) => comment !== commentId);

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
