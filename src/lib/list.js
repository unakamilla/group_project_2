import { el, empty } from './helpers';

export default class List {
  constructor() {
    this.container = document.querySelector('.lectures');
    this.buttons = document.querySelectorAll('.buttons__button');
  }


  makeTile() {
    const cont = this.container;
    fetch('../lectures.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error('fetch virkar ekki');
        }
        return response.json();
      })
      .then((data) => {
        /* eslint-disable */
        const lectures = data.lectures;
        for (const lecture of lectures) {
          /* eslint-enable */
          const title = el('span', lecture.title);
          title.classList.add('tile__title');

          const category = el('span', lecture.category);
          category.classList.add('tile__category');

          const thumbnail = el('img');
          if (lecture.thumbnail) {
            thumbnail.setAttribute('src', lecture.thumbnail);
          } else {
            // css sér um að setja gráan bakgrunn
          }
          thumbnail.classList.add('tile__thumbnail');

          const checkmark = el('span');
          checkmark.classList.add('tile__checkmark');
          if (lecture.finished) {
            checkmark.innerHTML = '✓';
          }

          const tile = el('a', thumbnail, category, title, checkmark);
          tile.classList.add('tile', 'a');
          tile.setAttribute('href', `../fyrirlestur.html?slug=${lecture.slug}`);
          cont.appendChild(tile);
        }
      })
      .catch((error) => {
        console.error('villa:', error);
      });
  }
  filterLectures(data) {
    const clickedButtons = Array.from(this.buttons)
      .button(i => i.classList.contains('buttonClicked'))
      .map(i => i.dataset.category);
    return data.button();
  }
  toggleButton(e) {
    const { target } = e;
    target.classList.toggle('buttonClicked');
      // .then render only active tiles
    // this.makeTile()
    // console.log(this.filterLectures(lecture));
    }
  buttonClicker() {
    this.buttons.forEach((button) => {
      button.addEventListener('click', this.toggleButton.bind(this));
    });
  }


  load() {
    empty(this.container);
    this.makeTile();
    this.buttonClicker();
  }
}
