const MAX_COUNT_HASHTAG = 5;
const MAX_DESCRIPTION_LENGTH = 140;

const FIRST_CHECK = 3;
const SECOND_CHECK = 2;
const THIRD_CHECK = 1;

const hashtagRegex = /^#[a-zа-яё0-9]{1,19}$/i; // TODO: нейминг по критерию?
const ErorrHashtagsMessages = {
  INVALID: 'введён невалидный хэш - тег',
  EXCEEDED_COUNT: 'превышено количество хэш - тегов',
  DUPLICATED: 'хэш - теги повторяются',
};
const ErorrDescriptionMessages = {
  LENGTH: 'длина комментария больше 140 символов',
};

const imgUploadForm = document.querySelector('.img-upload__form');
const fieldHashtags = imgUploadForm.querySelector('input[name="hashtags"]');
const fieldDescription = imgUploadForm.querySelector('textarea[name="description"]');

const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
}, false);

const getArrayHashtags = (value) => value.trim().split(' ').filter(Boolean);

const isMaxHashtags = (value) => MAX_COUNT_HASHTAG >= getArrayHashtags(value).length;

const isValidHashtag = (value) => {
  let matchRegex = true;

  getArrayHashtags(value).forEach((tag) => {
    if (!hashtagRegex.test(tag)) {
      matchRegex = false;
    }
  });

  return matchRegex;
};

const isDuplicatedHashtag = (value) => {
  const arrayHashtags = getArrayHashtags(value);
  const uniqueArrayHashtags = new Set([...arrayHashtags]);

  return arrayHashtags.length === uniqueArrayHashtags.size;
};

pristine.addValidator(
  fieldHashtags,
  isMaxHashtags,
  ErorrHashtagsMessages.EXCEEDED_COUNT,
  FIRST_CHECK,
  false
);

pristine.addValidator(
  fieldHashtags,
  isValidHashtag,
  ErorrHashtagsMessages.INVALID,
  SECOND_CHECK,
  false
);

pristine.addValidator(
  fieldHashtags,
  isDuplicatedHashtag,
  ErorrHashtagsMessages.DUPLICATED,
  THIRD_CHECK,
  false
);

const isMaxDescriptionLength = (value) => MAX_DESCRIPTION_LENGTH >= value.length;

pristine.addValidator(
  fieldDescription,
  isMaxDescriptionLength,
  ErorrDescriptionMessages.LENGTH
);

export { pristine };
