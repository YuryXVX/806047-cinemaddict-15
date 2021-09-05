import { KeyCode } from '../const';
import { isMac } from '../utils/helpers';
import Component from './component';

const createNewCommentTemplate = (emoji, isDisabledForm = false, isErrorState = false) => (
  `<div class="${isErrorState ? 'shake film-details__new-comment' : 'film-details__new-comment'}">
    <div class="film-details__add-emoji-label">
      ${emoji ? `<img src="images/emoji/${emoji}.png" width="55" height="55" alt="emoji-smile">`: ''}
    </div>

    <label class="film-details__comment-label">
      <textarea ${isDisabledForm ? 'disabled' : ''} class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment">Great movie!</textarea>
    </label>

    <div class="film-details__emoji-list">
      <input ${isDisabledForm ? 'disabled' : ''} class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
      <label class="film-details__emoji-label" for="emoji-smile">
        <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
      </label>

      <input ${isDisabledForm ? 'disabled' : ''} class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
      <label class="film-details__emoji-label" for="emoji-sleeping">
        <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
      </label>

      <input ${isDisabledForm ? 'disabled' : ''} class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
      <label class="film-details__emoji-label" for="emoji-puke">
        <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
      </label>

      <input ${isDisabledForm ? 'disabled' : ''} class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
      <label class="film-details__emoji-label" for="emoji-angry">
        <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
      </label>
    </div>
  </div>`
);

export default class FilmDetailsNewCommentView extends Component {
  constructor() {
    super();

    this._isErrorState = false;
    this._isDisabledForm = false;

    this._emoji = null;
    this._text = null;

    this._handleChangeEmoji = this._handleChangeEmoji.bind(this);
    this._handleCommentTextField = this._handleCommentTextField.bind(this);
    this._handleWindowKeyDown = this._handleWindowKeyDown.bind(this);

    this.handleCreateComment = null;
    this._submitComment = this._submitComment.bind(this);

    this._refToEmojiListElement = null;
    this._refToInputElement = null;
  }

  get errorState() {
    return this._isErrorState;
  }

  set errorState(newValue) {
    this._isErrorState = newValue;

    this.updateComponent();
  }

  get disabledForm() {
    return this._isDisabledForm;
  }

  set disabledForm(newValue) {
    this._isDisabledForm = newValue;

    this.updateComponent();
  }

  get emoji() {
    return this._emoji;
  }

  set emoji(newValue) {
    this._emoji = newValue;
    this.updateComponent();
  }

  get comment() {
    return {
      emotion: this._emoji,
      comment: this._text,
    };
  }

  _clearErrorState() {
    if(this.errorState) {
      setTimeout(() => this.errorState = false, 1000);
    }
  }

  getTemplate() {
    this._clearErrorState();

    return createNewCommentTemplate(this._emoji, this._isDisabledForm, this._isErrorState);
  }

  _setCheckedStateInRadionButton() {
    const foundRadioElement = [...this._refToEmojiListElement].find((el) => el.id === this._radioElement.id);
    foundRadioElement.checked = true;
  }

  _saveDataWhenUpdatingComponent() {
    this._refToInputElement.value = this._text;
    this._refToEmojiListElement.value = this._emoji;

    this._setCheckedStateInRadionButton();
  }

  updateComponent() {
    super.updateComponent();
    this._saveDataWhenUpdatingComponent();
  }

  _handleChangeEmoji({ target }) {
    this._radioElement = target;
    this.emoji = this._radioElement.value;
  }

  _dispathCreateCommentEvent() {
    this.element.dispatchEvent(new Event('submit-comment'));
  }

  _handleWindowKeyDown(evt) {
    const {code, ctrlKey, metaKey} = evt;

    if(isMac()) {
      if(code === KeyCode.ENTER && metaKey) {
        return this._dispathCreateCommentEvent();
      }
    } else {
      if (code === KeyCode.ENTER && ctrlKey) {
        return this._dispathCreateCommentEvent();
      }
    }
  }

  _submitComment() {
    if(!this._text || !this._emoji) {
      return;
    }

    this.handleCreateComment(this.comment);
  }


  _handleCommentTextField() {
    this._text = this._refToInputElement.value;
  }

  _selectedElements() {
    if(this.element) {
      this._refToEmojiListElement = this.element.querySelectorAll('.film-details__emoji-item');
      this._refToInputElement = this.element.querySelector('.film-details__comment-input');
    }

    return {
      emojiList: this._refToEmojiListElement,
      textarea: this._refToInputElement,
    };
  }


  _addEventListeners() {
    const { emojiList, textarea } = this._selectedElements();

    window.addEventListener('keydown', this._handleWindowKeyDown);

    emojiList.forEach((emoji) => {
      emoji.addEventListener('change', this._handleChangeEmoji);
    });

    textarea.addEventListener('input', this._handleCommentTextField);

    this.element.addEventListener('submit-comment', this._submitComment);
  }

  _removeEventListeners() {
    const { emojiList, textarea } = this._selectedElements();

    window.removeEventListener('keydown', this._handleWindowKeyDown);

    emojiList.forEach((emoji) => {
      emoji.removeEventListener('change', this._handleChangeEmoji);
    });

    textarea.removeEventListener('input', this._handleCommentTextField);

    this.element.removeEventListener('submit-comment', this._submitComment);
  }
}
