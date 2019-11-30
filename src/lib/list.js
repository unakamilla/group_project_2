import { el, empty } from './helpers';

export default class List {
  constructor() {
    this.container = document.querySelector('.lectures');
    this.buttons = document.querySelectorAll('.buttons__button');
  }

  makeTiles() { // sækir alla fyrirlestrana og skilar sem json hlut
    const cont = this.container;
    return fetch('../lectures.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error('fetch virkar ekki');
        }
        return response.json();
      })
      .then((data) => {
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
      });
  }

  filterLectures(data) { // býr til lista af fyrirlestrum með sama category og button sem var valinn
    const clickedButtons = Array.from(this.buttons)
      .filter(i => i.classList.contains('buttons__button--clicked'))
      .map(i => i.dataset.category);
    console.log(clickedButtons);
    // return data.filter(i => clickedButtons.indexOf(i.category) >= 0
    // || i => i.clickedButtons.length === 0);
  }

  // toggleButton(e) { // virkjar button sem smellt er á
  //   const { target } = e;
  //   target.classList.toggle('buttons__button--clicked');
  //
  //   this.getTiles()
  //     .then(data => this.filterLectures())
  //     .then(data => this.makeTiles());
  // }

  buttonClicker() { // hlustar eftir click
    this.buttons.forEach((button) => {
      button.addEventListener('click', this.toggleButton);
    });
  }

  load() { // býr til forsíðuna
    empty(this.container);
    this.makeTiles();
    this.buttonClicker();
  }
}
