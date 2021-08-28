import { EmojiMap } from '../const';
import { formatDuration } from '../utils/date';
import Component from './component';
import he from 'he';

const cretateCommentTemplate = (data) => {
  const { author, comment, date, emotion } = data;

  return (
    `<li class="film-details__comment">
      <span class="film-details__comment-emoji">
        <img src="${EmojiMap[emotion]}" width="55" height="55" alt="emoji-smile">
      </span>
      <div>
        <p class="film-details__comment-text">${ he.decode(comment) }</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${ author }</span>
          <span class="film-details__comment-day">${ formatDuration(date) }</span>
          <button class="film-details__comment-delete">Delete</button>
        </p>
      </div>
    </li>`
  );
};


export default class FilmsDetailsCommentList extends Component {
  constructor(data) {
    super();

    this._data = data;

    this.handleDeleteComment = null;
    this._handleDeleteComment = this._handleDeleteComment.bind(this);
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
    return cretateCommentTemplate(this._data);
  }
}
