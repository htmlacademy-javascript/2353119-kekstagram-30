const MAX_ZOOM_VALUE = 100;
const MIN_ZOOM_VALUE = 25;
const ZOOM_STEP = 25;
const PERCENTAGE_DIVIDER = 100;

const imgUploadPreview = document.querySelector('.img-upload__preview img');
const zoomValuesElement = document.querySelector('.scale__control--value');
const zoomInElement = document.querySelector('.scale__control--bigger');
const zoomOutElement = document.querySelector('.scale__control--smaller');

const onZoomInClick = () => {
  let zoomValue = parseInt(zoomValuesElement.value, 10);

  if (zoomValue < MAX_ZOOM_VALUE) {
    zoomValue += ZOOM_STEP;
  }
  zoomValuesElement.value = `${zoomValue}%`;
  imgUploadPreview.style.transform = `scale(${zoomValue / PERCENTAGE_DIVIDER})`;
};

const onZoomOutClick = () => {
  let zoomValue = parseInt(zoomValuesElement.value, 10);

  if (zoomValue > MIN_ZOOM_VALUE) {
    zoomValue -= ZOOM_STEP;
  }
  zoomValuesElement.value = `${zoomValue}%`;
  imgUploadPreview.style.transform = `scale(${zoomValue / PERCENTAGE_DIVIDER})`;
};

const initializeZoom = () => {
  zoomInElement.addEventListener('click', onZoomInClick);
  zoomOutElement.addEventListener('click', onZoomOutClick);
};

const resetZoom = () => {
  zoomValuesElement.value = `${MAX_ZOOM_VALUE}%`;
  imgUploadPreview.removeAttribute('style');
};

export { initializeZoom, resetZoom };
