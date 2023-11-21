import { getDataFromServer } from './api.js';
import { renderGalleryMiniatures } from './gallery-miniatures.js';
import { initializeModalBigPicture } from './modal-big-picture.js';
import { initializeImgUploadEditor } from './form-upload.js';
import { showErrorMessage } from './util.js';

getDataFromServer().then((postsData) => {

  renderGalleryMiniatures(postsData);
  initializeModalBigPicture(postsData);
  initializeImgUploadEditor();

}).catch(() => showErrorMessage());
