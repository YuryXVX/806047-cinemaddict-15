import { createElement } from '../utils/render';
import { getActiveClassButton } from './card';


const EmojiMap = {
  smile: './images/emoji/smile.png',
  sleeping: './images/emoji/sleeping.png',
  puke: './images/emoji/puke.png',
  angry: './images/emoji/angry.png',
};

const getGenreListMarkup = (genre) => `<td class="film-details__cell>
    ${ genre.map((ganre) => `<span class="film-details__genre">${ganre}</span>`).join(' ') }
  </td>`;

const commentItemMarkup = ({ author, comment, date, emotion } ) => `<li class="film-details__comment">
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
                                                                          </li>`;

const commentsListMarkup = (comments) => `<ul class="film-details__comments-list">${ comments.map(commentItemMarkup).join('') }</ul>`;

const FILM_DETAILS_POPUP_TEMPLATE = ({ comments, info, details }) => {
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
  const commentsList = commentsListMarkup(comments);
  const { watchlist, alreadyWatched, favorite } = details;

  const isActiveWatchListButton = getActiveClassButton(watchlist);
  const isAlreadyWatchedButton = getActiveClassButton(alreadyWatched);
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
              <td class="film-details__cell">${ director }</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Writers</td>
              <td class="film-details__cell">${ writers.join(', ') }</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Actors</td>
              <td class="film-details__cell">${ actors.join(', ') }</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Release Date</td>
              <td class="film-details__cell">${ date }</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Runtime</td>
              <td class="film-details__cell">${ runtime }</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Country</td>
              <td class="film-details__cell">${ releaseCountry }</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Genres</td>
              ${ getGenreListMarkup(genre) }
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
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${ comments.length }</span></h3>
  
       
        ${ commentsList }
       
  
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

const closePopupClickHandler = (el) => {
  document.body.style.overflow = 'auto';
  el.remove();
};

const popupAddListeners = (popupElement) => {
  const closeButton = popupElement.querySelector('.film-details__close-btn');
  closeButton.addEventListener('click', () => closePopupClickHandler(popupElement));
};

export const filmDetailsPopup = (data) => {
  const popup = createElement(FILM_DETAILS_POPUP_TEMPLATE(data));

  popupAddListeners(popup);
  return popup;
};
