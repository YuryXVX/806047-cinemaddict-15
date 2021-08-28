import { FILMS_COUNT_PER_STEP, ModeView, SortType } from '../const';
import { render, RenderPosition, removeElement } from '../utils/render';
import { getFilmPresenters } from './film';
import { RootPresenter } from './root-presenter';

// views
import Container from '../views/container';
import NoFilmsMessage from '../views/no-films-message';
import Sort from '../views/sort';
import ShowMoreButton from '../views/show-more-button';

// presenter
import FilmDetailsPresenter from './film-details';

export default class FilmListPresenter extends RootPresenter {
  constructor(store, handleRaitingChange, handleFiltersCountChange) {
    super(store);

    this._container = null;
    this._filterComponentRef = null;

    this._containerView = new Container({classList: ['films']});
    this._filmListView = new Container({ title: 'All movies. Upcoming', classList: ['films-list'] });
    this._filmListContainerView = new Container({ tag: 'div', classList: ['films-list__container'] });
    this._sortView = null;
    this._noFilmsMessageView = null;

    this._filmsPresenters = [];
    this._filmDetailsPresenter = null;
    this._filmDetailsPresenters = new Set();

    this._handleDataChange = this._handleDataChange.bind(this);
    this._handleRenderFilmDetailsPopup = this._renderFilmDetailsPopup.bind(this);
    this._handleChangeSortData = this._handleChangeSortData.bind(this);

    this._handleRatingChange = handleRaitingChange;
    this._handleFiltersCountChange = handleFiltersCountChange;

    this._showFilmsCount = FILMS_COUNT_PER_STEP;


    this._rerender = this.rerender.bind(this);
    this._model.addDataChangeListener(this.rerender.bind(this));
  }

  rerender({ films }) {
    this._updateViewOnChangeFilters({ films });
    this._updateFilms(FILMS_COUNT_PER_STEP);
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
    this._container = container;
    this._filterComponentRef = filters;

    this._renderSortComponent(this._model.activeSortButton);
    this._renderAllFilms();
    this._renderLoadMoreButton();
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
    this._filmsPresenters.forEach((filmPresenter) => filmPresenter.destroy());
    this._filmsPresenters = [];
  }

  _updateFilms(filmsCount) {
    this._removeFilms();
    this._renderFilms(this._model.films.slice(0, filmsCount));
    this._renderLoadMoreButton();
  }

  _renderFilms(films) {
    const container = this._filmListContainerView.getElement();

    const filmsPresenters = getFilmPresenters(container, films, this._handleDataChange, this._handleRenderFilmDetailsPopup);

    this._filmsPresenters = this._filmsPresenters.concat(filmsPresenters);
    this._showFilmsCount = this._filmsPresenters.length;
  }

  _handleDataChange(controller, oldData, newData, mode) {
    this._model.updateFilm(oldData, newData);

    if(mode === ModeView.MODAL) {
      controller.setData(newData);
    } else {
      controller.render(newData);
    }

    this._updateFilms(this._showFilmsCount);
    this._handleRatingChange(this._model.films);
    this._handleFiltersCountChange(this._model.films);

    if(!this._model.films.length) {
      this._renderNoFilmsMessage();
    }
  }

  _renderNoFilmsMessage() {
    if(this._noFilmsMessageView) {
      removeElement(this._noFilmsMessageView);
    }

    removeElement(this._sortView);

    const container = this._filmListView.getElement();

    this._noFilmsMessageView = new NoFilmsMessage();
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

    this._showMoreButton.setShowMoreButtonClickHandler(this._onLoadMoreButtonClick.bind(this));
  }

  _onLoadMoreButtonClick() {
    this._model.filters = 'some';
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

    this._filmDetailsPresenter = new FilmDetailsPresenter(this._model, this._handleDataChange);
    this._filmDetailsPresenters.add(this._filmDetailsPresenter);
    this._filmDetailsPresenter.render(film);
  }

  destroy() {
    this._showFilmsCount = FILMS_COUNT_PER_STEP;

    this._model.removeDataChangeListener(this._rerender);

    this._removeFilms();
    removeElement(this._containerView);
    removeElement(this._sortView);
  }
}
