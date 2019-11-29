import { el, empty } from './helpers';

export default class List {
  constructor() {
    this.container = document.querySelector('.lectures');
  }


  makeTile() {
    let cont  = this.container;
    fetch("../lectures.json")
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        let lectures = data.lectures;
        let clicked;
        console.log(lectures);
        for(let lecture of lectures) {

          let title = el('span', lecture.title);
          title.classList.add('tile__title');

          let category = el('span', lecture.category);
          category.classList.add('tile__category');

          let thumbnail = el('img');
          if (lecture.thumbnail) {
            thumbnail.setAttribute('src', lecture.thumbnail);
          } else {
            // css sér um að setja gráan bakgrunn
          }
          thumbnail.classList.add('tile__thumbnail');

          let checkmark = el('span');
          checkmark.classList.add('tile__checkmark');
          if (lecture.finished) {
            checkmark.innerHTML = "✓"
          }

          let tile = el('a', thumbnail, category, title, checkmark);
          tile.classList.add('tile');
          tile.setAttribute('href', `../fyrirlestur.html`) // virkar
          // vantar að geyma slug einhvern veginn til að nota í lecture.js
          cont.appendChild(tile);
        }
      })
      .catch((error) => {
        console.error('villa:', error)
      });

  }

  load() {
    empty(this.container);
    this.makeTile();
  }
}
