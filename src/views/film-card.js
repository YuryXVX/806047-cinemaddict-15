import { PREFIX_CLASS_BUTTON } from '../const';
import { formatReleaseDate, filmDurationCovert } from '../utils/date';
import { getActiveClassButton } from '../utils/helpers';
import Component from './component';

const createFilmCardTemplate = ({ comments, filmDetails, info }, errorState) => {
  const { poster, title, description, genre, totalRating, release: { date }, runtime} = info;
  const { watchlist, history, favorite } = filmDetails;

  const isActiveWatchListButton = getActiveClassButton(watchlist);
  const isAlreadyWatchedButton = getActiveClassButton(history);
  const isActiveFavoriteButton = getActiveClassButton(favorite);

  const [,,year] = formatReleaseDate(date).split(' ');

  return (
    `<article class="${errorState ? 'shake film-card' : 'film-card'}">
      <h3 class="film-card__title">${title}</h3>
        <p class="film-card__rating">${totalRating}</p>
        <p class="film-card__info">
          <span class="film-card__year">${ year }</span>
          <span class="film-card__duration">${ filmDurationCovert(runtime) }</span>
          <span class="film-card__genre">${genre.join(' ')}</span>
        </p>
        <img src="${poster}" alt="" class="film-card__poster">
        <p class="film-card__description">${description}</p>
        <a class="film-card__comments"> ${comments.length} comments</a>
        <div class="film-card__controls">
          <button class="film-card__controls-item film-card__controls-item--add-to-watchlist ${isActiveWatchListButton}" type="button">Add to watchlist</button>
          <button class="film-card__controls-item film-card__controls-item--mark-as-watched ${isAlreadyWatchedButton}" type="button">Mark as watched</button>
          <button class="film-card__controls-item film-card__controls-item--favorite ${isActiveFavoriteButton}" type="button">Mark as favorite</button>
        </div>
    </article>`
  );
};

export default class FilmCardView extends Component {
  constructor(data) {
    super();
    this._data = data;
    this._errorState = false;

    this.handleSetWatchFilms = null;
    this.handleSetHistoryFilms = null;
    this.handleSetFavoriteFilms = null;
    this.handleOpenPopup = null;
  }

  get errorState() {
    return this._errorState;
  }

  _addEventListeners() {
    this.element.querySelector(`${PREFIX_CLASS_BUTTON}--add-to-watchlist`).addEventListener('click', this.handleSetWatchFilms);
    this.element.querySelector(`${PREFIX_CLASS_BUTTON}--mark-as-watched`).addEventListener('click', this.handleSetHistoryFilms);
    this.element.querySelector(`${PREFIX_CLASS_BUTTON}--favorite`).addEventListener('click', this.handleSetFavoriteFilms);
    this.element.querySelector('.film-card__comments').addEventListener('click', this.handleOpenPopup);
    this.element.querySelector('.film-card__title').addEventListener('click', this.handleOpenPopup);
    this.element.querySelector('.film-card__poster').addEventListener('click', this.handleOpenPopup);
  }

  _removeEventListeners() {
    this.element.querySelector(`${PREFIX_CLASS_BUTTON}--add-to-watchlist`).removeEventListener('click', this.handleSetWatchFilms);
    this.element.querySelector(`${PREFIX_CLASS_BUTTON}--mark-as-watched`).removeEventListener('click', this.handleSetHistoryFilms);
    this.element.querySelector(`${PREFIX_CLASS_BUTTON}--favorite`).removeEventListener('click', this.handleSetFavoriteFilms);
    this.element.querySelector('.film-card__comments').removeEventListener('click', this.handleOpenPopup);
    this.element.querySelector('.film-card__title').removeEventListener('click', this.handleOpenPopup);
    this.element.querySelector('.film-card__poster').removeEventListener('click', this.handleOpenPopup);
  }

  set errorState(newValue) {
    this._errorState = newValue;

    if(this.element) {
      this.updateComponent();
    }
  }

  _clearErrorState() {
    if(this.errorState) {
      setTimeout(() => this.errorState = false, 1000);
    }
  }

  getTemplate() {
    this._clearErrorState();
    return createFilmCardTemplate(this._data, this.errorState);
  }
}


