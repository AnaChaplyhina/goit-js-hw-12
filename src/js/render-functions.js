import SimpleLightbox from 'simplelightbox';

const galleryEl = document.querySelector('#gallery');
const loaderEl = document.querySelector('#loader');
const loadMoreBtn = document.querySelector('#load-more');

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

export function createGallery(images) {
  const parts = images.map(function (item) {
    const webformatURL = item.webformatURL;
    const largeImageURL = item.largeImageURL;
    const tags = escapeHtml(item.tags || '');
    const likes = item.likes;
    const views = item.views;
    const comments = item.comments;
    const downloads = item.downloads;

    return (
      '<li class="photo-card">' +
      `<a href="${largeImageURL}">` +
      `<img src="${webformatURL}" alt="${tags}" loading="lazy" />` +
      '</a>' +
      '<div class="info">' +
      `<p><b>Likes</b>${likes}</p>` +
      `<p><b>Views</b>${views}</p>` +
      `<p><b>Comments</b>${comments}</p>` +
      `<p><b>Downloads</b>${downloads}</p>` +
      '</div>' +
      '</li>`
    );
  });

  const markup = parts.join('');
  galleryEl.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}

export function clearGallery() {
  galleryEl.innerHTML = '';
}

export function showLoader() {
  loaderEl.classList.remove('is-hidden');
}

export function hideLoader() {
  loaderEl.classList.add('is-hidden');
}

export function showLoadMoreButton() {
  loadMoreBtn.classList.remove('is-hidden');
}

export function hideLoadMoreButton() {
  loadMoreBtn.classList.add('is-hidden');
}

export function getFirstCardHeight() {
  const firstCard = galleryEl.querySelector('.photo-card');
  return firstCard ? firstCard.getBoundingClientRect().height : 0;
}

export { galleryEl, loadMoreBtn };

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

