import Component from './components';

const sectionTemplate = '<section class="films"></section>';

export default class FilmSection extends Component {
  getTemplate() {
    return sectionTemplate;
  }
}
