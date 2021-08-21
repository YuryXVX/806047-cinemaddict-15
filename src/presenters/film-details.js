import { ModeView } from '../const';
import { classListRemove, deepClone } from '../utils/helpers';
import { removeElement, render, RenderPosition } from '../utils/render';

// presenter
import { RootPresenter } from './root-presenter';

// views
import FilmDetails from '../views/film-details';
import FilmDetailsControls from '../views/films-details-controls';
import FilmDetailsNewCommentView from '../views/film-details-new-comment';

export default class FilmDetailsPresenter extends RootPresenter {
  constructor(store, onDataChange) {
    super(store);
    this._filmDetailsView = null;
    this._filmDetailsControls = null;
    this._filmDetailsNewCommentView = null;

    this._id = null;

    this._data = null;
    this._newData = null;

    this._onDataChange = onDataChange;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
    this._onClosePopup = this._onClosePopup.bind(this);

    this._handleWatchListButton = this._handleWatchListButton.bind(this);
    this._handleHistoryListButton = this._hadleHistoryListButton.bind(this);
    this._handleFavoriteListButton = this._handleFavoriteListButton.bind(this);
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

  setData(newData) {
    this._data = newData;
    this._filmDetailsControls.data = newData;
  }

  _handleWatchListButton(data) {
    const newData = deepClone(this._data);
    newData.filmDetails.watchlist = !newData.filmDetails.watchlist;

    this._onDataChange(this, data, newData, ModeView.MODAL);
  }

  _handleFavoriteListButton(data) {
    const newData = deepClone(this._data);
    newData.filmDetails.favorite = !newData.filmDetails.favorite;

    this._onDataChange(this, data, newData, ModeView.MODAL);
  }

  _hadleHistoryListButton(data) {
    const newData = deepClone(this._data);
    newData.filmDetails.history = !newData.filmDetails.history;

    this._onDataChange(this, data, newData, ModeView.MODAL);
  }

  render(data) {
    this._data = data;
    this._id = data.id;

    const model = {
      ...data,
      comments: this._model.commentsList.filter((comment) => data.comments.includes(comment.id)),
    };

    this._filmDetailsView = new FilmDetails(model, this._onClosePopup);
    this._filmDetailsControls = new FilmDetailsControls(data);
    this._filmDetailsNewCommentView = new FilmDetailsNewCommentView();

    document.addEventListener('keyup', this._onEscKeyDown);

    render(this._filmDetailsView.filmListDetailsContainer, this._filmDetailsControls.getElement(), RenderPosition.BEFOREEND);
    render(this._filmDetailsView.filmsDetailsCommentWrap, this._filmDetailsNewCommentView.getElement(), RenderPosition.BEFOREEND);

    this._filmDetailsControls.handleWatchListButton = this._handleWatchListButton;
    this._filmDetailsControls.handleHistoryListButton = this._handleHistoryListButton;
    this._filmDetailsControls.handleFavoriteListButton = this._handleFavoriteListButton;

    this._filmDetailsView.setCloseButtonClickHandler();


    render(document.body, this._filmDetailsView.getElement(), RenderPosition.BEFOREEND);
  }
}
