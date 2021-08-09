import { remove, render, RenderPosition } from '../utils/render';

// views
import FilmListSection from '../views/film-list-container';
import FilmSection from '../views/films-section';
import FilListContainer from '../views/film-list-section';
import Filters from '../views/filters';
import Footer from '../views/footer-statistic';
import Profile from '../views/profile';
import Sort from '../views/sort';
import ShowMoreButton from '../views/show-more-button';
const FILMS_COUNT_PER_STEP = 5;

// controllers
import Film from './film';
import NoFilmsMessage from '../views/no-films-message';

const renderFilmCardViews = (container, films, comments) => films.map((film) => {
  const patchDataForPopup = {
    ...film,
    comments: comments.filter((comment) => film.comments.includes(comment.id)),
  };

  const filmController = new Film(container, patchDataForPopup);
  filmController.render();
  return filmController;
});


export default class App {
  constructor({ header, main, footer }, data) {
    this._headerContainer = header;
    this._mainContainer = main;
    this._footerContainer = footer;

    this._showFilmsCount = FILMS_COUNT_PER_STEP;

    this._fimsController = [];

    this._data = data;

    this._footerView = new Footer(this._data.films.length);
    this._filterView = new Filters(this._data.filters);
    this._profileView = new Profile(this._data.userRating);
    this._sortView = new Sort();
    this._filmSectionView = new FilmSection();
    this._filmListSectionView = new FilmListSection();
    this._filmListContainerView = new FilListContainer();

    this._showMoreButton = null;
    this._noFilmsMessageView = null;
  }

  render() {
    render(this._headerContainer, this._profileView.getElement(), RenderPosition.BEFOREEND);
    render(this._mainContainer, this._sortView.getElement(), RenderPosition.AFTERBEGIN);
    render(this._mainContainer, this._filterView.getElement(), RenderPosition.AFTERBEGIN);
    render(this._footerContainer, this._footerView.getElement(), RenderPosition.BEFOREEND);
    render(this._mainContainer, this._filmSectionView.getElement(), RenderPosition.BEFOREEND);

    render(this._filmSectionView.getElement(), this._filmListContainerView.getElement(), RenderPosition.BEFOREEND);

    if(!this._data.films.length) {
      this._renderNoFilmsMessage();
      return;
    }

    render(this._filmListContainerView.getElement(), this._filmListSectionView.getElement(), RenderPosition.BEFOREEND);
    this._renderFilms(this._data.films.slice(0, this._showFilmsCount));

    this._renderLoadMoreButton();
  }

  _renderFilms(films) {
    const container = this._filmListSectionView.getElement();

    const filmsControlles = renderFilmCardViews(container, films, this._data.commentsList);

    this._fimsController = this._fimsController.concat(filmsControlles);
    this._showFilmsCount = this._fimsController.length;
  }

  _renderNoFilmsMessage() {
    const container = this._filmListContainerView.getElement();

    this._noFilmsMessageView = new NoFilmsMessage();
    remove(this._sortView);
    render(container, this._noFilmsMessageView.getElement(), RenderPosition.AFTERBEGIN);
  }

  _renderLoadMoreButton() {
    if(!this._data.films.length) {
      return;
    }

    this._showMoreButton = new ShowMoreButton();
    render(this._filmListContainerView.getElement(), this._showMoreButton.getElement(), RenderPosition.BEFOREEND);

    this._showMoreButton.setShowMoreButtonClickHandler(this._onLoadMoreButtonClick.bind(this));
  }

  _onLoadMoreButtonClick() {
    const prevFilmsCount = this._showFilmsCount;
    const films = this._data.films;

    this._showFilmsCount = this._showFilmsCount + FILMS_COUNT_PER_STEP;

    const chunckFilmList = films.slice(prevFilmsCount, this._showFilmsCount);

    this._renderFilms(chunckFilmList);

    if (this._showFilmsCount >= films.length) {
      remove(this._showMoreButton);
    }
  }
}
