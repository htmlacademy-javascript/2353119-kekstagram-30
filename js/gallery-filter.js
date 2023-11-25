import { renderGalleryMiniatures } from './gallery-miniatures.js';
import { getUniqueIndexesArray, debounce } from './util.js';

const MAX_INDEX_RANDOM_FILTER = 10;

const filtersContainer = document.querySelector('.img-filters');
const filtersFormElement = filtersContainer.querySelector('.img-filters__form');
const defaultButtonElement = filtersFormElement.querySelector('#filter-default');
const randomButtonElement = filtersFormElement.querySelector('#filter-random');
const discussedButtonElement = filtersFormElement.querySelector('#filter-discussed');

const FilterList = {
  DEFAULT: 'default',
  RANDOM: 'random',
  DISCUSSED: 'discussed',
};

const filterHandlers = {
  [FilterList.DEFAULT]: (data) => data,
  [FilterList.RANDOM]: (data) => {
    const maxUniqueRandomIndexes = getUniqueIndexesArray(0, data.length).slice(0, MAX_INDEX_RANDOM_FILTER);

    return maxUniqueRandomIndexes.map((index) => data[index]);
  },
  [FilterList.DISCUSSED]: (data) => [...data].sort((item1, item2) => item2.comments.length - item1.comments.length),
};

const redrawGalleryMiniatures = (filter, data) => {
  const filteredData = filterHandlers[filter](data);
  const miniatures = document.querySelectorAll('.picture');

  miniatures.forEach((item) => item.remove());
  renderGalleryMiniatures(filteredData);
};

const changingActiveButton = (target, active) => {
  active.classList.remove('img-filters__button--active');
  target.classList.add('img-filters__button--active');
};

const debounceRedrawMiniature = debounce(redrawGalleryMiniatures);

const onButtonClick = (evt, data) => {
  const targetButton = evt.target.closest('button');
  const activeButton = filtersFormElement.querySelector('.img-filters__button--active');

  switch (targetButton) {
    case defaultButtonElement:
      if (targetButton !== activeButton) {
        debounceRedrawMiniature(FilterList.DEFAULT, data);
        changingActiveButton(targetButton, activeButton);
      }

      break;
    case randomButtonElement:
      if (targetButton !== activeButton) {
        debounceRedrawMiniature(FilterList.RANDOM, data);
        changingActiveButton(targetButton, activeButton);
      }

      break;
    case discussedButtonElement:
      if (targetButton !== activeButton) {
        debounceRedrawMiniature(FilterList.DISCUSSED, data);
        changingActiveButton(targetButton, activeButton);
      }

      break;
  }
};

const initializeGalleryFilter = (data) => {
  filtersContainer.classList.remove('img-filters--inactive');
  filtersFormElement.addEventListener('click', (evt) => onButtonClick(evt, data));
};

export { initializeGalleryFilter };
