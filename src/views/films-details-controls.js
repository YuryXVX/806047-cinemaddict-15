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
  }

  get data() {
    return this._data;
  }

  set data(newData) {
    this._data = newData;
    this.updateComponent();
  }

  _addEventListeners() {
    this.element.querySelector(`${PREFIX_CLASS_BUTTON}--add-to-watchlist`).addEventListener('click', () => this.handleWatchListButton(this._data));
    this.element.querySelector(`${PREFIX_CLASS_BUTTON}--mark-as-watched`).addEventListener('click', () => this.handleHistoryListButton(this._data));
    this.element.querySelector(`${PREFIX_CLASS_BUTTON}--favorite`).addEventListener('click', () => this.handleFavoriteListButton(this._data));
  }

  _removeEventListeners() {
    this.element.querySelector(`${PREFIX_CLASS_BUTTON}--add-to-watchlist`).removeEventListener('click', () => this.handleWatchListButton(this._data));
    this.element.querySelector(`${PREFIX_CLASS_BUTTON}--mark-as-watched`).addEventListener('click', () => this.handleHistoryListButton(this._data));
    this.element.querySelector(`${PREFIX_CLASS_BUTTON}--favorite`).addEventListener('clicl', () => this.handleFavoriteListButton(this._data));
  }

  getTemplate() {
    const { filmDetails } = this._data;
    return createDeatailsButtonsTemplate(filmDetails);
  }
}
