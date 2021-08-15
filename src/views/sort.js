import { SortType } from '../const';
import Component from './component';


const createSortButton = (value, active) => {
  const isActiveButton = value === active ? 'sort__button sort__button--active' : 'sort__button';

  return (
    `<li><a href="#" class="${isActiveButton}" data-sort="${value}">Sort by ${value}</a></li>`
  );
};

const createSortTemplate = (active) =>(
  `<ul class="sort">
    ${ Object.values(SortType).map((sort) => createSortButton(sort, active)).join(' ')}
  </ul>`
);

export default class Sort extends Component {
  constructor(activeButton = SortType.DEFAULT) {
    super();

    this._activeButton = activeButton;

    this._handler = null;
  }

  get activeButton() {
    return this._activeButton;
  }

  set activeButton(value) {
    this._activeButton = value;
  }

  getTemplate() {
    return createSortTemplate(this.activeButton);
  }

  setSortButtonClickHandler(handler) {
    this._handler = handler;
    this.getElement().addEventListener('click', (evt) => {
      evt.preventDefault();
      const button = evt.target.closest('[data-sort]');

      if(button) {
        this._handler(button.dataset.sort);
      }
    });
  }
}

