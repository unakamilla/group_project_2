import List from './lib/list';
import { el, empty } from './lib/helpers';
import Lecture from './lib/lecture';
import { buttonClicker } from "./lib/buttons";

document.addEventListener('DOMContentLoaded', () => {
  const page = document.querySelector('body');
  const isLecturePage = page.classList.contains('lecture-page');

  if (isLecturePage) {
    const lecture = new Lecture();
    lecture.load();
  } else {
    const list = new List();
    list.load();
  }
});