import Component from './component';

const createContainerTemplate = ({ tag, classList, title, hiddenTitle }) => {
  const isHiddenTitleClasses = hiddenTitle ? 'films-list__title visually-hidden' : 'films-list__title';

  return (
    `<${tag} class="${classList}">
      <h2 class="${isHiddenTitleClasses}">${ title }</h2>
    </${tag}>
  `);
};

export default class Container extends Component {
  constructor({ classList, isExtra, title, tag, noHiddenTitle }) {
    super();

    this._tag = tag || 'section';
    this._classList = classList;
    this._title = title;
    this._isExtra = isExtra || false;
    this._noHiddenTitle = noHiddenTitle || false;
  }

  getTemplate() {
    const [current, extra] = this._classList;
    const classList = this._isExtra ? [extra, current].join(' ') : [current];

    return createContainerTemplate({ tag: this._tag, classList, title: this._title, hiddenTitle: !this._noHiddenTitle });
  }
}
