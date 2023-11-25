const REMOVE_MESSAGE_TIMEOUT = 5000;

const erorrMessageTemplate = document
  .querySelector('#data-error')
  .content
  .querySelector('.data-error');

const showErrorMessage = (titleError) => {
  const erorrElement = erorrMessageTemplate.cloneNode(true);

  if (titleError) {
    erorrElement.querySelector('.data-error__title').textContent = titleError;
  }

  document.body.append(erorrElement); // TODO: нужно добавлять через fragment?


  setTimeout(() => {
    erorrElement.remove();
  }, REMOVE_MESSAGE_TIMEOUT);
};

const getRandomIndex = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min)) + min;
};

const getUniqueIndexesArray = (min, max) => {
  const uniqueIndexesArray = [];

  while (uniqueIndexesArray.length < max) {
    const randomIndex = getRandomIndex(min, max);

    if (!uniqueIndexesArray.includes(randomIndex)) {
      uniqueIndexesArray.push(randomIndex);
    }
  }

  return uniqueIndexesArray;
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
