import SimpleLightbox from 'simplelightbox';

const galleryEl = document.querySelector('#gallery');
const loaderEl = document.querySelector('#loader');
const loadMoreBtn = document.querySelector('#load-more');

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250
});

export function createGallery(images) {
  if (!Array.isArray(images) || images.length === 0) return;

  const frag = document.createDocumentFragment();

  for (let i = 0; i < images.length; i += 1) {
    const it = images[i];

    const li = document.createElement('li');
    li.className = 'photo-card';

    const a = document.createElement('a');
    a.setAttribute('href', it.largeImageURL);

    const img = document.createElement('img');
    img.setAttribute('src', it.webformatURL);
    img.setAttribute('alt', escapeHtml(it.tags || ''));
    img.setAttribute('loading', 'lazy');

    a.appendChild(img);
    li.appendChild(a);

    const info = document.createElement('div');
    info.className = 'info';
    info.appendChild(makeInfoP('Likes', it.likes));
    info.appendChild(makeInfoP('Views', it.views));
    info.appendChild(makeInfoP('Comments', it.comments));
    info.appendChild(makeInfoP('Downloads', it.downloads));

    li.appendChild(info);
    frag.appendChild(li);
  }

  galleryEl.appendChild(frag);
  lightbox.refresh();
}

export function clearGallery() {
  if (galleryEl) galleryEl.innerHTML = '';
}
export function showLoader() {
  if (loaderEl) loaderEl.classList.remove('is-hidden');
}
export function hideLoader() {
  if (loaderEl) loaderEl.classList.add('is-hidden');
}
export function showLoadMoreButton() {
  if (loadMoreBtn) loadMoreBtn.classList.remove('is-hidden');
}
export function hideLoadMoreButton() {
  if (loadMoreBtn) loadMoreBtn.classList.add('is-hidden');
}
export function getFirstCardHeight() {
  const first = galleryEl ? galleryEl.querySelector('.photo-card') : null;
  return first ? first.getBoundingClientRect().height : 0;
}

export { galleryEl, loadMoreBtn };

function makeInfoP(label, value) {
  const p = document.createElement('p');
  const b = document.createElement('b');
  b.textContent = label;
  p.appendChild(b);
  p.appendChild(document.createTextNode(String(value)));
  return p;
}
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

