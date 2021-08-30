import Component from './component';

const createFooterTemplate = (filmCount) => (
  `<section class="footer__statistics">
    <p>${ filmCount } movies inside</p>
  </section>`
);

export default class FooterView extends Component {
  constructor(filmCount) {
    super();
    this._filmsCount = filmCount;
  }

  get filmsCount() {
    return this._filmsCount;
  }

  set filmsCount(newValue) {
    this._filmsCount = newValue;

    this.updateComponent();
  }

  getTemplate() {
    return createFooterTemplate(this._filmsCount);
  }
}
