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
  // stuff.classList.add('thing__stuff');
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
  const bits = splitted.map((i) => {
    const p = el('p', i);
    p.classList.add('thing__text');
    return p;
  });
  return thing('text', ...bits);
}
export function list(data) {
  const item = data.map((i) => {
    const li = el('li', i);
    li.classList.add('thing__li');
    return li;
  });
  const ul = el('ul', ...item);
  ul.classList.add('thing__ul');
  return thing('list', ul);
}
export function heading(text) {
  const heading = el('h2', text);
  heading.classList.add('thing__heading');
  return thing('heading', heading);
}
export function code(code) {
  const pre = el('pre', code);
  pre.classList.add('thing__pre');
  return thing('pre', pre);

}
export function quote(text, author) {
  const quote = el('p', text);
  quote.classList.add('thing__quote');
  const auth = el('p', author);
  auth.classList.add('thing__author');
  const blockquote = el('blockquote', quote, auth);
  return thing('blockquote', blockquote);
}
export function image(src, alt) {
  const image = el('img');
  image.setAttribute('src', src);
  image.setAttribute('alt', alt);
  image.classList.add('item__image');
  const caption = el('p', alt);
  caption.classList.add('item__alt');
  const both = el('div', image, caption);
  return thing('image', both);
}
