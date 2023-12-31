import { isEscapeKey } from './util.js';

const STEP_COMMENTS_SHOWN = 5;

const bodyElement = document.querySelector('body');
const bigPictureContainer = document.querySelector('.big-picture');
const modalOpenElement = document.querySelector('.pictures');
const modalCloseElement = bigPictureContainer.querySelector('.big-picture__cancel');

const commentsListElement = bigPictureContainer.querySelector('.social__comments');
const commentShownCountElement = bigPictureContainer.querySelector('.social__comment-shown-count');
const commentTotalCountElement = bigPictureContainer.querySelector('.social__comment-total-count');
const commentsLoaderElement = bigPictureContainer.querySelector('.comments-loader');
const commentTemplateElement = document.querySelector('#comment').content.querySelector('.social__comment');

let shownCommentsCount = 0;
let comments = [];

const createComment = ({ avatar, message, name }) => {
  const newComment = commentTemplateElement.cloneNode(true);

  newComment.querySelector('.social__picture').src = avatar;
  newComment.querySelector('.social__picture').alt = name;
  newComment.querySelector('.social__text').textContent = message;

  return newComment;
};

const renderComments = () => {
  const totalCommentsCount = comments.length;
  shownCommentsCount += STEP_COMMENTS_SHOWN;

  if (shownCommentsCount >= totalCommentsCount) {
    shownCommentsCount = totalCommentsCount;
    commentsLoaderElement.classList.add('hidden');
  } else {
    commentsLoaderElement.classList.remove('hidden');
  }

  const fragment = document.createDocumentFragment();

  for (let i = 0; shownCommentsCount > i; i++) {
    const comment = createComment(comments[i]);
    fragment.append(comment);
  }

  commentsListElement.innerHTML = '';
  commentsListElement.append(fragment);

  commentTotalCountElement.textContent = comments.length;
  commentShownCountElement.textContent = shownCommentsCount;
};

const onCommentsLoaderClick = () => {
  renderComments();
};

const renderModalPost = ({ url, description, likes }) => {
  bigPictureContainer.querySelector('.big-picture__img img').src = url;
  bigPictureContainer.querySelector('.big-picture__img img').alt = description;
  bigPictureContainer.querySelector('.likes-count').textContent = likes;
  bigPictureContainer.querySelector('.social__caption').textContent = description;
};

const closeModalPost = () => {
  shownCommentsCount = 0;
  bigPictureContainer.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};

const onCloseModalButtonClick = () => {
  closeModalPost();
};

const openModalPost = (postData) => {
  bigPictureContainer.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);

  comments = postData.comments;

  renderComments();
  renderModalPost(postData);
};

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeModalPost();
  }
}

const onModalOpenElementClick = (evt, posts) => {
  const targetMiniature = evt.target.closest('[data-index]');

  if (!targetMiniature) {
    return;
  }

  evt.preventDefault();

  const postId = +targetMiniature.dataset.index;
  const postData = posts.find(({ id }) => id === postId);

  openModalPost(postData);
};

const initializeModalBigPicture = (posts) => {
  modalOpenElement.addEventListener('click', (evt) => onModalOpenElementClick(evt, posts));
};

modalCloseElement.addEventListener('click', onCloseModalButtonClick);
commentsLoaderElement.addEventListener('click', onCommentsLoaderClick);

export { initializeModalBigPicture };
