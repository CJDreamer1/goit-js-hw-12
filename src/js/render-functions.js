import { gallery } from '../main';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import { loader } from '../main';

// ======================================== функція, яка створює розмітку для одного елемента ===================================
export function articleTemplate(obj) {
  const {
    webformatURL,
    largeImageURL,
    tags,
    likes,
    views,
    comments,
    downloads,
  } = obj;
  return `<li class="modal">
          <a class="gallery-link" href="${webformatURL}">
            <img loading="lazy" class="gallery-image" src="${largeImageURL}" data-source="${webformatURL}" alt="${tags}">
          </a>
          <div class="div-info">
            <p class="p-info"><span class="p-span">Likes</span> ${likes}</p>
            <p class="p-info"><span class="p-span">Views</span> ${views}</p>
            <p class="p-info"><span class="p-span">Coments</span> ${comments}</p>
            <p class="p-info"><span class="p-span">Downloads</span> ${downloads}</p>
          </div>
        </li>`;
}

// ================================================ функція яка створює розимітку для масива ====================================
function articlesTemplate(arr) {
  //   const lightbox = new SimpleLightbox('.gallery a', {
  //     captionsData: 'alt',
  //     captionDelay: 250,
  //   });

  //   lightbox.refresh(); // Оновлюємо lightbox
  return arr.map(articleTemplate).join('');
}

// ============================================ викликаємо розмітку =======================================
export function renderArticles(arr) {
  const markup = articlesTemplate(arr);
  gallery.insertAdjacentHTML('beforeend', markup);
}
