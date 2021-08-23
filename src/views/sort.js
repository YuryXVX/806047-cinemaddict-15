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

export default class SortView extends Component {
  constructor(activeButton = SortType.DEFAULT) {
    super();

    this._activeButton = activeButton;

    this.handleChangeSort = null;
    this._handleChangeSortItem = this._handleChangeSortItem.bind(this);
  }

  _handleChangeSortItem(evt) {
    evt.preventDefault();

    const button = evt.target.closest('[data-sort]');

    if(button) {
      this.handleChangeSort(button.dataset.sort);
    }
  }

  _addEventListeners() {
    this.element.addEventListener('click', this._handleChangeSortItem);
  }

  _removeEventListeners() {
    this.element.removeEventListener('click', this._handleChangeSortItem);
  }

  get activeButton() {
    return this._activeButton;
  }

  set activeButton(value) {
    this._activeButton = value;
    this.updateComponent();
  }

  getTemplate() {
    return createSortTemplate(this.activeButton);
  }
}

