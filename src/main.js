import SimpleLightbox from 'simplelightbox';

const galleryEl = document.querySelector('#gallery');
const loaderEl = document.querySelector('#loader');
const loadMoreBtn = document.querySelector('#load-more');

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

export function createGallery(images) {
  if (!Array.isArray(images) || images.length === 0) return;

  const fragment = document.createDocumentFragment();

  for (let i = 0; i < images.length; i += 1) {
    const item = images[i];

    const li = document.createElement('li');
    li.className = 'photo-card';

    const link = document.createElement('a');
    link.setAttribute('href', item.largeImageURL);

    const img = document.createElement('img');
    img.setAttribute('src', item.webformatURL);
    img.setAttribute('alt', escapeHtml(item.tags || ''));
    img.setAttribute('loading', 'lazy');

    link.appendChild(img);
    li.appendChild(link);

    const info = document.createElement('div');
    info.className = 'info';

    info.appendChild(makeInfoP('Likes', item.likes));
    info.appendChild(makeInfoP('Views', item.views));
    info.appendChild(makeInfoP('Comments', item.comments));
    info.appendChild(makeInfoP('Downloads', item.downloads));

    li.appendChild(info);
    fragment.appendChild(li);
  }

  galleryEl.appendChild(fragment);
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
  const firstCard = galleryEl ? galleryEl.querySelector('.photo-card') : null;
  return firstCard ? firstCard.getBoundingClientRect().height : 0;
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


