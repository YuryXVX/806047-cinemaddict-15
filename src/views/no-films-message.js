import Component from './component';

const noFilmsMessageTemplate = '<h2 class="films-list__title">There are no movies in our database</h2>';

export default class NoFilmsMessage extends Component {
  getTemplate() {
    return noFilmsMessageTemplate;
  }
}
