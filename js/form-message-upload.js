import { isEscapeKey } from './util.js';

const successUploadImgMessageElement = document.querySelector('#success').content.querySelector('.success');
const errorUploadImgMessageElement = document.querySelector('#error').content.querySelector('.error');

const hideMessage = () => {
  const existsElement =
    document.querySelector('.success') ||
    document.querySelector('.error');
  existsElement.remove();
  document.removeEventListener('keydown', onDocumentKeydown);
  document.body.removeEventListener('click', onBobyClick);
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

function onBobyClick(evt) {
  if (evt.target.closest('.success__inner') || (evt.target.closest('.error__inner'))) {
    return;
  }

  hideMessage();
}

const showMessage = (element, buttonClass) => {
  document.body.append(element);
  document.body.addEventListener('click', onBobyClick);
  document.addEventListener('keydown', onDocumentKeydown);
  element.querySelector(buttonClass).addEventListener('click', onCloseButtonClick);
};

const showUploadSuccessMessage = () => {
  showMessage(successUploadImgMessageElement, '.success__button');
};

const showUploadErrorMessage = () => {
  showMessage(errorUploadImgMessageElement, '.error__button');
};

export { showUploadSuccessMessage, showUploadErrorMessage };
