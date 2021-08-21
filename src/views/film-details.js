import { EmojiMap } from '../const';
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

const createFilmDetailsTemplate = ({ comments, info }) => {
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

  const commentsList = createCommentsListTemplate(comments);
  const genresListTemplate = createGenreListTemplate(genre);

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
    </div>
  
    <div class="film-details__bottom-container">
      <section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>
    
        ${commentsList}
      
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

  get filmsDetailsCommentWrap() {
    return this.element.querySelector('.film-details__comments-wrap');
  }

  getTemplate() {
    return createFilmDetailsTemplate(this._data);
  }

  get filmListDetailsContainer() {
    const container = this.getElement().querySelector('.film-details__top-container');
    return container;
  }

  _formSubmitPrevent() {
    this.getElement().querySelector('form').addEventListener('submit', (evt) => evt.preventDefault());
  }

  setCloseButtonClickHandler() {
    this.getElement()
      .querySelector('.film-details__close-btn')
      .addEventListener('click', this._handler);
  }

  _removeEventListener() {
    this.getElement()
      .querySelector('.film-details__close-btn')
      .removeEventListener('click', this._handler);
  }
}
