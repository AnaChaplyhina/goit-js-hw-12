import 'izitoast/dist/css/iziToast.min.css';
import 'simplelightbox/dist/simple-lightbox.min.css';

import iziToast from 'izitoast';
import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
  getFirstCardHeight,
  loadMoreBtn
} from './js/render-functions.js';

var form, input;
var currentQuery = '';
var page = 1;
var totalHits = 0;
var totalLoaded = 0;

ready(init);

function init() {
  form = document.querySelector('#search-form');
  input = form ? form.elements.query : null;

  if (!form || !input) {
    console.error('search form not found in DOM');
    return;
  }

  form.addEventListener('submit', onSearchSubmit);
  if (loadMoreBtn) loadMoreBtn.addEventListener('click', onLoadMore);

  // авто-пошук із ?query=...
  var params = new URLSearchParams(window.location.search);
  var q = params.get('query');
  if (q && q.trim()) {
    input.value = q.trim();
    onSearchSubmit(new Event('submit', { bubbles: false, cancelable: true }));
  }
}

async function onSearchSubmit(e) {
  if (e && typeof e.preventDefault === 'function') e.preventDefault();

  var query = input ? String(input.value).trim() : '';

  hideLoadMoreButton();
  clearGallery();
  totalLoaded = 0;
  totalHits = 0;
  page = 1;

  if (!query) {
    iziToast.warning({
      message: 'Введи ключове слово для пошуку.',
      position: 'topRight'
    });
    return;
  }

  currentQuery = query;

  try {
    showLoader();
    const data = await getImagesByQuery(currentQuery, page);

    if (!data || !data.hits || data.hits.length === 0) {
      iziToast.info({
        message: 'На жаль, нічого не знайдено. Спробуй інший запит.',
        position: 'topRight'
      });
      return;
    }

    totalHits = Number(data.totalHits || 0);
    createGallery(data.hits);
    totalLoaded += data.hits.length;

    if (totalLoaded < totalHits) {
      showLoadMoreButton();
    } else {
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'bottomCenter'
      });
    }
  } catch (err) {
    showErrorToast(err);
    console.error(err);
  } finally {
    hideLoader();
  }
}

async function onLoadMore() {
  page += 1;

  try {
    showLoader();
    const data = await getImagesByQuery(currentQuery, page);

    if (!data || !data.hits || data.hits.length === 0) {
      hideLoadMoreButton();
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'bottomCenter'
      });
      return;
    }

    createGallery(data.hits);
    totalLoaded += data.hits.length;

    var h = getFirstCardHeight();
    if (h) {
      window.scrollBy({ top: h * 2, behavior: 'smooth' });
    }

    if (totalLoaded >= totalHits) {
      hideLoadMoreButton();
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'bottomCenter'
      });
    }
  } catch (err) {
    showErrorToast(err);
    console.error(err);
  } finally {
    hideLoader();
  }
}

function showErrorToast(err) {
  var msg = 'Unknown error';
  if (err && err.code === 'NO_PIXABAY_KEY') {
    msg = 'Pixabay API key is not set. Додай ключ у src/js/pixabay-api.js або в .env.local як VITE_PIXABAY_KEY.';
  } else if (err && err.response) {
    var status = err.response.status;
    var respMsg =
      (err.response.data && err.response.data.message)
        ? err.response.data.message
        : (err.response.statusText ? err.response.statusText : 'Request failed');
    msg = 'HTTP ' + status + ': ' + respMsg;
  } else if (err && err.request) {
    msg = 'Network error: no response from server';
  } else if (err && err.message) {
    msg = err.message;
  }
  iziToast.error({ title: 'Помилка', message: msg, position: 'topRight' });
}

// helper: run when DOM ready
function ready(cb) {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', cb);
  } else {
    cb();
  }
}




