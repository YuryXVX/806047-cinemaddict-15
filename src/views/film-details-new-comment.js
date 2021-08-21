import Component from './component';

const createNewCommentTemplate = (emoji) => (
  `<div class="film-details__new-comment">
    <div class="film-details__add-emoji-label">
      <img src="images/emoji/${emoji}.png" width="55" height="55" alt="emoji-smile">
    </div>

    <label class="film-details__comment-label">
      <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment">Great movie!</textarea>
    </label>

    <div class="film-details__emoji-list">
      <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile" checked>
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

const INITIAL_EMOJI = 'smile';

export default class FilmDetailsNewCommentView extends Component {
  constructor() {
    super();

    this._currentEmoji = INITIAL_EMOJI;
    this._text = null;

    this._handleChageEmoji = this._handleChageEmoji.bind(this);
  }

  get emoji () {
    return this._currentEmoji;
  }

  updateComponent() {
    super.updateComponent();
  }

  set emoji (newValue) {
    this._currentEmoji = newValue;

    this.updateComponent();
  }

  getTemplate() {
    return createNewCommentTemplate(this._currentEmoji);
  }

  _handleChageEmoji(evt) {
    const { target: { value }} = evt;
    this.emoji = value;
  }

  _addEventListeners() {
    this.element.querySelectorAll('.film-details__emoji-item')
      .forEach((emoji) => {
        emoji.addEventListener('change', this._handleChageEmoji);
      });
  }
}
