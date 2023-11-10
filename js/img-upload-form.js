import { isEscapeKey } from './util.js';
import { pristine, isFormValid } from './form-validation.js';

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
  cancelElement.removeEventListener('click', onCancelElementClick);
  document.removeEventListener('keydown', onDocumentKeydown);
  imgUploadForm.removeEventListener('submit', onFormSubmit);
};

const openUploadEditor = () => {
  overlayElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  cancelElement.addEventListener('click', onCancelElementClick);
  document.addEventListener('keydown', onDocumentKeydown);
  imgUploadForm.addEventListener('submit', onFormSubmit);
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
