import { getActiveClassButton } from '../utils/helpers';
import { EmojiMap, PREFIX_CLASS_BUTTON } from '../const';
import Component from './component';

const createGenreListTemplate = (genre) => (
  `<td class="film-details__cell>
    ${ genre.map((ganre) => `<span class="film-details__genre">${ganre}</span>`).join(' ') }
  </td>`
);

const cretateCommentTemplate = ({ author, comment, date, emotion }) => (
  `<li class="film-details__comment">
    <span class="film-details__comment-emoji">
      <img src="${EmojiMap[emotion]}" width="55" height="55" alt="emoji-smile">
    </span>
    <div>
      <p class="film-details__comment-text">${ comment }</p>
      <p class="film-details__comment-info">
        <span class="film-details__comment-author">${ author }</span>
        <span class="film-details__comment-day">${ date }</span>
        <button class="film-details__comment-delete">Delete</button>
      </p>
    </div>
  </li>`
);

const createCommentsListTemplate = (comments) => (
  `<ul class="film-details__comments-list">${ comments.map(cretateCommentTemplate).join('') }</ul>`
);

const createFilmDetailsTemplate = ({ comments, info, details }) => {
  const {
    poster,
    title,
    description,
    genre,
    totalRating,
    alternativeTitle,
    actors,
    writers,
    director,
    runtime,
    release: { date, releaseCountry },
  } = info;

  const { watchlist, history, favorite } = details;

  const commentsList = createCommentsListTemplate(comments);
  const genresListTemplate = createGenreListTemplate(genre);

  const isActiveWatchListButton = getActiveClassButton(watchlist);
  const isAlreadyWatchedButton = getActiveClassButton(history);
  const isActiveFavoriteButton = getActiveClassButton(favorite);


  return `<section class="film-details">
  <form class="film-details__inner" action="" method="get">
    <div class="film-details__top-container">
      <div class="film-details__close">
        <button class="film-details__close-btn" type="button">close</button>
      </div>
      <div class="film-details__info-wrap">
        <div class="film-details__poster">
          <img class="film-details__poster-img" src="${poster}" alt="">
  
          <p class="film-details__age">18+</p>
        </div>
  
        <div class="film-details__info">
          <div class="film-details__info-head">
            <div class="film-details__title-wrap">
              <h3 class="film-details__title">${title}</h3>
              <p class="film-details__title-original">Original: ${alternativeTitle}</p>
            </div>
  
            <div class="film-details__rating">
              <p class="film-details__total-rating">${totalRating}</p>
            </div>
          </div>
  
          <table class="film-details__table">
            <tr class="film-details__row">
              <td class="film-details__term">Director</td>
              <td class="film-details__cell">${director}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Writers</td>
              <td class="film-details__cell">${writers.join(', ')}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Actors</td>
              <td class="film-details__cell">${actors.join(', ')}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Release Date</td>
              <td class="film-details__cell">${date}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Runtime</td>
              <td class="film-details__cell">${runtime}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Country</td>
              <td class="film-details__cell">${releaseCountry}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Genres</td>
              ${genresListTemplate}
            </tr>
          </table>
  
          <p class="film-details__film-description">
            ${description}
          </p>
        </div>
      </div>
  
      <section class="film-details__controls">
        <button class="film-card__controls-item film-card__controls-item--add-to-watchlist ${isActiveWatchListButton}" type="button">Add to watchlist</button>
        <button class="film-card__controls-item film-card__controls-item--mark-as-watched ${isAlreadyWatchedButton}" type="button">Mark as watched</button>
        <button class="film-card__controls-item film-card__controls-item--favorite ${isActiveFavoriteButton}" type="button">Mark as favorite</button>
      </section>
    </div>
  
    <div class="film-details__bottom-container">
      <section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>
    
        ${commentsList}
      
        <div class="film-details__new-comment">
          <div class="film-details__add-emoji-label">
            <img src="images/emoji/smile.png" width="55" height="55" alt="emoji-smile">
          </div>
  
          <label class="film-details__comment-label">
            <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment">Great movie!</textarea>
          </label>
  
          <div class="film-details__emoji-list">
            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile" checked>
            <label class="film-details__emoji-label" for="emoji-smile">
              <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
            </label>
  
            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
            <label class="film-details__emoji-label" for="emoji-sleeping">
              <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
            </label>
  
            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
            <label class="film-details__emoji-label" for="emoji-puke">
              <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
            </label>
  
            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
            <label class="film-details__emoji-label" for="emoji-angry">
              <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
            </label>
          </div>
        </div>
      </section>
    </div>
  </form>
  </section>`;
};


export default class FilmDetails extends Component {
  constructor(data, handler = () => {}) {
    super();
    this._data = data;
    this._handler = handler;

    this._formSubmitPrevent();
  }

  getTemplate() {
    return createFilmDetailsTemplate(this._data);
  }

  _formSubmitPrevent() {
    this.getElement().querySelector('form').addEventListener('submit', (evt) => evt.preventDefault());
  }

  setCloseButtonClickHandler() {
    this.getElement()
      .querySelector('.film-details__close-btn')
      .addEventListener('click', this._handler);
  }

  setWatchButtonClickHandler(handler) {
    const button = this.getElement().querySelector(`${PREFIX_CLASS_BUTTON}--add-to-watchlist`);
    button.addEventListener('click', () => handler());
  }

  setAlreadyWatchedButtonClickHandler(handler) {
    const alreadyWatchedButton = this.getElement().querySelector(`${PREFIX_CLASS_BUTTON}--mark-as-watched`);
    alreadyWatchedButton.addEventListener('click', () => handler());
  }

  setFavoriteButtonClickHandler(handler) {
    const favoriteFilmButton = this.getElement().querySelector(`${PREFIX_CLASS_BUTTON}--favorite`);
    favoriteFilmButton.addEventListener('click', () => handler());
  }

  _removeListener() {
    this.getElement()
      .querySelector('.film-details__close-btn')
      .removeEventListener('click', this._handler);
  }
}
