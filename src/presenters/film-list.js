import { EmptyListMessages, FILMS_COUNT_PER_STEP, SortType } from '../const';
import { render, RenderPosition, removeElement } from '../utils/render';
import { getFilmPresenters } from './film';
import RootPresenter from './root-presenter';

// views
import Container from '../views/container';
import NoFilmsMessage from '../views/no-films-message';
import Sort from '../views/sort';
import ShowMoreButton from '../views/show-more-button';

// presenter
import FilmDetailsPresenter from './film-details';

// adapters
import Film, { toRawFilmModel } from '../adapters/film';

// utils
import { getMostCommentedFilms, getTopRatedFilms } from '../utils/filters';

export default class FilmListPresenter extends RootPresenter {
  constructor(store, handleRaitingChange, handleFiltersCountChange, containers) {
    super(store, containers);

    this._container = null;
    this._filterComponentRef = null;
    this._sortView = null;
    this._noFilmsMessageView = null;

    this._containerView = new Container({classList: ['films']});

    this._filmListView = new Container({ title: 'All movies. Upcoming', classList: ['films-list'] });
    this._filmListMostCommentedView = new Container({ title: 'Most commented', classList: ['films-list films-list--extra'], isExtra: true, noHiddenTitle: true });
    this._filmListTopRatedView = new Container({ title: 'Top rated', classList: ['films-list films-list--extra'], isExtra: true, noHiddenTitle: true });

    this._filmListContainerView = new Container({ tag: 'div', classList: ['films-list__container'] });
    this._filmListContainerMostCommentedView = new Container({ tag: 'div', classList: ['films-list__container'] });
    this._filmListContainerTopRatedView = new Container({ tag: 'div', classList: ['films-list__container'] });


    this._filmsPresenters = [];
    this._filmsTopRatedPresenters = [];
    this._filmsMostCommentedPresenters = [];
    this._filmDetailsPresenter = null;
    this._filmDetailsPresenters = new Set();

    this._handleDataChange = this._handleDataChange.bind(this);
    this._handleRenderFilmDetailsPopup = this._renderFilmDetailsPopup.bind(this);
    this._handleChangeSortData = this._handleChangeSortData.bind(this);
    this._handleLoadMoreFilms = this._handleLoadMoreFilms.bind(this);

    this._handleRatingChange = handleRaitingChange;
    this._handleFiltersCountChange = handleFiltersCountChange;

    this._showFilmsCount = FILMS_COUNT_PER_STEP;
  }

  filtered({ films }) {
    this._updateViewOnChangeFilters({ films });
    this._updateFilms(FILMS_COUNT_PER_STEP);
  }

  rerender({ films }) {
    if(this._showFilmsCount < FILMS_COUNT_PER_STEP) {
      this._showFilmsCount = FILMS_COUNT_PER_STEP;
    }

    this._updateViewOnChangeFilters({ films });

    this._updateFilms(this._showFilmsCount);

    this._updateMostCommentedFilms();
    this._updateTopRatedFilms();
    this._handleRatingChange(films);
    this._handleFiltersCountChange(films);
  }

  _updateViewOnChangeFilters({ films }) {
    if(films.length) {
      if(this._noFilmsMessageView) {
        removeElement(this._noFilmsMessageView);
        render(this._filterComponentRef.getElement(), this._sortView.getElement(), RenderPosition.AFTER);
      }

      this._sortView.activeButton = SortType.DEFAULT;
    }

    if(!films.length) {
      removeElement(this._sortView);
      this._renderNoFilmsMessage();
    }
  }


  render({ container, filters }) {
    super.render();

    this._container = container;
    this._filterComponentRef = filters;

    this._renderSortComponent(this._model.activeSortButton);
    this._renderAllFilms();
    this._renderLoadMoreButton();
    this._renderTopRatedFilms();
    this._renderMostCommentedFilms();
  }

  _handleChangeSortData(activeSort) {
    if(activeSort === this._model.activeSortButton) {
      return;
    }

    this._model.activeSortButton = activeSort;
    this._sortView.activeButton = this._model.activeSortButton;
  }

  _renderSortComponent() {
    this._sortView = new Sort();
    this._sortView.handleChangeSort = this._handleChangeSortData;

    render(this._container, this._sortView.getElement(), RenderPosition.BEFOREEND);
  }

  _renderAllFilms() {
    render(this._container, this._containerView.getElement(), RenderPosition.BEFOREEND);
    render(this._containerView.getElement(), this._filmListView.getElement(), RenderPosition.BEFOREEND);
    render(this._filmListView.getElement(), this._filmListContainerView.getElement(), RenderPosition.BEFOREEND);

    if(!this._model.films.length) {
      removeElement(this._sortView);
      this._renderNoFilmsMessage();
    }

    this._renderFilms(this._model.films.slice(0, this._showFilmsCount));
  }

  _removeFilms() {
    this._destroyFilmPresenters(this._filmsPresenters);
    this._filmsPresenters = [];
  }

  _removeMostCommentedFilms() {
    this._destroyFilmPresenters(this._filmsMostCommentedPresenters);
    this._filmsMostCommentedPresenters = [];
  }

  _removeTopRatedFilms() {
    this._destroyFilmPresenters(this._filmsTopRatedPresenters);
    this._filmsTopRatedPresenters = [];
  }

  _updateFilms(filmsCount) {
    this._removeFilms();
    this._renderFilms(this._model.films.slice(0, filmsCount));
    this._renderLoadMoreButton();
    this._updateMostCommentedFilms();
  }

  _renderMostCommentedFilms() {
    render(this._containerView.getElement(), this._filmListMostCommentedView.getElement(), RenderPosition.BEFOREEND);
    render(this._filmListMostCommentedView.getElement(), this._filmListContainerMostCommentedView.getElement(), RenderPosition.BEFOREEND);

    const mostCommentFilms = getMostCommentedFilms(this._model.initalFilmsList).slice(0, 2);
    this._renderCommentedFilms(mostCommentFilms);
  }

  _renderTopFilms(films) {
    const container = this._filmListContainerTopRatedView.getElement();
    const topRatedFilms = getFilmPresenters(container, films, this._handleDataChange, this._handleRenderFilmDetailsPopup);

    this._filmsTopRatedPresenters = topRatedFilms;
  }

  _renderTopRatedFilms() {
    render(this._containerView.getElement(), this._filmListTopRatedView.getElement(), RenderPosition.BEFOREEND);
    render(this._filmListTopRatedView.getElement(), this._filmListContainerTopRatedView.getElement(), RenderPosition.BEFOREEND);

    const topRatedFilms = getTopRatedFilms(this._model.initalFilmsList).slice(0, 2);
    this._renderTopFilms(topRatedFilms);
  }

  _updateMostCommentedFilms() {
    const films = getMostCommentedFilms(this._model.initalFilmsList).slice(0, 2);
    this._removeMostCommentedFilms();
    this._renderCommentedFilms(films);
  }

  _updateTopRatedFilms() {
    this._destroyFilmPresenters(this._filmsTopRatedPresenters);
    const topRatedFilms = getTopRatedFilms(this._model.initalFilmsList).slice(0, 2);

    this._renderTopFilms(topRatedFilms);
  }

  _destroyFilmPresenters(presenters) {
    presenters.forEach((presenter) => presenter.destroy());
  }

  _renderCommentedFilms(films) {
    const container = this._filmListContainerMostCommentedView.getElement();
    const filmPresenters = getFilmPresenters(container, films, this._handleDataChange, this._handleRenderFilmDetailsPopup);

    this._filmsMostCommentedPresenters = filmPresenters;
  }

  _renderFilms(films) {
    const container = this._filmListContainerView.getElement();

    const filmsPresenters = getFilmPresenters(container, films, this._handleDataChange, this._handleRenderFilmDetailsPopup);

    this._filmsPresenters = this._filmsPresenters.concat(filmsPresenters);
    this._showFilmsCount = this._filmsPresenters.length;
  }

  _handleDataChange(presenter, oldData, newData) {
    this._api
      .updateFilm(oldData.id, new Film(toRawFilmModel(newData)))
      .then((film) => {
        this._model.updateFilm(oldData, film);

        if(!this._model.films.length) {
          this._renderNoFilmsMessage();
        }
      })
      .catch(() => {
        presenter.shake();
      });
  }

  _renderNoFilmsMessage() {
    if(this._noFilmsMessageView) {
      removeElement(this._noFilmsMessageView);
    }

    removeElement(this._sortView);

    const container = this._filmListView.getElement();

    this._noFilmsMessageView = new NoFilmsMessage(EmptyListMessages[this._model.activeFilter]);

    render(container, this._noFilmsMessageView.getElement(), RenderPosition.AFTERBEGIN);
  }

  _renderLoadMoreButton() {
    if(this._showMoreButton) {
      removeElement(this._showMoreButton);
    }

    if (this._showFilmsCount >= this._model.films.length) {
      return;
    }

    this._showMoreButton = new ShowMoreButton();

    render(this._filmListView.getElement(), this._showMoreButton.getElement(), RenderPosition.BEFOREEND);

    this._showMoreButton.handleShowMore = this._handleLoadMoreFilms;
  }

  _handleLoadMoreFilms() {
    const prevFilmsCount = this._showFilmsCount;
    const films = this._model.films;

    this._showFilmsCount = this._showFilmsCount + FILMS_COUNT_PER_STEP;

    const chunckFilmList = films.slice(prevFilmsCount, this._showFilmsCount);


    this._renderFilms(chunckFilmList);

    if (this._showFilmsCount >= films.length) {
      removeElement(this._showMoreButton);
    }
  }

  _destroyOpenPopupDetails() {
    if(this._filmDetailsPresenters.has(this._filmDetailsPresenter)) {
      this._filmDetailsPresenters.forEach((it) => it.destroy());

      this._filmDetailsPresenters.delete(this._filmDetailsPresenter);
      this._filmDetailsPresenter = null;
    }
  }

  _renderFilmDetailsPopup(film) {
    this._destroyOpenPopupDetails();

    this._api
      .getComments(film.id)
      .then((comments) => {
        this._model.commentsList = comments;

        const data = { ...film, comments };
        this._createFilmsDetailsPresenter(data);
      })
      .catch(() => {
        const data = { ...film, comments: [] };
        this._createFilmsDetailsPresenter(data);
      });
  }

  _createFilmsDetailsPresenter(data) {
    this._filmDetailsPresenter = new FilmDetailsPresenter(this._model);
    this._filmDetailsPresenters.add(this._filmDetailsPresenter);
    this._filmDetailsPresenter.render(data);
  }

  destroy() {
    super.destroy();

    this._showFilmsCount = FILMS_COUNT_PER_STEP;

    this._removeFilms();
    this._removeMostCommentedFilms();
    this._removeTopRatedFilms();
    removeElement(this._containerView);
    removeElement(this._sortView);
  }
}
