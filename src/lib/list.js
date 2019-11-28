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

          let title = el('span');
          title.classList.add('tile__title');
          title.innerHTML = lecture.title;

          let category = el('span');
          category.classList.add('tile__category');
          category.innerHTML = lecture.category;

          let thumbnail = el('img');
          if (lecture.thumbnail) {
            thumbnail.setAttribute('src', lecture.thumbnail);
          } else {
            // setja gráan kassa eða eitthvað í staðinn fyrir myndina
          }
          thumbnail.classList.add('tile__thumbnail');

          let tile = el('div', thumbnail, category, title);
          tile.classList.add('tile');
          tile.setAttribute('href', `${lecture.slug}`) // þetta virkar ekki
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
