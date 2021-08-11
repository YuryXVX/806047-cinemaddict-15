import { removeElement, render, RenderPosition } from '../utils/render';

// views
import Filters from '../views/filters';
import Footer from '../views/footer';
import Profile from '../views/profile';
import Sort from '../views/sort';
import ShowMoreButton from '../views/show-more-button';
import Container from '../views/container';
import NoFilmsMessage from '../views/no-films-message';

// controllers
import { renderFilmCardViews } from './film';

// constants
import { FILMS_COUNT_PER_STEP } from '../const';

export default class App {
  constructor({ header, main, footer }, data) {
    this._headerContainer = header;
    this._mainContainer = main;
    this._footerContainer = footer;

    this._showFilmsCount = FILMS_COUNT_PER_STEP;

    this._fimsController = [];

    this._data = data;

    this._profileView = new Profile(this._data.userRating);
    this._filterView = new Filters(this._data.filters);
    this._sortView = new Sort();
    this._footerView = new Footer(this._data.films.length);

    this._filmSectionView = new Container({
      classList: ['films'],
    });

    this._allFilmsSectionView = new Container({
      title: 'All movies. Upcoming',
      classList: ['films-list'],
    });

    this._topRatedFilmsSectionView = new Container({
      title: 'Top rated',
      classList: ['films-list films-list--extra'],
      isExtra: true,
      noHiddenTitle: true,
    });

    this._mostCommentedFilmsSectionView = new Container({
      title: 'Most commented',
      classList: ['films-list films-list--extra'],
      isExtra: true,
      noHiddenTitle: true,
    });

    this._allFilmsListView = new Container({
      tag: 'div',
      classList: ['films-list__container'],
    });

    this._topRatedFilmsListView = new Container({
      tag: 'div',
      classList: ['films-list__container'],
    });

    this._mostCommentedFilmsListView = new Container({
      tag: 'div',
      classList: ['films-list__container'],
    });

    this._showMoreButton = null;
    this._noFilmsMessageView = null;
  }

  render() {
    render(this._headerContainer, this._profileView.getElement(), RenderPosition.BEFOREEND);
    render(this._mainContainer, this._sortView.getElement(), RenderPosition.AFTERBEGIN);
    render(this._mainContainer, this._filterView.getElement(), RenderPosition.AFTERBEGIN);
    render(this._footerContainer, this._footerView.getElement(), RenderPosition.BEFOREEND);

    render(this._mainContainer, this._filmSectionView.getElement(), RenderPosition.BEFOREEND);

    render(this._filmSectionView.getElement(), this._allFilmsSectionView.getElement(), RenderPosition.BEFOREEND);

    if(!this._data.films.length) {
      this._renderNoFilmsMessage();
      return;
    }

    render(this._filmSectionView.getElement(), this._topRatedFilmsSectionView.getElement(), RenderPosition.BEFOREEND);
    render(this._filmSectionView.getElement(), this._mostCommentedFilmsSectionView.getElement(), RenderPosition.BEFOREEND);

    render(this._allFilmsSectionView.getElement(), this._allFilmsListView.getElement(), RenderPosition.BEFOREEND);
    render(this._topRatedFilmsSectionView.getElement(), this._topRatedFilmsListView.getElement(), RenderPosition.BEFOREEND);
    render(this._mostCommentedFilmsSectionView.getElement(), this._mostCommentedFilmsListView.getElement(), RenderPosition.BEFOREEND);

    this._renderFilms(this._data.films.slice(0, this._showFilmsCount));
    this._renderTopRatedFilms(this._data.topRated);
    this._renderMostCommentedFilms(this._data.mostCommented);

    this._renderLoadMoreButton();
  }

  _renderFilms(films) {
    const container = this._allFilmsListView.getElement();

    const filmsControlles = renderFilmCardViews(container, films, this._data.commentsList);

    this._fimsController = this._fimsController.concat(filmsControlles);
    this._showFilmsCount = this._fimsController.length;
  }

  _renderTopRatedFilms(films) {
    const container = this._topRatedFilmsListView.getElement();
    renderFilmCardViews(container, films, this._data.commentsList);
  }

  _renderMostCommentedFilms(films) {
    const container = this._mostCommentedFilmsListView.getElement();
    renderFilmCardViews(container, films, this._data.commentsList);
  }

  _renderNoFilmsMessage() {
    const container = this._allFilmsSectionView.getElement();

    this._noFilmsMessageView = new NoFilmsMessage();
    removeElement(this._sortView);
    render(container, this._noFilmsMessageView.getElement(), RenderPosition.AFTERBEGIN);
  }

  _renderLoadMoreButton() {
    if(!this._data.films.length) {
      return;
    }

    this._showMoreButton = new ShowMoreButton();
    render(this._allFilmsSectionView.getElement(), this._showMoreButton.getElement(), RenderPosition.BEFOREEND);

    this._showMoreButton.setShowMoreButtonClickHandler(this._onLoadMoreButtonClick.bind(this));
  }

  _onLoadMoreButtonClick() {
    const prevFilmsCount = this._showFilmsCount;
    const films = this._data.films;

    this._showFilmsCount = this._showFilmsCount + FILMS_COUNT_PER_STEP;

    const chunckFilmList = films.slice(prevFilmsCount, this._showFilmsCount);

    this._renderFilms(chunckFilmList);

    if (this._showFilmsCount >= films.length) {
      removeElement(this._showMoreButton);
    }
  }
}
