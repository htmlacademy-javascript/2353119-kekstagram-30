import { isEscapeKey } from './util.js';

const successUploadImgMessageElement = document.querySelector('#success').content.querySelector('.success');
const errorUploadImgMessageElement = document.querySelector('#error').content.querySelector('.error');

const hideMessage = () => {
  const existsElement =
    document.querySelector('.success') ||
    document.querySelector('.error');
  existsElement.remove();
  document.removeEventListener('keydown', onDocumentKeydown);
};

const onCloseButtonClick = () => {
  hideMessage();
};

function onDocumentKeydown(evt) {
  if (isEscapeKey) {
    evt.preventDefault();
    hideMessage();
  }
}

const showMessage = (element, buttonClass) => {
  document.body.append(element);
  document.addEventListener('keydown', onDocumentKeydown);
  element.querySelector(buttonClass).addEventListener('click', onCloseButtonClick);
};

const showSuccessMessage = () => {
  showMessage(successUploadImgMessageElement, '.success__button');
};

const showErrorMessage = () => {
  showMessage(errorUploadImgMessageElement, '.error__button');
};

export { showSuccessMessage, showErrorMessage };
