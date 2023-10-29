import { loadingModalData } from './loading-modal-data.js';
import { isEscapeKey } from './util.js';

const bodyScroll = document.querySelector('body');
const rootModalElement = document.querySelector('.big-picture');
const modalOpenElement = document.querySelector('.pictures');
const modalCloseElement = rootModalElement.querySelector('.big-picture__cancel');

const commentCount = rootModalElement.querySelector('.social__comment-count'); // temp
const commentsCountLoader = rootModalElement.querySelector('.comments-loader'); // temp

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    closeModal(); // eslint-disable-line
  }
};

const closeModal = () => {
  bodyScroll.classList.remove('modal-open');
  rootModalElement.classList.add('hidden');
  modalCloseElement.removeEventListener('click', closeModal);
  document.removeEventListener('keydown', onDocumentKeydown);

  commentCount.classList.remove('hidden'); // temp
  commentsCountLoader.classList.remove('hidden'); // temp
};

const openModal = () => {
  bodyScroll.classList.add('modal-open');
  rootModalElement.classList.remove('hidden');
  modalCloseElement.addEventListener('click', closeModal);
  document.addEventListener('keydown', onDocumentKeydown);

  commentCount.classList.add('hidden'); // temp
  commentsCountLoader.classList.add('hidden'); // temp
};

const initializeModal = () => {
  modalOpenElement.addEventListener('click', (evt) => {
    evt.preventDefault();
    if (evt.target.matches('a .picture__img')) {
      loadingModalData(evt);
      openModal();
    }
  });
};

export { initializeModal };
