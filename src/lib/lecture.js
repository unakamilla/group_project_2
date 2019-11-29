import { el, empty, youtube, text, list, heading, code, quote, image } from './helpers';
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
        data = data.lectures.find(i => i.slug);
        console.log(data.slug);
        console.log(data.content);

        let title = el('span', data.title);
        title.classList.add('lecture__title')

        let category = el('span', data.category);
        category.classList.add('lecture__category');

        let thing;
        data.content.forEach((item) => {
          switch (item.type) {
            case 'youtube':
              thing = youtube(item.data);
              break;
            case 'text':
              thing = text(item.data);
              break;
            case 'list':
              thing = list(item.data);
              break;
            case 'heading':
              thing = heading(item.data);
              break;
            case 'code':
              thing = code(item.data);
              break;
            case 'quote':
              thing = quote(item.data, item.attribute);
              break;
            case 'image':
              thing = image(item.data, item.caption);
              break;
            default:
              thing = el('div', item.type);
          }
          cont.appendChild(thing);
          console.log(thing);
        });

        let lecture = el('div', thing);
        cont.appendChild(lecture);
      });
  }

  load() {
    empty(this.container);
    this.makeLecture();

  }
}
