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
        console.log(lectures);
        for(let lecture of lectures) {
          let title = el('span');
          title.classList.add('lecture__title');
          let category = el('span');
          category.classList.add('lecture__category');
          let thumbnail = el('img');
          if (lecture.thumbnail) {
            thumbnail.setAttribute('src', lecture.thumbnail);
          } else {
            // setja gráan kassa eða eitthvað í staðinn fyrir myndina
          }
          thumbnail.classList.add('lecture__thumbnail')
          let tile = el('div', title, category, thumbnail);
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
