import { classListRemove, deepClone } from '../utils/helpers';
import { removeElement, render, RenderPosition } from '../utils/render';

// presenter
import RootPresenter from './root-presenter';

// views
import FilmDetails from '../views/film-details';
import FilmDetailsControls from '../views/films-details-controls';
import FilmDetailsNewCommentView from '../views/film-details-new-comment';
import FilmsDetailsComment from '../views/film-details-comment';
import FilmDetailsCommentList from '../views/film-details-list';

// adapters
import Comment from '../adapters/comment';
import Film, { toRawFilmModel } from '../adapters/film';

export default class FilmDetailsPresenter extends RootPresenter {
  constructor(store, api) {
    super(store, api);
    this._detailsView = null;
    this._detailsControls = null;
    this._detailsNewCommentView = null;
    this._detailsCommnentViews = null;
    this._detailsCommnentContainerView = new FilmDetailsCommentList();

    this._id = null;

    this._data = null;
    this._newData = null;

    this._handleClosePopupKeyDown = this._handleClosePopupKeyDown.bind(this);
    this._handleClosePopup = this._handleClosePopup.bind(this);

    this._handleWatchListButton = this._handleWatchListButton.bind(this);
    this._handleHistoryListButton = this._handleHistoryListButton.bind(this);
    this._handleFavoriteListButton = this._handleFavoriteListButton.bind(this);
    this._handleDeleteComment = this._handleDeleteComment.bind(this);

    this._handleCreateComment = this._handleCreateComment.bind(this);
    this._handleModalChangeData = this._handleModalChangeData.bind(this);

    this._model.addCommentsChangeListener(this._handleModalChangeData);
  }

  _handleModalChangeData(data) {
    const newData = data.films.find((it) => it.id === this.modalId);

    this._data = {
      ...newData,
      comments: this._model.commentsList.filter((comment) => newData.comments.includes(comment.id)),
    };


    this._updateComments(this._data.comments);
    this._detailsView.updateCommentCountElement(this._data.comments.length);
  }


  get modalId () {
    return this._id;
  }

  _handleClosePopup() {
    this._removePopup();
  }

  _handleCreateComment(payload) {
    const newComment = new Comment(payload);

    this._detailsNewCommentView.disabledForm = true;

    this._api.createComment(this.modalId, newComment)
      .then((res) => {
        this._model.createComment(this.modalId, res);
        this._detailsNewCommentView.disabledForm = false;
      })
      .catch(() => {
        this._detailsNewCommentView.errorState = true;
      })
      .finally(() => {
        this._detailsNewCommentView.disabledForm = false;
      });
  }

  _removePopup() {
    document.removeEventListener('keyup', this._handleClosePopupKeyDown);
    this._model.removeCommentsChangeListener(this._handleModalChangeData);

    classListRemove(document.body, 'hide-overflow');

    if(this._detailsView) {
      removeElement(this._detailsView);
      removeElement(this._detailsNewCommentView);
      removeElement(this._detailsControls);

      this._detailsView = null;
      this._detailsControls = null;
      this._detailsNewCommentView = null;
    }
  }

  _handleClosePopupKeyDown(evt) {
    const isEscKey = evt.key === 'Escape' || evt.key === 'Esc';

    if(isEscKey) {
      this._removePopup();
    }
  }

  destroy() {
    this._removePopup();
  }

  _updateFilmsDetailsData(newData) {
    this._data = newData;
    this._detailsControls.data = newData;
  }

  _handleWatchListButton() {
    const newData = deepClone(this._data);
    newData.filmDetails.watchlist = !newData.filmDetails.watchlist;

    this._api.updateFilm(this._data.id, new Film(toRawFilmModel(newData)))
      .then((films) => {
        this._model.updateFilm(this._data, films);
        this._updateFilmsDetailsData(films);
      });
  }

  _handleFavoriteListButton() {
    const newData = deepClone(this._data);
    newData.filmDetails.favorite = !newData.filmDetails.favorite;

    this._api.updateFilm(this._data.id, new Film(toRawFilmModel(newData)))
      .then((films) => {
        this._model.updateFilm(this._data, films);
        this._updateFilmsDetailsData(films);
      });
  }

  _handleHistoryListButton() {
    const newData = deepClone(this._data);
    newData.filmDetails.history = !newData.filmDetails.history;

    this._api.updateFilm(this._data.id, new Film(toRawFilmModel(newData)))
      .then((films) => {
        this._model.updateFilm(this._data, films);
        this._updateFilmsDetailsData(films);
      });
  }

  _handleDeleteComment(data) {
    const commentView = this._detailsCommnentViews.find((view) => view.id === data.id);

    commentView.isDisabledDeleteButton = true;

    this._api.deleteComment(this.modalId, data.id)
      .then(() => {
        this._model.deleteComment(this.modalId, data.id);
      })
      .catch(() => {
        commentView.errorState = true;
      })
      .finally(() => {
        commentView.isDisabledDeleteButton = false;
      });
  }


  _removeCommentList() {
    this._detailsCommnentViews.forEach((filmView) => filmView.destroyElement());
  }

  _updateComments(comments) {
    this._removeCommentList();
    this._renderCommnents(comments);
  }

  _renderCommnents(comments) {
    this._detailsCommnentViews = comments.map((comment) => {
      const commentView = new FilmsDetailsComment(comment, this._handleDeleteComment);
      commentView.handleDeleteComment = this._handleDeleteComment;
      render(this._detailsCommnentContainerView.element, commentView.getElement(), RenderPosition.BEFOREEND);
      return commentView;
    });
  }

  render(data) {
    this._data = data;
    this._id = data.id;

    this._detailsView = new FilmDetails(data, this._handleClosePopup);
    this._detailsControls = new FilmDetailsControls(data);
    this._detailsNewCommentView = new FilmDetailsNewCommentView();

    document.addEventListener('keyup', this._handleClosePopupKeyDown);

    render(this._detailsView.filmListDetailsContainer, this._detailsControls.getElement(), RenderPosition.BEFOREEND);
    render(this._detailsView.filmsDetailsCommentWrap, this._detailsCommnentContainerView.element, RenderPosition.BEFOREEND);
    render(this._detailsView.filmsDetailsCommentWrap, this._detailsNewCommentView.getElement(), RenderPosition.BEFOREEND);

    this._detailsControls.handleWatchListButton = this._handleWatchListButton;
    this._detailsControls.handleHistoryListButton = this._handleHistoryListButton;
    this._detailsControls.handleFavoriteListButton = this._handleFavoriteListButton;
    this._detailsNewCommentView.handleCreateComment = this._handleCreateComment;

    this._renderCommnents(data.comments);

    render(document.body, this._detailsView.getElement(), RenderPosition.BEFOREEND);
  }
}
