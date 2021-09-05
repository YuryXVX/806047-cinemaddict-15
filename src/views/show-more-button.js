import Component from './component';

const showMoreButtonTemplate = '<button class="films-list__show-more">Show more</button>';

export default class ShowMoreButtonView extends Component {
  constructor() {
    super();

    this.handleShowMore = null;
    this._handleShowMore = this._handleShowMore.bind(this);
  }

  _handleShowMore() {
    this.handleShowMore();
  }

  _addEventListeners() {
    this.element.addEventListener('click', this._handleShowMore);
  }

  _removeEventListeners() {
    this.element.removeEventListener('click', this._handleShowMore);
  }

  getTemplate() {
    return showMoreButtonTemplate;
  }
}

