import { PREFIX_CLASS_BUTTON } from '../const';
import { getActiveClassButton } from '../utils/helpers';
import Component from './component';

const createDeatailsButtonsTemplate = (data) => {
  const { watchlist, history, favorite } = data;

  const isActiveWatchListButton = getActiveClassButton(watchlist);
  const isAlreadyWatchedButton = getActiveClassButton(history);
  const isActiveFavoriteButton = getActiveClassButton(favorite);

  return (
    `<section class="film-details__controls">
      <button class="film-card__controls-item film-card__controls-item--add-to-watchlist ${isActiveWatchListButton}" type="button">Add to watchlist 1</button>
      <button class="film-card__controls-item film-card__controls-item--mark-as-watched ${isAlreadyWatchedButton}" type="button">Mark as watched 2</button>
      <button class="film-card__controls-item film-card__controls-item--favorite ${isActiveFavoriteButton}" type="button">Mark as favorite 3</button>
    </section>`
  );
};

export default class FilmDetailsControlsView extends Component {
  constructor(data) {
    super();

    this._data = data;
    this.handleWatchListButton = null;
    this.handleHistoryListButton = null;
    this.handleFavoriteListButton = null;

    this._handleFavoriteListButton = this._handleFavoriteListButton.bind(this);
    this._handleWatchListButton = this._handleWatchListButton.bind(this);
    this._handleHistoryListButton = this._handleHistoryListButton.bind(this);
  }

  _handleWatchListButton() {
    this.handleWatchListButton(this._data);
  }

  _handleHistoryListButton() {
    this.handleHistoryListButton(this._data);
  }

  _handleFavoriteListButton() {
    this.handleFavoriteListButton(this._data);
  }

  get data() {
    return this._data;
  }

  set data(newData) {
    this._data = newData;
    this.updateComponent();
  }

  _addEventListeners() {
    this.element.querySelector(`${PREFIX_CLASS_BUTTON}--add-to-watchlist`).addEventListener('click', this._handleWatchListButton);
    this.element.querySelector(`${PREFIX_CLASS_BUTTON}--mark-as-watched`).addEventListener('click', this._handleHistoryListButton);
    this.element.querySelector(`${PREFIX_CLASS_BUTTON}--favorite`).addEventListener('click', this._handleFavoriteListButton);
  }

  _removeEventListeners() {
    this.element.querySelector(`${PREFIX_CLASS_BUTTON}--add-to-watchlist`).removeEventListener('click', this._handleWatchListButton);
    this.element.querySelector(`${PREFIX_CLASS_BUTTON}--mark-as-watched`).addEventListener('click', this._handleHistoryListButton);
    this.element.querySelector(`${PREFIX_CLASS_BUTTON}--favorite`).addEventListener('clicl', this._handleFavoriteListButton);
  }

  getTemplate() {
    const { filmDetails } = this._data;
    return createDeatailsButtonsTemplate(filmDetails);
  }
}
