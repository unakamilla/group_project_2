import { el, empty } from './helpers';
// vantar að sjá um kláraða fyrirlestra

// tilraun:
export default class Lecture {
  constructor() {
    this.container = document.querySelector('.lecture');
    this.url = 'lectures.json'
  }

  getLectures() {
    let cont  = this.container;
    fetch("../lectures.json")
      .then(function(response) {
          if (!response.ok) {
            throw new Error('fetch virkar ekki')
          }
        })
        return response.json();
      })
  }

  loadLecture() {
    this.getLectures()
      .then(function(data) {
        let chosenSlug = // fatta ekki hvernig á að tengja linkinn
        let chosenLecture = data.lectures.;
        console.log(chosenLecture);


        let lecture = el('div', title, category, thumbnail);
        lecture.classList.add('lecture');
        cont.appendChild(lecture);
        }
      })
      .catch((error) => {
        console.error('villa:', error)
      });

  }
