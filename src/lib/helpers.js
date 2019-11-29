export function empty(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

export function el(name, ...children) {
  const element = document.createElement(name);

  if (Array.isArray(children)) {
    children.forEach((child) => {
      if (typeof child === 'string') {
        element.appendChild(document.createTextNode(child));
      } else if (child) {
        element.appendChild(child);
      }
    });
  }

  return element;
}

// smíða hlutina í fyrirlestur.html:
function thing(type, ...data) {
  const stuff = el('div', ...data);
  stuff.classList.add('thing__stuff');
  const allthethings = el('div', stuff);
  allthethings.classList.add('thing', `thing--${type}`);
  return allthethings;
}
export function youtube(url) {
  const iframe = el('iframe');
  iframe.classList.add('thing__iframe');
  iframe.setAttribute('src', url);
  return thing('youtube', iframe);
}
export function text(data) {
  const splitted = data.split('\n');
  for (let splitbit in splitted) {
    const p = el('p', splitbit);
    p.classList.add('thing__text');
    return p;
  }
  return thing('text', ...splitbit);
}
export function list(data) {

}
export function heading(url) {

}
export function code(url) {

}
export function quote() {

}
export function image(url) {

}
