// import { getData } from './api.js';
import { renderGalleryMiniatures } from './gallery-miniatures.js';
import { initializeModalBigPicture } from './modal-big-picture.js';
import { initializeImgUploadEditor } from './form-upload.js';

import { generateUserPosts } from './data.js';
const postsData = generateUserPosts();

initializeModalBigPicture(postsData);
initializeImgUploadEditor();
renderGalleryMiniatures(postsData);

// getData().then((dataPost) => console.log(dataPost));

