import { sendDataFromServer } from './api.js';
import { isEscapeKey } from './util.js';
import { pristine } from './form-validation.js';
import { initializeZoom, resetZoom } from './form-zoom.js';
import { initializeSlider, resetSlider } from './form-slider.js';
import { showSuccessMessage, showErrorMessage } from './form-message-upload.js';

const bodyElement = document.body;
const imgUploadForm = document.querySelector('.img-upload__form');
const fieldUpload = imgUploadForm.querySelector('.img-upload__input');
const overlayElement = imgUploadForm.querySelector('.img-upload__overlay');
const cancelElement = imgUploadForm.querySelector('.img-upload__cancel');
const fieldHashtags = imgUploadForm.querySelector('input[name="hashtags"]');
const fieldDescription = imgUploadForm.querySelector('textarea[name="description"]');
const submitButton = imgUploadForm.querySelector('.img-upload__submit');

const SubmitButtonCaption = {
  SUBMITTING: 'Публикую...',
  IDLE: 'Опубликовать',
};

const isTextField = () =>
  document.activeElement === fieldHashtags ||
  document.activeElement === fieldDescription;

const cancelUploadEditor = () => {
  overlayElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  cancelElement.removeEventListener('click', onCancelElementClick);

  pristine.reset();
  imgUploadForm.reset();
  resetZoom();
  resetSlider();
};

const openUploadEditor = () => {
  overlayElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  cancelElement.addEventListener('click', onCancelElementClick);

  initializeZoom();
  initializeSlider();
};

const isErrorMessageExists = () => Boolean(document.querySelector('.error'));

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt) && !isTextField() && !isErrorMessageExists()) {
    cancelElement.click(); // TODO: test
  }
}

function onCancelElementClick() {
  cancelUploadEditor();
}

function onUploadFieldChange() {
  openUploadEditor();
}

const toggleSubmitButton = (isDisabled) => {
  submitButton.disabled = isDisabled;

  if (isDisabled) {
    submitButton.textContent = SubmitButtonCaption.SUBMITTING;

    return;
  }

  submitButton.textContent = SubmitButtonCaption.IDLE;
};

const onFormSubmit = (evt) => {
  evt.preventDefault();

  const isFormValid = pristine.validate();

  if (!isFormValid) {
    return;
  }

  const formData = new FormData(evt.target);

  toggleSubmitButton(true);
  sendDataFromServer(formData).then(() => {
    cancelUploadEditor();
    showSuccessMessage();
    toggleSubmitButton(false);
  }).catch(() => {
    showErrorMessage();
    toggleSubmitButton(false);
  });

  pristine.reset();
};

const initializeImgUploadEditor = () => {
  fieldUpload.addEventListener('change', onUploadFieldChange);
};

imgUploadForm.addEventListener('submit', onFormSubmit);

export { initializeImgUploadEditor };
