import Component from './components';

const getFooterStatisticTemplate = (filmCount) => (
  `<section class="footer__statistics">
    <p>${ filmCount } movies inside</p>
  </section>`
);

export default class Footer  extends Component {
  constructor(filmCount) {
    super();
    this._filmCount = filmCount;
  }

  getTemplate() {
    return getFooterStatisticTemplate(this._filmCount);
  }
}
