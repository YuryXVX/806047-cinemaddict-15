import { EmojiMap } from '../const';
import { formatDuration } from '../utils/date';
import Component from './component';
import he from 'he';

const cretateCommentTemplate = (data, isDisabledDeleteButton = false, isErrorState = false) => {
  const { author, comment, date, emotion } = data;

  return (
    `<li class="${isErrorState ? 'shake film-details__comment' :'film-details__comment'}">
      <span class="film-details__comment-emoji">
        <img src="${EmojiMap[emotion]}" width="55" height="55" alt="emoji-smile">
      </span>
      <div>
        <p class="film-details__comment-text">${ he.decode(comment) }</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${ author }</span>
          <span class="film-details__comment-day">${ formatDuration(date) }</span>
          <button ${isDisabledDeleteButton ? 'disabled' : ''} class="film-details__comment-delete">${isDisabledDeleteButton ? 'Deleting...' : 'Delete'}</button>
        </p>
      </div>
    </li>`
  );
};


export default class FilmsDetailsCommentList extends Component {
  constructor(data) {
    super();

    this._data = data;
    this._isDisabledDeleteButton = false;
    this._isErrorState = false;

    this.handleDeleteComment = null;


    this._handleDeleteComment = this._handleDeleteComment.bind(this);
  }

  _clearErrorState() {
    if(this.errorState) {
      setTimeout(() => this.errorState = false, 1000);
    }
  }

  get errorState() {
    return this._isErrorState;
  }

  set errorState(newValue) {
    this._isErrorState = newValue;

    this.updateComponent();
  }

  get isDisabledDeleteButton() {
    return this._isDisabledDeleteButton;
  }

  set isDisabledDeleteButton(newValue) {
    this._isDisabledDeleteButton = newValue;

    if(this.element) {
      this.updateComponent();
    }
  }

  _handleDeleteComment() {
    this.handleDeleteComment(this._data);
  }

  get id() {
    return this._data.id;
  }

  _addEventListeners() {
    this.element.querySelector('.film-details__comment-delete').addEventListener('click', this._handleDeleteComment);
  }

  _removeEventListeners() {
    this.element.querySelector('.film-details__comment-delete').removeEventListener('click', this._handleDeleteComment);
  }

  getTemplate() {
    this._clearErrorState();
    return cretateCommentTemplate(this._data, this.isDisabledDeleteButton, this.errorState);
  }
}
