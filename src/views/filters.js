import { FilterType } from '../const';
import Component from './component';

const createFilterButtonTemplate = (active, filterItem) => {
  const { name, count } = filterItem;

  const [keys] = Object.entries(FilterType).find((filter) => {
    const [, value] = filter;
    return value === name;
  });

  const countSpan = name === FilterType.ALL ? '' : `<span class="main-navigation__item-count">${count}</span>`;
  const isActiveClass = name === FilterType[active] ? 'main-navigation__item main-navigation__item--active' : 'main-navigation__item';

  return (
    `<a href="#watchlist" class="${isActiveClass}" data-filter="${keys}">${name} ${countSpan}</a>`
  );
};

const createFilterButtonListTemplate = (active, filters) => (
  `<nav class="main-navigation">
    <div class="main-navigation__items">
      ${ filters.map((it) => createFilterButtonTemplate(active, it)).join(' ') }
    </div>
    <a href="#stats" class="${active === 'STATISTIC' ? 'main-navigation__additional main-navigation__item--active' : 'main-navigation__additional' }">Stats</a>
  </nav>`
);

export default class FiltersView extends Component {
  constructor(active = FilterType.ALL, filters = []) {
    super();

    this._active = active;
    this._filters = filters;

    this.handleChangeFilter = null;
    this.handleChangeView = null;

    this._handleChangeView = this._handleChangeView.bind(this);
    this._handleChangeFilter = this._handleChangeFilter.bind(this);
  }

  get filters() {
    return this._filters;
  }

  set filters(newValue) {
    this._filters = newValue;
    this.updateComponent();
  }

  set activeFilter(newValue) {
    this._active = newValue;
    this.updateComponent();
  }

  get activeFilter() {
    return this._active;
  }

  _handleChangeFilter(evt) {
    evt.preventDefault();

    const button = evt.target.closest('[data-filter]');
    if(button) {
      const { dataset: { filter } } = button;
      this.handleChangeFilter(filter);
    }
  }

  _handleChangeView(evt) {
    evt.preventDefault();
    this.handleChangeView();
  }

  getTemplate() {
    return createFilterButtonListTemplate(this._active, this._filters);
  }

  _addEventListeners() {
    this.element.querySelector('.main-navigation__items').addEventListener('click', this._handleChangeFilter);
    this.element.querySelector('.main-navigation__additional').addEventListener('click', this._handleChangeView);
  }

  _removeEventListeners() {
    this.element.querySelector('.main-navigation__items').addEventListener('click', this._handleChangeFilter);
  }
}
