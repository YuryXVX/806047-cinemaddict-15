import { filmDurationCovert } from '../utils/date';
import Component from './component';

const createStatisticTemplate = ({ rank, data: {watchedFilmsCount, totalDutation}, topGanre }) => {
  const [hour, minute] = filmDurationCovert(totalDutation).split(' ');

  return (`<section class="statistic">
     <p class="statistic__rank">
      Your rank
      <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
      <span class="statistic__rank-label">${rank}</span>
    </p>

    <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
      <p class="statistic__filters-description">Show stats:</p>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-all-time" value="all-time" checked>
      <label for="statistic-all-time" class="statistic__filters-label">All time</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-today" value="today">
      <label for="statistic-today" class="statistic__filters-label">Today</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-week" value="week">
      <label for="statistic-week" class="statistic__filters-label">Week</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-month" value="month">
      <label for="statistic-month" class="statistic__filters-label">Month</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-year" value="year">
      <label for="statistic-year" class="statistic__filters-label">Year</label>
    </form>

    <ul class="statistic__text-list">
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">You watched</h4>
        <p class="statistic__item-text">${watchedFilmsCount} <span class="statistic__item-description">movies</span></p>
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">Total duration</h4>
        <p class="statistic__item-text">${hour} ${minute}</p>
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">Top genre</h4>
        <p class="statistic__item-text">${topGanre ? topGanre : ''}</p>
      </li>
    </ul>

    <div class="statistic__chart-wrap">
      <canvas class="statistic__chart" width="1000"></canvas>
    </div>

  </section>
</main>`);
};

export default class StatisticView extends Component {
  constructor(data) {
    super();
    this._data = data;
    this._rank = null;

    this._refToFormElements = null;

    this.handleChangeStatisctic = null;

    this._handleChangePeriodStatics = this._handleChangePeriodStatics.bind(this);
  }

  get data() {
    return this._data;
  }

  get rank() {
    return this._rank;
  }

  set rank(newData) {
    this._rank = newData;
  }

  set data(newData) {
    this._data = newData;

    this.updateComponent();
  }


  _setCheckedStateFormInElement() {
    const findedRadioElement = [...this._refToFormElements].find((el) => el.id === this._formElement.id);
    findedRadioElement.checked = true;
  }

  updateComponent() {
    super.updateComponent();

    this._setCheckedStateFormInElement();
  }

  _selectedElements() {
    this._refToFormElements = this.element.querySelectorAll('.statistic__filters-input');
    return { inputs: this._refToFormElements };
  }

  _handleChangePeriodStatics(evt) {
    this._formElement = evt.target;
    this.handleChangeStatisctic(evt.target.value);
  }

  _addEventListeners() {
    const { inputs } = this._selectedElements();

    inputs.forEach((element) => {
      element.addEventListener('change', this._handleChangePeriodStatics);
    });
  }

  _removeEventListeners() {
    const { inputs } = this._selectedElements();

    inputs.forEach((element) => {
      element.removeEventListener('change', this._handleChangePeriodStatics);
    });
  }

  get canvasContext() {
    return this.element.querySelector('.statistic__chart');
  }

  getTemplate() {
    return createStatisticTemplate({data: this.data, rank: this._rank, topGanre: this.data.getTopGanre });
  }
}
