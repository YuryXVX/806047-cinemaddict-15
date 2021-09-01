// import { ModeView } from '../const';
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
  constructor(store) {
    super(store);
    this._filmDetailsView = null;
    this._filmDetailsControls = null;
    this._filmDetailsNewCommentView = null;
    this._filmDetailsCommnentViews = null;
    this._filmDetailsCommnentListView = new FilmDetailsCommentList();

    this._id = null;

    this._data = null;
    this._newData = null;

    this._handleClosePopupKeyDown = this._handleClosePopupKeyDown.bind(this);
    this._handleClosePopup = this._handleClosePopup.bind(this);

    this._handleWatchListButton = this._handleWatchListButton.bind(this);
    this._handleHistoryListButton = this._hadleHistoryListButton.bind(this);
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
    this._filmDetailsView.updateCommentCountElement(this._data.comments.length);
  }


  get modalId () {
    return this._id;
  }

  _handleClosePopup() {
    this._removePopup();
  }

  _handleCreateComment(payload) {
    const newComment = new Comment(payload);

    this._filmDetailsNewCommentView.disabledForm = true;

    this._api.createComment(this.modalId, newComment)
      .then((res) => {
        this._model.createComment(this.modalId, res);
        this._filmDetailsNewCommentView.disabledForm = false;
      })
      .catch(() => {
        this._filmDetailsNewCommentView.errorState = true;
      })
      .finally(() => {
        this._filmDetailsNewCommentView.disabledForm = false;
      });
  }

  _removePopup() {
    document.removeEventListener('keyup', this._handleClosePopupKeyDown);
    this._model.removeCommentsChangeListener(this._handleModalChangeData);

    classListRemove(document.body, 'hide-overflow');

    if(this._filmDetailsView) {
      removeElement(this._filmDetailsView);
      removeElement(this._filmDetailsNewCommentView);
      removeElement(this._filmDetailsControls);

      this._filmDetailsView = null;
      this._filmDetailsControls = null;
      this._filmDetailsNewCommentView = null;
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
    this._filmDetailsControls.data = newData;
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

  _hadleHistoryListButton() {
    const newData = deepClone(this._data);
    newData.filmDetails.history = !newData.filmDetails.history;

    this._api.updateFilm(this._data.id, new Film(toRawFilmModel(newData)))
      .then((films) => {
        this._model.updateFilm(this._data, films);
        this._updateFilmsDetailsData(films);
      });
  }

  _handleDeleteComment(data) {
    const commentView = this._filmDetailsCommnentViews.find((view) => view.id === data.id);

    commentView.isDisabledDeleteButton = true;

    this._api.deleteComment(data.id)
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
    this._filmDetailsCommnentViews.forEach((filmView) => filmView.destroyElement());
  }

  _updateComments(comments) {
    this._removeCommentList();
    this._renderCommnents(comments);
  }

  _renderCommnents(comments) {
    this._filmDetailsCommnentViews = comments.map((comment) => {
      const commentView = new FilmsDetailsComment(comment, this._handleDeleteComment);
      commentView.handleDeleteComment = this._handleDeleteComment;
      render(this._filmDetailsCommnentListView.element, commentView.getElement(), RenderPosition.BEFOREEND);
      return commentView;
    });
  }

  render(data) {
    this._data = data;
    this._id = data.id;

    this._filmDetailsView = new FilmDetails(data, this._handleClosePopup);
    this._filmDetailsControls = new FilmDetailsControls(data);
    this._filmDetailsNewCommentView = new FilmDetailsNewCommentView();

    document.addEventListener('keyup', this._handleClosePopupKeyDown);

    render(this._filmDetailsView.filmListDetailsContainer, this._filmDetailsControls.getElement(), RenderPosition.BEFOREEND);
    render(this._filmDetailsView.filmsDetailsCommentWrap, this._filmDetailsCommnentListView.element, RenderPosition.BEFOREEND);
    render(this._filmDetailsView.filmsDetailsCommentWrap, this._filmDetailsNewCommentView.getElement(), RenderPosition.BEFOREEND);

    this._filmDetailsControls.handleWatchListButton = this._handleWatchListButton;
    this._filmDetailsControls.handleHistoryListButton = this._handleHistoryListButton;
    this._filmDetailsControls.handleFavoriteListButton = this._handleFavoriteListButton;
    this._filmDetailsNewCommentView.handleCreateComment = this._handleCreateComment;

    this._filmDetailsView.setCloseButtonClickHandler();

    this._renderCommnents(data.comments);

    render(document.body, this._filmDetailsView.getElement(), RenderPosition.BEFOREEND);
  }
}
