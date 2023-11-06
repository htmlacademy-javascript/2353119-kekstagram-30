import { dataPosts } from './render-gallery.js';

const START_NUMBER_COMMENTS = 5;
const rootModalElement = document.querySelector('.big-picture');
const commentsListElement = rootModalElement.querySelector('.social__comments');

const getListСomments = (target) => {
  const indexPost = target.dataset.index;

  const commentContainerFragment = document.createDocumentFragment();
  const commentItemElement = commentsListElement.querySelector('.social__comment');

  commentsListElement.innerHTML = '';

  dataPosts[indexPost].comments.forEach(({ avatar, message, name }, i) => {
    const cloneCommentTemplate = commentItemElement.cloneNode(true);

    if (i >= START_NUMBER_COMMENTS) { // TODO Техдолг: 1. разбить - добавлять в шаблон по одному элементу 2. Отрисовывем нужное колличество (каждый раз перерисовывая страницу) 3. Добавить счетчик отрисованных
      cloneCommentTemplate.classList.add('hidden');
    }

    cloneCommentTemplate.querySelector('.social__picture').src = avatar;
    cloneCommentTemplate.querySelector('.social__picture').alt = name;
    cloneCommentTemplate.querySelector('.social__text').textContent = message;

    commentContainerFragment.append(cloneCommentTemplate);
  });

  commentsListElement.append(commentContainerFragment);
};

const updatesCounterCommentsShown = () => {
  const commentShownCount = rootModalElement.querySelector('.social__comment-shown-count');
  const numberAllСomments = rootModalElement.querySelectorAll('.social__comment').length;
  const numberHiddenComments = rootModalElement.querySelectorAll('.social__comment.hidden').length;
  const numberVisibleComments = numberAllСomments - numberHiddenComments;

  commentShownCount.textContent = numberVisibleComments;
};

const loadingModalData = (evt) => {
  const targetParentСontainer = evt.target.closest('.picture');

  const modalPicture = rootModalElement.querySelector('.big-picture__img img');
  const modalCaption = rootModalElement.querySelector('.social__caption');
  const likesCount = rootModalElement.querySelector('.likes-count');
  const commentTotalCount = rootModalElement.querySelector('.social__comment-total-count');

  if (targetParentСontainer) {
    modalPicture.src = targetParentСontainer.querySelector('.picture__img').src;
    modalPicture.alt = targetParentСontainer.querySelector('.picture__img').alt;
    modalCaption.textContent = targetParentСontainer.querySelector('.picture__img').alt;
    likesCount.textContent = targetParentСontainer.querySelector('.picture__likes').textContent;
    commentTotalCount.textContent = targetParentСontainer.querySelector('.picture__comments').textContent;

    getListСomments(targetParentСontainer);
  }
};

export { loadingModalData, updatesCounterCommentsShown };
