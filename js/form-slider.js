const imgUploadForm = document.querySelector('.img-upload__form');
const imgPreview = imgUploadForm.querySelector('.img-upload__preview img');
const effectsContainer = imgUploadForm.querySelector('.img-upload__effects');
const sliderContainer = imgUploadForm.querySelector('.img-upload__effect-level');
const effectLevelSliderElement = imgUploadForm.querySelector('.effect-level__slider');
const effectLevelValueElement = imgUploadForm.querySelector('.effect-level__value');

const defaultSliderSettings = {
  range: { min: 0, max: 100 },
  start: 100,
  step: 1,
  connect: 'lower',
};

const effects = {
  none: {
    style: 'none',
    unit: '',
    sliderOptions: {
      min: 0,
      max: 100,
      step: 1,
    }
  },
  chrome: {
    style: 'grayscale',
    unit: '',
    sliderOptions: {
      min: 0,
      max: 1,
      step: 0.1,
    }
  },
  sepia: {
    style: 'sepia',
    unit: '',
    sliderOptions: {
      min: 0,
      max: 1,
      step: 0.1,
    }
  },
  marvin: {
    style: 'invert',
    unit: '%',
    sliderOptions: {
      min: 0,
      max: 100,
      step: 1,
    }
  },
  phobos: {
    style: 'blur',
    unit: 'px',
    sliderOptions: {
      min: 0,
      max: 3,
      step: 0.1,
    }
  },
  heat: {
    style: 'brightness',
    unit: '',
    sliderOptions: {
      min: 1,
      max: 3,
      step: 0.1,
    }
  },
};

const onSiderInit = (evt) => {
  const { style, unit, sliderOptions: { min, max, step } } = effects[evt.target.value];

  effectLevelSliderElement.noUiSlider.updateOptions({
    range: { min, max },
    start: max,
    step,
  });

  effectLevelSliderElement.noUiSlider.on('update', () => {
    const sliderLevel = effectLevelSliderElement.noUiSlider.get();

    imgPreview.style.filter = `${style}(${sliderLevel}${unit})`;
    effectLevelValueElement.value = effectLevelSliderElement.noUiSlider.get();
  });

  if (evt.target.value === 'none') {
    sliderContainer.classList.add('hidden');
    imgPreview.style.filter = null;
    return;
  }

  sliderContainer.classList.remove('hidden');
};

const initializeSlider = () => {
  sliderContainer.classList.add('hidden');
  effectsContainer.addEventListener('change', onSiderInit);
  noUiSlider.create(effectLevelSliderElement, defaultSliderSettings);
};

const resetSlider = () => {
  sliderContainer.classList.add('hidden');
  effectsContainer.removeEventListener('change', onSiderInit);
  effectLevelSliderElement.noUiSlider.destroy();
  imgPreview.style.filter = null;
};

export { initializeSlider, resetSlider };
