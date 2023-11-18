const MAX_ZOOM_VALUE = 100;
const MIN_ZOOM_VALUE = 25;
const ZOOM_STEP = 25;

const zoomValuesElement = document.querySelector('.scale__control--value');
const imgUploadPreview = document.querySelector('.img-upload__preview');
const zoomInElement = document.querySelector('.scale__control--bigger');
const zoomOutElement = document.querySelector('.scale__control--smaller');

const onZoomInClick = () => {
  let zoomValue = parseInt(zoomValuesElement.value, 10);

  if (zoomValue < MAX_ZOOM_VALUE) {
    zoomValue += ZOOM_STEP;
  }
  zoomValuesElement.value = `${zoomValue}%`;
  imgUploadPreview.style.transform = `scale(${zoomValue / 100})`;
};

const onZoomOutClick = () => {
  let zoomValue = parseInt(zoomValuesElement.value, 10);

  if (zoomValue > MIN_ZOOM_VALUE) {
    zoomValue -= ZOOM_STEP;
  }
  zoomValuesElement.value = `${zoomValue}%`;
  imgUploadPreview.style.transform = `scale(${zoomValue / 100})`;
};

const initializeZoom = () => {
  zoomInElement.addEventListener('click', onZoomInClick);
  zoomOutElement.addEventListener('click', onZoomOutClick);
};

const resetZoom = () => {
  zoomValuesElement.value = MAX_ZOOM_VALUE;
  imgUploadPreview.style.transform = null;
  zoomInElement.removeEventListener('click', onZoomInClick);
  zoomOutElement.removeEventListener('click', onZoomOutClick);
};

export { initializeZoom, resetZoom };
