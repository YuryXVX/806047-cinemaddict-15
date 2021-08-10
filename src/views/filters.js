import { FilterType } from '../const';
import Component from './component';

const createFilterButtonTemplate = (filter) => {
  const { name, count, active } = filter;

  const countSpan = name === FilterType.ALL ? '' : `<span class="main-navigation__item-count">${count}</span>`;
  const isActiveClass = active ? 'main-navigation__item main-navigation__item--active' : 'main-navigation__item';

  return (
    `<a href="#watchlist" class="${isActiveClass}" data-filter="${name}">${name} ${countSpan}</a>`
  );
};

const createFilterButtonListTemplate = (filters) => (
  `<nav class="main-navigation">
    <div class="main-navigation__items">
      ${ filters.map(createFilterButtonTemplate).join(' ') }
    </div>
    <a href="#stats" class="main-navigation__additional">Stats</a>
  </nav>`
);

export default class Filters extends Component {
  constructor(filters) {
    super();
    this._filters = filters;
  }

  getTemplate() {
    return createFilterButtonListTemplate(this._filters);
  }
}
