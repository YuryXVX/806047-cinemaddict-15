import { classListRemove, deepClone } from '../utils/helpers';
import { removeElement, render, RenderPosition, replace } from '../utils/render';
import FilmDetails from '../views/film-details';
import { RootPresenter } from './root-presenter';

export default class FilmDetailsPresenter extends RootPresenter {
  constructor(store, onDataChange) {
    super(store);
    this._filmDetailsView = null;

    this._id = null;

    this._data = null;
    this._newData = null;

    this._onDataChange = onDataChange;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
    this._onClosePopup = this._onClosePopup.bind(this);
  }


  get modalId () {
    return this._id;
  }

  _onClosePopup() {
    this._removePopup();
  }

  _removePopup() {
    document.removeEventListener('keyup', this._onEscKeyDown);
    classListRemove(document.body, 'hide-overflow');

    if(this._filmDetailsView) {
      removeElement(this._filmDetailsView);
      this._filmDetailsView = null;
    }
  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === 'Escape' || evt.key === 'Esc';

    if(isEscKey) {
      this._removePopup();
    }
  }

  destroy() {
    this._removePopup();
  }

  render(data) {
    this._data = data;
    this._id = data.id;


    const oldFilmDetailsComponent = this._filmDetailsView;
    this._filmDetailsView = new FilmDetails(data, this._onClosePopup);

    document.addEventListener('keyup', this._onEscKeyDown);

    this._filmDetailsView.setWatchButtonClickHandler(() => {
      const newData = deepClone(this._data);

      newData.details.watchlist = !newData.details.watchlist;
      this._onDataChange(this, data, newData);
    });

    this._filmDetailsView.setAlreadyWatchedButtonClickHandler(() => {
      const newData = deepClone(this._data);

      newData.details.history = !newData.details.history;
      this._onDataChange(this, data, newData);
    });

    this._filmDetailsView.setFavoriteButtonClickHandler(() => {
      const newData = deepClone(this._data);

      newData.details.favorite = !newData.details.favorite;
      this._onDataChange(this, data, newData);
    });

    this._filmDetailsView.setCloseButtonClickHandler();


    if(!oldFilmDetailsComponent) {
      return render(document.body, this._filmDetailsView.getElement(), RenderPosition.BEFOREEND);
    }

    if(this._filmDetailsView) {
      replace(oldFilmDetailsComponent, this._filmDetailsView);
    }
  }
}
