// sækja hjálparföll
import { el, empty } from './helpers';
// vantar að sjá um kláraða fyrirlestra

export default class Lecture {
  constructor() {
    this.container = document.querySelector('.lecture');
    this.url = 'lectures.json'
  }

  getLecture(slug) {
    return fetch(this.url)
      .then((response) => {
        if (!response.ok) {
          throw new Error('fetch virkar ekki')
        }
        return response.json();
      })
      .then()
  }
}
