import { getArticles } from './js/pixabay-api.js';
import { articleTemplate } from './js/render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { renderArticles } from './js/render-functions.js';

export const gallery = document.querySelector('.gallery');
export const formEl = document.querySelector('.form');
export const loader = document.querySelector('.loader');
const btnLoadMore = document.querySelector('.load-more');

let query;
let currentPage = 1;
let maxPage = 0;
const pageSize = 15;

// =========================================== СТВОРЕННЯ РОЗМІТКИ ==================================================

formEl.addEventListener('submit', onFormSubmit);
btnLoadMore.addEventListener('click', onLoadMoreClick);

// ==============================================================================================================
async function onFormSubmit(e) {
  e.preventDefault();
  gallery.innerHTML = '';
  currentPage = 1;

  try {
    loader.classList.remove('loader-hidden'); // Показати анімацію перед запитом
    query = e.target.elements.query.value.trim(); // Отримання значення поля вводу
    const data = await getArticles(query, currentPage);

    maxPage = Math.ceil(data.totalHits / pageSize); // Округляємо кількість запитів що нам будуть доступні

    if (data.hits.length === 0) {
      // Якщо отримано порожній масив зображень, показати повідомлення про відсутність зображень
      iziToast.error({
        position: 'topRight',
        color: 'red',
        title: 'Error',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
    } else {
      renderArticles(data.hits);
    }
  } catch (error) {
    iziToast.error({
      position: 'topRight',
      color: 'red',
      title: 'Error',
      message:
        'Sorry, there are no images matching your search query. Please try again!',
    });
  }

  loader.classList.add('loader-hidden'); // Сховати анімацію після запиту

  checkBtnStatus();
  e.target.reset();
}
// ========================================== Слухач події на кнопку Load More ==================================

async function onLoadMoreClick() {
  currentPage += 1;
  loader.classList.remove('loader-hidden'); // Показати анімацію перед запитом
  try {
    const data = await getArticles(query, currentPage);
    renderArticles(data.hits);
  } catch (error) {
    iziToast.error({
      position: 'topRight',
      color: 'red',
      title: 'Error',
      message:
        'Sorry, there are no images matching your search query. Please try again!',
    });
  }
  myScroll();
  checkBtnStatus();
  loader.classList.add('loader-hidden'); // Сховати анімацію після запиту
}
// ====================================== Ховаємо кнопку Load More ==============================================
function showLoadMore() {
  btnLoadMore.classList.remove('hidden');
}
function hideLoadMore() {
  btnLoadMore.classList.add('hidden');
}
function checkBtnStatus() {
  if (currentPage >= maxPage) {
    hideLoadMore();

    if (currentPage > 1) {
      iziToast.error({
        position: 'topRight',
        color: 'blue',
        title: 'Error',
        message: "We're sorry, but you've reached the end of search results.",
      });
    }
  } else {
    showLoadMore();
  }
}
// ====================================== Додаємо скролл після підгрузки нових картинок ===============================
function myScroll() {
  const height = gallery.firstChild.getBoundingClientRect().height;
  scrollBy({
    top: height * 3,
    behavior: 'smooth',
  });
}
// =================================================================================================================
