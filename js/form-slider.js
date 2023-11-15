const imgPreview = document.querySelector('.img-upload__preview img');
const effectsContainer = document.querySelector('.effects');
const sliderContainer = document.querySelector('.img-upload__effect-level');
const effectLevelSlider = document.querySelector('.effect-level__slider');
const effectLevelValue = document.querySelector('.effect-level__value');

const defaultSettingSlider = {
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

const onSettingSlider = (evt) => {
  const { style: currentStyle, unit: currentUnit, sliderOptions: { min: currentMin, max: currentMax, step: currentStep } } = effects[evt.target.value];

  effectLevelSlider.noUiSlider.updateOptions({
    range: { min: currentMin, max: currentMax },
    start: currentMax,
    step: currentStep,
  });

  effectLevelSlider.noUiSlider.on('update', () => {
    imgPreview.style.filter = `${currentStyle}(${effectLevelSlider.noUiSlider.get()}${currentUnit})`;
    effectLevelValue.value = effectLevelSlider.noUiSlider.get();
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
  effectsContainer.addEventListener('change', onSettingSlider);
  noUiSlider.create(effectLevelSlider, defaultSettingSlider);
};

const resetSlider = () => {
  sliderContainer.classList.add('hidden');
  effectsContainer.removeEventListener('change', onSettingSlider);
  effectLevelSlider.noUiSlider.destroy();
  imgPreview.style.filter = null;
};

export { initializeSlider, resetSlider };
