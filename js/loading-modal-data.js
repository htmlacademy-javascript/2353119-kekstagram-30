import { dataPosts } from './render-gallery.js';

const rootModalElement = document.querySelector('.big-picture');
const commentsListElement = rootModalElement.querySelector('.social__comments');

const getListСomments = (target) => {
  const indexPost = target.dataset.index;

  const commentContainerFragment = document.createDocumentFragment();
  const commentItemElement = commentsListElement.querySelector('.social__comment');
  const commentShownCount = rootModalElement.querySelector('.social__comment-shown-count');

  commentsListElement.innerHTML = '';

  dataPosts[indexPost].comments.forEach(({ avatar, message, name }) => {
    const cloneCommentTemplate = commentItemElement.cloneNode(true);

    cloneCommentTemplate.querySelector('.social__picture').src = avatar;
    cloneCommentTemplate.querySelector('.social__picture').alt = name;
    cloneCommentTemplate.querySelector('.social__text').textContent = message;

    commentContainerFragment.append(cloneCommentTemplate);
  });

  commentsListElement.append(commentContainerFragment);
  commentShownCount.textContent = commentsListElement.children.length;
};

const loadingModalData = (evt) => {
  const isTargetParentСontainer = evt.target.closest('.picture');

  const modalPicture = rootModalElement.querySelector('.big-picture__img img');
  const modalCaption = rootModalElement.querySelector('.social__caption');
  const likesCount = rootModalElement.querySelector('.likes-count');
  const commentTotalCount = rootModalElement.querySelector('.social__comment-total-count');

  if (isTargetParentСontainer) {
    modalPicture.src = isTargetParentСontainer.querySelector('.picture__img').src;
    modalCaption.textContent = isTargetParentСontainer.querySelector('.picture__img').alt;
    likesCount.textContent = isTargetParentСontainer.querySelector('.picture__likes').textContent;
    commentTotalCount.textContent = isTargetParentСontainer.querySelector('.picture__comments').textContent;

    getListСomments(isTargetParentСontainer);
  }
};

export { loadingModalData };
