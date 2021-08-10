import { toggleOverflowHiddenClass } from '../utils/helpers';
import { render, RenderPosition } from '../utils/render';

// views
import FilmCard from '../views/film-card';
import FilmDetails from '../views/film-details';

export default class Film {
  constructor(container, data) {
    this._data = data;

    this._container = container;

    this._onRenderPopup = this._renderPopup.bind(this);
    this._onRemovePopup = this._removePopup.bind(this);
    this._onEscKeyDown = this._onEscKeyDown.bind(this);

    this._filmCardView = new FilmCard(this._data);
    this._filmDetailsView = null;

    this._initListeners();
  }

  render() {
    render(this._container, this._filmCardView.getElement(), RenderPosition.BEFOREEND);
  }

  _renderPopup() {
    this._filmDetailsView = new FilmDetails(this._data, this._onRemovePopup);

    toggleOverflowHiddenClass(document.body, 'hide-overflow');

    if(this._filmDetailsView) {
      this._filmDetailsView.setCloseButtonClickHandler();
    }

    document.addEventListener('keyup', this._onEscKeyDown);

    render(document.body, this._filmDetailsView.getElement(), RenderPosition.BEFOREEND);
  }

  _removePopup() {
    document.removeEventListener('keyup', this._onEscKeyDown);

    this._filmDetailsView.removeElement();
    this._filmDetailsView = null;


    toggleOverflowHiddenClass(document.body, 'hide-overflow');
  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === 'Escape' || evt.key === 'Esc';

    if (isEscKey) {
      this._removePopup();
    }
  }

  _initListeners() {
    this._filmCardView.setPosterClickHandler(this._onRenderPopup);
    this._filmCardView.setTitleClickHandler(this._onRenderPopup);
    this._filmCardView.setCommentsLinkClickHandler(this._onRenderPopup);
  }
}

export const renderFilmCardViews = (container, films, comments) => films.map((film) => {
  const patchDataForPopup = {
    ...film,
    comments: comments.filter((comment) => film.comments.includes(comment.id)),
  };

  const filmController = new Film(container, patchDataForPopup);
  filmController.render();
  return filmController;
});
