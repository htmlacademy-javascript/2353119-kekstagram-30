import { creatingUserPosts } from './data';

const elementContainer = document.querySelector('.pictures');
const templatePicture = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const usersPost = creatingUserPosts();

const elementContainerFragment = document.createDocumentFragment();

usersPost.forEach((post) => {
  const elementPicture = templatePicture.cloneNode(true);

  elementPicture.querySelector('.picture__img').src = post.url;
  elementPicture.querySelector('.picture__img').alt = post.description;
  elementPicture.querySelector('.picture__likes').textContent = post.likes;
  elementPicture.querySelector('.picture__comments').textContent = post.comments.length;

  elementContainerFragment.append(elementPicture);
});

elementContainer.append(elementContainerFragment);
