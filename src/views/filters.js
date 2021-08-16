import { FilterType } from '../const';
import Component from './component';

const createFilterButtonTemplate = (active, filter) => {
  const { name, count } = filter;

  const [keys] = Object.entries(FilterType).find((filtertype) => {
    const [, value] = filtertype;
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
    <a href="#stats" class="main-navigation__additional">Stats</a>
  </nav>`
);

export default class Filters extends Component {
  constructor(active, filters) {
    super();

    this._active = active;
    this._filters = filters;
  }

  getTemplate() {
    return createFilterButtonListTemplate(this._active, this._filters);
  }

  setClickButtonFlilter(handler) {
    this.getElement()
      .querySelector('.main-navigation__items')
      .addEventListener('click', (evt) => {
        evt.preventDefault();

        const button = evt.target.closest('[data-filter]');
        if(button) {
          const { dataset: { filter } } = button;
          handler(filter);
        }
      });
  }
}
