import { isEscapeKey } from './util.js';
import { pristine, isFormValid } from './form-validation.js';
import { initializeZoom, resetZoom } from './form-zoom.js';
import { initializeSlider, resetSlider } from './form-slider.js';

const bodyElement = document.body;
const imgUploadForm = document.querySelector('.img-upload__form');
const fieldUpload = imgUploadForm.querySelector('.img-upload__input');
const overlayElement = imgUploadForm.querySelector('.img-upload__overlay');
const cancelElement = imgUploadForm.querySelector('.img-upload__cancel');
const fieldHashtags = imgUploadForm.querySelector('input[name="hashtags"]');
const fieldDescription = imgUploadForm.querySelector('textarea[name="description"]');

const isTextField = () => document.activeElement === fieldHashtags || document.activeElement === fieldDescription;

const cancelUploadEditor = () => {
  pristine.reset();
  overlayElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  cancelElement.removeEventListener('click', onCancelElementClick);
  imgUploadForm.removeEventListener('submit', onFormSubmit);
  resetZoom();
  resetSlider();
};

const openUploadEditor = () => {
  overlayElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  cancelElement.addEventListener('click', onCancelElementClick);
  imgUploadForm.addEventListener('submit', onFormSubmit); // TODO Пределать все обработчики (подключить в main, оставить на скрытых элементах)
  initializeZoom();
  initializeSlider();
};

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt) && !isTextField()) {
    cancelElement.click();
  }
}

function onFormSubmit(evt) {
  isFormValid(evt);
}

function onCancelElementClick() {
  cancelUploadEditor();
}

function onUploadFieldChange() {
  openUploadEditor();
}

const initializeImgUploadEditor = () => {
  fieldUpload.addEventListener('change', onUploadFieldChange);
};

export { initializeImgUploadEditor };
