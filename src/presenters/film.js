import { classListAdd, deepClone } from '../utils/helpers';
import { removeElement, render, RenderPosition, replace } from '../utils/render';

// views
import FilmCard from '../views/film-card';

export default class FilmPresenter {
  constructor(container, data, onDataChange, handlePopupRender) {
    this._data = data;
    this._container = container;

    this._onDataChange = onDataChange;
    this._handlePopupRender = handlePopupRender;

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

  _initListeners() {
    this._filmCardView.setPosterClickHandler(() => this._handleOpenDetailsPopup(this._data));
    this._filmCardView.setTitleClickHandler(() => this._handleOpenDetailsPopup(this._data));
    this._filmCardView.setCommentsLinkClickHandler(() => this._handleOpenDetailsPopup(this._data));

    this._filmCardView.setWatchButtonClickHandler(() => {
      const newData = deepClone(this._data);
      newData.details.watchlist = !newData.details.watchlist;

      this._onDataChange(this, this._data, newData);
    });

    this._filmCardView.setAlreadyWatchedButtonClickHandler(() => {
      const newData = deepClone(this._data);
      newData.details.history = !newData.details.history;

      this._onDataChange(this, this._data, newData);
    });

    this._filmCardView.setFavoriteButtonClickHandler(() => {
      const newData = deepClone(this._data);
      newData.details.favorite = !newData.details.favorite;

      this._onDataChange(this, this._data, newData);
    });
  }

  destroy() {
    removeElement(this._filmCardView);
  }
}

export const renderFilmCardViews = (container, films, onDataChange, onRenderPopup) => films.map((film) => {
  const filmController = new FilmPresenter(container, film, onDataChange, onRenderPopup);
  filmController.render(film);
  return filmController;
});
