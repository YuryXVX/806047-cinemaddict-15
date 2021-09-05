import { classListAdd, deepClone } from '../utils/helpers';
import { removeElement, render, RenderPosition, replace } from '../utils/render';

// views
import FilmCard from '../views/film-card';

export default class FilmPresenter {
  constructor(container, data, handleDataChange, handlePopupRender) {
    this._data = data;
    this._container = container;

    this._handleDataChange = handleDataChange;
    this._handlePopupRender = handlePopupRender;

    this._handleOpenDetailsPopup = this._handleOpenDetailsPopup.bind(this);
    this._handleSetWatchFilms = this._handleSetWatchFilms.bind(this);
    this._handleSetHistoryFilms = this._handleSetHistoryFilms.bind(this);
    this._handleSetFavoriteFilms = this._handleSetFavoriteFilms.bind(this);

    this._filmCardView = null;
  }

  _handleOpenDetailsPopup() {
    this._handlePopupRender(this._data);
    classListAdd(document.body, 'hide-overflow');
  }

  render(film) {
    this._data = film;

    const oldFilmComponent = this._filmCardView;
    this._filmCardView = new FilmCard(film);

    this._initListeners();

    if(oldFilmComponent === null) {
      return render(this._container, this._filmCardView.getElement(), RenderPosition.BEFOREEND);
    }

    if(this._filmCardView) {
      replace(oldFilmComponent, this._filmCardView);
    }

    removeElement(oldFilmComponent);
  }

  shake() {
    this._filmCardView.errorState = true;
  }

  _handleSetWatchFilms() {
    const newData = deepClone(this._data);
    newData.filmDetails.watchlist = !newData.filmDetails.watchlist;

    this._handleDataChange(this, this._data, newData);
  }

  _handleSetHistoryFilms() {
    const newData = deepClone(this._data);
    newData.filmDetails.history = !newData.filmDetails.history;

    this._handleDataChange(this, this._data, newData);
  }

  _handleSetFavoriteFilms() {
    const newData = deepClone(this._data);
    newData.filmDetails.favorite = !newData.filmDetails.favorite;

    this._handleDataChange(this, this._data, newData);
  }

  _initListeners() {
    this._filmCardView.handleSetWatchFilms = this._handleSetWatchFilms;
    this._filmCardView.handleSetHistoryFilms = this._handleSetHistoryFilms;
    this._filmCardView.handleSetFavoriteFilms = this._handleSetFavoriteFilms;
    this._filmCardView.handleOpenPopup = this._handleOpenDetailsPopup;
  }

  destroy() {
    removeElement(this._filmCardView);
  }
}

export const getFilmPresenters = (container, films, handleDataChange, onRenderPopup) => films.map((film) => {
  const filmPresenter = new FilmPresenter(container, film, handleDataChange, onRenderPopup);
  filmPresenter.render(film);
  return filmPresenter;
});
