import { createElement } from '../utils/render';

export const getActiveClassButton = (isActive) => isActive ? 'film-card__controls-item--active' : '';

const noop = () => {};


const CARD_TEPLATE = ({ comments, details, info }) => {
  const { poster, title, description, genre, totalRating, release: { date }, runtime} = info;
  const { watchlist, alreadyWatched, favorite } = details;

  const isActiveWatchListButton = getActiveClassButton(watchlist);
  const isAlreadyWatchedButton = getActiveClassButton(alreadyWatched);
  const isActiveFavoriteButton = getActiveClassButton(favorite);

  const [,, year] = date.split(' ');

  return `<article class="film-card">
      <h3 class="film-card__title">${title}</h3>
        <p class="film-card__rating">${totalRating}</p>
        <p class="film-card__info">
          <span class="film-card__year">${ year }</span>
          <span class="film-card__duration">${ runtime }</span>
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
    </article>`;
};

const cardAddListeners = (cardElement, data, handler) => {
  cardElement.addEventListener('click', (evt) => {
    evt.preventDefault();
    handler(data);
  });
};


export const cardTemplate = (data, cb = noop) => {
  const card = createElement(CARD_TEPLATE(data));

  cardAddListeners(card, data, cb);

  return card;
};
