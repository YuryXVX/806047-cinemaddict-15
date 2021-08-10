import Component from './component';

const createContainerTemplate = ({ tag, classList, title }) => (
  `<${tag} class="${classList}">
      <h2 class="films-list__title visually-hidden">${ title }</h2>
    </${tag}>
  `
);

export default class Container extends Component {
  constructor({ classList, isExtra, title, tag }) {
    super();

    this._tag = tag || 'section';
    this._classList = classList;
    this._title = title;
    this._isExtra = isExtra || false;
  }

  getTemplate() {
    const [ current, extra ] = this._classList;
    const classList = this._isExtra ? [extra, current].join(' ') : [current];

    return createContainerTemplate({ tag: this._tag, classList, title: this._title });
  }
}
