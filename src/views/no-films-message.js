import Component from './component';

const noFilmsMessageTemplate = (text) => `<h2 class="films-list__title">${text}</h2>`;

export default class NoFilmsMessageView extends Component {
  constructor(text) {
    super();

    this._text = text || 'There are no movies in our database';
  }


  getTemplate() {
    return noFilmsMessageTemplate(this._text);
  }
}
