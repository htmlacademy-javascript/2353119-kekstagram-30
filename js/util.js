const REMOVE_MESSAGE_TIMEOUT = 5000;

const errorMessageTemplate = document
  .querySelector('#data-error')
  .content
  .querySelector('.data-error');

const showErrorMessage = (titleError) => {
  const errorElement = errorMessageTemplate.cloneNode(true);

  if (titleError) {
    errorElement.querySelector('.data-error__title').textContent = titleError;
  }

  document.body.append(errorElement);


  setTimeout(() => {
    errorElement.remove();
  }, REMOVE_MESSAGE_TIMEOUT);
};

const getRandomIndex = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min)) + min;
};

const getUniqueIndexesArray = (min, max) => {
  const uniqueIndexes = [];

  while (uniqueIndexes.length < max) {
    const randomIndex = getRandomIndex(min, max);

    if (!uniqueIndexes.includes(randomIndex)) {
      uniqueIndexes.push(randomIndex);
    }
  }

  return uniqueIndexes;
};

const isEscapeKey = (evt) => evt.key === 'Escape';

const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export { isEscapeKey, showErrorMessage, getUniqueIndexesArray, debounce };
