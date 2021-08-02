import { FilterType } from '../const';
import { createElement } from '../utils/render';

const FILTER_BUTTON = (filter) => {
  const { name, count, active } = filter;

  const countSpan = name === FilterType.ALL ? '' : `<span class="main-navigation__item-count">${count}</span>`;
  const isActiveClass = active ? 'main-navigation__item main-navigation__item--active' : 'main-navigation__item';

  return `<a href="#watchlist" class="${isActiveClass}" data-filter="${name}">${name} ${countSpan}</a>`;
};

const FILTERS_TEMPLATE = (filters) => `<nav class="main-navigation">
    <div class="main-navigation__items">
      ${ filters.map((filter) => FILTER_BUTTON(filter)).join(' ') }
    </div>
    <a href="#stats" class="main-navigation__additional">Stats</a>
  </nav>`;

export const filtersTemplate = (filters) => createElement(FILTERS_TEMPLATE(filters));
