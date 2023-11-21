const REMOVE_MESSAGE_TIMEOUT = 5000;

const erorrMessageTemplate = document
  .querySelector('#data-error')
  .content
  .querySelector('.data-error');

const showErrorMessage = () => {
  const erorrElement = erorrMessageTemplate.cloneNode(true);
  document.body.append(erorrElement);

  setTimeout(() => {
    erorrElement.remove();
  }, REMOVE_MESSAGE_TIMEOUT);
};

const isEscapeKey = (evt) => evt.key === 'Escape';

export { isEscapeKey, showErrorMessage };
