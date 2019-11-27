import List from './lib/list';

document.addEventListener('DOMContentLoaded', () => {
  const page = document.querySelector('body');
  const isLecturePage = page.classList.contains('lecture-page');

  if (isLecturePage) {

  } else {
    const list = new List();
    list.load();
  }
});

fetch("./lectures.json")
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    console.log(data.slug);
  })
