import { sendDataFromServer } from './api.js';
import { isEscapeKey, showErrorMessage } from './util.js';
import { pristine } from './form-validation.js';
import { resetZoom } from './form-zoom.js';
import { showSlider, hideSlider } from './form-slider.js';
import { showUploadSuccessMessage, showUploadErrorMessage } from './form-message-upload.js';

const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const MessageErorr = {
  TYPE_FILE: 'неверный формат изображения, попробуйте jpg / png',
};
const SubmitButtonCaption = {
  SUBMITTING: 'Публикую...',
  IDLE: 'Опубликовать',
};

const bodyElement = document.body;
const imgUploadFormContainer = document.querySelector('.img-upload__form');
const overlayElement = imgUploadFormContainer.querySelector('.img-upload__overlay');
const cancelElement = imgUploadFormContainer.querySelector('.img-upload__cancel');
const fieldUpload = imgUploadFormContainer.querySelector('input[name="filename"]');
const fieldHashtags = imgUploadFormContainer.querySelector('input[name="hashtags"]');
const fieldDescription = imgUploadFormContainer.querySelector('textarea[name="description"]');
const submitButton = imgUploadFormContainer.querySelector('.img-upload__submit');
const imgPreview = imgUploadFormContainer.querySelector('.img-upload__preview img');
const imgEffectsPreviews = imgUploadFormContainer.querySelectorAll('.effects__preview');

const isTextField = () =>
  document.activeElement === fieldHashtags ||
  document.activeElement === fieldDescription;

const isValidTypeFile = (file) => {
  const fileName = file.name.toLowerCase();

  return FILE_TYPES.some((item) => fileName.endsWith(item));
};

const cancelUploadEditor = () => {
  overlayElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  cancelElement.removeEventListener('click', onCancelElementClick);

  pristine.reset();
  imgUploadFormContainer.reset();
  resetZoom();
  hideSlider();
};

const openUploadEditor = () => {
  overlayElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  cancelElement.addEventListener('click', onCancelElementClick);

  showSlider();
};

const isErrorMessageWindow = () => Boolean(document.querySelector('.error'));

function onDocumentKeydown(evt) {
  const isСonditionСlosing = isEscapeKey(evt) && !isTextField() && !isErrorMessageWindow();

  if (isСonditionСlosing) {
    evt.preventDefault();
    cancelUploadEditor();
  }
}

function onCancelElementClick() {
  cancelUploadEditor();
}

function onUploadFieldChange() {
  const file = fieldUpload.files[0];

  if (!isValidTypeFile(file)) {
    showErrorMessage(MessageErorr.TYPE_FILE);
    imgUploadFormContainer.reset();

    return;
  }

  imgPreview.src = URL.createObjectURL(file);
  imgEffectsPreviews.forEach((preview) => {
    preview.style.backgroundImage = `url('${imgPreview.src}')`;
  });

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
    showUploadSuccessMessage();
    toggleSubmitButton(false);
  }).catch(() => {
    showUploadErrorMessage();
    toggleSubmitButton(false);
  });

  pristine.reset();
};

const initializeImgUploadEditor = () => {
  fieldUpload.addEventListener('change', onUploadFieldChange);
};

imgUploadFormContainer.addEventListener('submit', onFormSubmit);

export { initializeImgUploadEditor };
