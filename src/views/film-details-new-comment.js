import { KeyCode } from '../const';
import Component from './component';

const createNewCommentTemplate = (emoji) => (
  `<div class="film-details__new-comment">
    <div class="film-details__add-emoji-label">
      <img src="images/emoji/${emoji || 'smile'}.png" width="55" height="55" alt="emoji-smile">
    </div>

    <label class="film-details__comment-label">
      <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment">Great movie!</textarea>
    </label>

    <div class="film-details__emoji-list">
      <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
      <label class="film-details__emoji-label" for="emoji-smile">
        <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
      </label>

      <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
      <label class="film-details__emoji-label" for="emoji-sleeping">
        <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
      </label>

      <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
      <label class="film-details__emoji-label" for="emoji-puke">
        <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
      </label>

      <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
      <label class="film-details__emoji-label" for="emoji-angry">
        <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
      </label>
    </div>
  </div>`
);

export default class FilmDetailsNewCommentView extends Component {
  constructor() {
    super();

    this._emoji = null;
    this._text = null;

    this._handleChangeEmoji = this._handleChangeEmoji.bind(this);
    this._handleCommentTextField = this._handleCommentTextField.bind(this);
    this._handleWindowKeyDown = this._handleWindowKeyDown.bind(this);

    this._submitComment = this._submitComment.bind(this);

    this._refToEmojiListElement = null;
    this._refToInputElement = null;
  }

  get emoji () {
    return this._emoji;
  }

  set emoji (newValue) {
    this._emoji = newValue;
    this.updateComponent();
  }

  get comment() {
    return {
      emoji: this._emoji,
      text: this._text,
    };
  }

  getTemplate() {
    return createNewCommentTemplate(this._emoji);
  }

  _setCheckedStateInRadionButton() {
    const findedRadioElement = [...this._refToEmojiListElement].find((el) => el.id === this._radioElement.id);
    findedRadioElement.checked = true;
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

  _handleWindowKeyDown(evt) {
    const {code, ctrlKey} = evt;

    if (code === KeyCode.ENTER && ctrlKey) {
      this.element.dispatchEvent(new Event('submit-comment'));
    }
  }

  _submitComment() {}


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
