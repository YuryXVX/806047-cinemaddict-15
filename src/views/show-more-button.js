import Component from './components';

const showMoreButtonTemplate = '<button class="films-list__show-more">Show more</button>';

export default class ShowMoreButton extends Component {
  getTemplate() {
    return showMoreButtonTemplate;
  }

  setShowMoreButtonClickHandler(handler) {
    this.getElement().addEventListener('click', (evt) => {
      evt.preventDefault();
      handler();
    });
  }
}

