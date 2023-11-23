import { renderGalleryMiniatures } from './gallery-miniatures.js';
import { getArrayUniqueIndexes, debounce } from './util.js';

const MAX_INDEX_RANDOM_FILTER = 10;

const filtersElement = document.querySelector('.img-filters');
const filtersFormElement = document.querySelector('.img-filters__form');
const defaultButton = filtersFormElement.querySelector('#filter-default');
const randomButton = filtersFormElement.querySelector('#filter-random');
const discussedButton = filtersFormElement.querySelector('#filter-discussed');

const FilterList = {
  DEFAULT: 'default',
  RANDOM: 'random',
  DISCUSSED: 'discussed',
};

const filterHandlers = {
  [FilterList.DEFAULT]: (data) => data,
  [FilterList.RANDOM]: (data) => {
    const maxUniqueRandomIndexes = getArrayUniqueIndexes(0, data.length).slice(0, MAX_INDEX_RANDOM_FILTER);

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
    case defaultButton:
      if (targetButton !== activeButton) {
        debounceRedrawMiniature(FilterList.DEFAULT, data);
        changingActiveButton(targetButton, activeButton);
      }

      break;
    case randomButton:
      if (targetButton !== activeButton) {
        debounceRedrawMiniature(FilterList.RANDOM, data);
        changingActiveButton(targetButton, activeButton);
      }

      break;
    case discussedButton:
      if (targetButton !== activeButton) {
        debounceRedrawMiniature(FilterList.DISCUSSED, data);
        changingActiveButton(targetButton, activeButton);
      }

      break;
  }
};

const initializeGalleryFilter = (data) => {
  filtersElement.classList.remove('img-filters--inactive');
  filtersFormElement.addEventListener('click', (evt) => onButtonClick(evt, data));
};

export { initializeGalleryFilter };
