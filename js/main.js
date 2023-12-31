import { getDataFromServer } from './api.js';
import { renderGalleryMiniatures } from './gallery-miniatures.js';
import { initializeGalleryFilter } from './gallery-filter.js';
import { initializeModalBigPicture } from './modal-big-picture.js';
import { initializeImgUploadEditor } from './form-upload.js';
import { initializeZoom } from './form-zoom.js';
import { showErrorMessage } from './util.js';

getDataFromServer().then((postsData) => {
  renderGalleryMiniatures(postsData);
  initializeGalleryFilter(postsData);
  initializeModalBigPicture(postsData);
}).catch(() => showErrorMessage());

initializeImgUploadEditor();
initializeZoom();
