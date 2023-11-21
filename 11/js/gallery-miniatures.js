const postsContainerElement = document.querySelector('.pictures');
const miniaturePictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const renderGalleryMiniatures = (posts) => {
  const fragment = document.createDocumentFragment();

  posts.forEach(({ url, description, likes, comments, id }) => {
    const newMiniature = miniaturePictureTemplate.cloneNode(true);

    newMiniature.querySelector('.picture__img').src = url;
    newMiniature.querySelector('.picture__img').alt = description;
    newMiniature.querySelector('.picture__likes').textContent = likes;
    newMiniature.querySelector('.picture__comments').textContent = comments.length;
    newMiniature.setAttribute('data-index', id);

    fragment.append(newMiniature);
  });

  postsContainerElement.append(fragment);
};

export { renderGalleryMiniatures };
