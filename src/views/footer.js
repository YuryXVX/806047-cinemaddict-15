import Component from './component';

const createFooterTemplate = (filmCount) => (
  `<section class="footer__statistics">
    <p>${ filmCount } movies inside</p>
  </section>`
);

export default class FooterView extends Component {
  constructor(filmCount) {
    super();
    this._filmCount = filmCount;
  }

  getTemplate() {
    return createFooterTemplate(this._filmCount);
  }
}
