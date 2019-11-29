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
        const thisLecture = data.lectures.find(i => i.slug === slug);
        if (!thisLecture) {
          throw new Error('fann ekki fyrirlestur');
        }
        const header = cont.previousElementSibling;

        let category = el('h2', thisLecture.category);
        category.classList.add('lecture__category');
        category.setAttribute('id', category);
        header.appendChild(category);

        let title = el('h1', thisLecture.title);
        title.classList.add('lecture__title')
        title.setAttribute('id', title);
        header.appendChild(title);

        let thing;
        thisLecture.content.forEach((item) => {
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
        });

        let lecture = el('div', thing);
        cont.appendChild(lecture);
      })
      .catch((error) => {
        console.error('villa:', error);
      });

  }

  load() {
    empty(this.container);
    const urlslug = new URLSearchParams(window.location.search);
    const slug = urlslug.get('slug');
    this.makeLecture(slug);

  }
}
