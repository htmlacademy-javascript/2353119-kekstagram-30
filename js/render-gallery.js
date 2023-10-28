import { generateUserPosts } from './data.js';

const dataPosts = generateUserPosts();

const postsContainerElement = document.querySelector('.pictures');
const templatePost = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const renderGallery = () => {
  const postContainerFragment = document.createDocumentFragment();

  dataPosts.forEach(({ url, description, likes, comments }, i) => {
    const cloneTemplatePost = templatePost.cloneNode(true);

    cloneTemplatePost.querySelector('.picture__img').src = url;
    cloneTemplatePost.querySelector('.picture__img').alt = description;
    cloneTemplatePost.querySelector('.picture__likes').textContent = likes;
    cloneTemplatePost.querySelector('.picture__comments').textContent = comments.length;
    cloneTemplatePost.setAttribute('data-index', i);

    postContainerFragment.append(cloneTemplatePost);
  });

  postsContainerElement.append(postContainerFragment);
};

export { renderGallery, dataPosts }; //TODO где лучше инициализировать dataPosts?
