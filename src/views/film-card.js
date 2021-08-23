import { PREFIX_CLASS_BUTTON } from '../const';
import { formatReleaseDate, filmDurationCovert } from '../utils/date';
import { getActiveClassButton } from '../utils/helpers';
import Component from './component';

const createFilmCardTemplate = ({ comments, filmDetails, info }) => {
  const { poster, title, description, genre, totalRating, release: { date }, runtime} = info;
  const { watchlist, history, favorite } = filmDetails;

  const isActiveWatchListButton = getActiveClassButton(watchlist);
  const isAlreadyWatchedButton = getActiveClassButton(history);
  const isActiveFavoriteButton = getActiveClassButton(favorite);

  const [,,year] = formatReleaseDate(date).split(' ');

  return (
    `<article class="film-card">
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
  }

  setWatchButtonClickHandler(handler) {
    const watchFilmButton = this.getElement().querySelector(`${PREFIX_CLASS_BUTTON}--add-to-watchlist`);
    watchFilmButton.addEventListener('click', () => handler(this._data));
  }

  setAlreadyWatchedButtonClickHandler(handler) {
    const alreadyWatchedButton = this.getElement().querySelector(`${PREFIX_CLASS_BUTTON}--mark-as-watched`);
    alreadyWatchedButton.addEventListener('click', () => handler(this._data));
  }

  setFavoriteButtonClickHandler(handler) {
    const favoriteFilmButton = this.getElement().querySelector(`${PREFIX_CLASS_BUTTON}--favorite`);
    favoriteFilmButton.addEventListener('click', () => handler(this._data));
  }

  getTemplate() {
    return createFilmCardTemplate(this._data);
  }

  setPosterClickHandler(handler) {
    this.getElement()
      .querySelector('.film-card__poster')
      .addEventListener('click', handler);
  }

  setTitleClickHandler(handler) {
    this.getElement()
      .querySelector('.film-card__title')
      .addEventListener('click', handler);
  }

  setCommentsLinkClickHandler(handler) {
    this.getElement()
      .querySelector('.film-card__comments')
      .addEventListener('click', (evt) => {
        evt.preventDefault();
        handler();
      });
  }
}


