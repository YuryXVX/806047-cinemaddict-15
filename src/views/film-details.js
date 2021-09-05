import { formatReleaseDate, filmDurationCovert } from '../utils/date';
import Component from './component';

const createGenreListTemplate = (genre) => (
  `<td class="film-details__cell>
    ${ genre.map((ganre) => `<span class="film-details__genre">${ganre}</span>`).join(' ') }
  </td>`
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


  const genresListTemplate = createGenreListTemplate(genre);
  const { hours, minutes } = filmDurationCovert(runtime);

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
              <td class="film-details__cell">${formatReleaseDate(date)}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Runtime</td>
              <td class="film-details__cell">${hours}h ${minutes}m</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Country</td>
              <td class="film-details__cell">${releaseCountry}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">${genre.length >= 1 ? 'Genre' : 'Genres'}</td>
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
  }

  get filmsDetailsCommentWrap() {
    return this.element.querySelector('.film-details__comments-wrap');
  }

  get filmListDetailsContainer() {
    const container = this.getElement().querySelector('.film-details__top-container');
    return container;
  }

  updateCommentCountElement(count) {
    this.element.querySelector('.film-details__comments-count').innerText = count;
  }

  getTemplate() {
    return createFilmDetailsTemplate(this._data);
  }

  _addEventListeners() {
    this.element.querySelector('form').addEventListener('submit', (evt) => evt.preventDefault());
    this.element.querySelector('.film-details__close-btn').addEventListener('click', this._handler);
  }


  _removeEventListeners() {
    this.element.querySelector('form').removeEventListener('submit', (evt) => evt.preventDefault());
    this.element.querySelector('.film-details__close-btn').removeEventListener('click', this._handler);
  }
}
