import { el, empty } from './helpers';
// vantar að sjá um kláraða fyrirlestra

// tilraun:
export default class Lecture {
  constructor() {
    this.container = document.querySelector('.lecture');
    this.url = 'lectures.json';
  }

  makeLecture(slug) {
    let cont  = this.container;
     fetch("../lectures.json")
      .then(function(response) {
          if (!response.ok) {
            throw new Error('fetch virkar ekki')
          }
          return response.json();
      })
      .then(function(data) {
        slug = data.lectures.find(i => i.slug);
        console.log(slug);

        let title = el('span', data.title);
        title.classList.add('lecture__title')

        let category = el('span', data.category);
        category.classList.add('lecture__category');

        for (let thing in data.content) {
          switch (thing.type) {
            case 'youtube':
              thing = youtube(thing.data);
              break;
            case 'text':
              thing = text(thing.data);
              break;
            case 'list':
              thing = list(thing.data);
              break;
            case 'heading':
              thing = heading(thing.data);
              break;
            case 'code':
              thing = code(thing.data);
              break;
            case 'quote':
              thing = quote(thing.data, thing.attribute);
              break;
            case 'image':
              thing = image(thing.data, thing.caption);
              break;
            default:
              thing = el('div', thing.type);
          }

        }

        let lecture = el('div', 'placeholder');
        cont.appendChild(lecture);
      });
  }

  load() {
    empty(this.container);
    this.makeLecture();

  }
}
