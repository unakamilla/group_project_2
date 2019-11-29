import { el, empty } from './helpers';

export default class List {
  constructor() {
    this.container = document.querySelector('.lectures');
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
        /* eslint-enable */

        for (const lecture of lectures) {
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
          tile.classList.add('tile');
          tile.setAttribute('href', `../fyrirlestur.html?slug=${lecture.slug}`);
          // vantar að geyma slug einhvern veginn til að nota í lecture.js
          cont.appendChild(tile);
        }
      })
      .catch((error) => {
        console.error('villa:', error);
      });
  }

  load() {
    empty(this.container);
    this.makeTile();
  }
}
