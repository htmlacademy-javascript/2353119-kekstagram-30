const MAX_COUNT_HASHTAG = 5;
const MAX_LENGTH_HASHTAG = 20;
const MIN_LENGTH_HASHTAG = 2;
const MAX_DESCRIPTION_LENGTH = 140;

const FIRST_CHECK = 4;
const SECOND_CHECK = 3;
const THIRD_CHECK = 2;
const FOURTH_CHECK = 1;
const FIFTH_CHECK = 0;

const HASHTAG_REGEX = /^#[a-zа-яё0-9]{1,19}$/i;

const ErrorHashtagsMessages = {
  INVALID: 'введён невалидный хэш - тег',
  EXCEEDED_COUNT: 'превышено количество хэш - тегов',
  DUPLICATED: 'хэш - теги повторяются',
  MAX_LENGTH_CHARACTERS: 'Максимальная длина 20 символов',
  MIN_LENGTH_CHARACTERS: 'Минимальная длина 2 символа',
};
const ErrorDescriptionMessages = {
  LENGTH: 'длина комментария больше 140 символов',
};

const imgUploadForm = document.querySelector('.img-upload__form');
const fieldHashtags = imgUploadForm.querySelector('input[name="hashtags"]');
const fieldDescription = imgUploadForm.querySelector('textarea[name="description"]');

const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
}, true);

const getNormalizedHashtags = (value) => value.toLowerCase().trim().split(' ').filter(Boolean);

const isMaxCountHashtags = (value) => MAX_COUNT_HASHTAG >= getNormalizedHashtags(value).length;

const isMaxCharactersHashtags = (value) => getNormalizedHashtags(value).every((tag) => MAX_LENGTH_HASHTAG >= tag.length);

const isMinCharactersHashtags = (value) => getNormalizedHashtags(value).every((tag) => MIN_LENGTH_HASHTAG <= tag.length);

const isValidHashtag = (value) => {
  let matchRegex = true;

  getNormalizedHashtags(value).forEach((tag) => {
    if (!HASHTAG_REGEX.test(tag)) {
      matchRegex = false;
    }
  });

  return matchRegex;
};

const isDuplicatedHashtag = (value) => {
  const arrayHashtags = getNormalizedHashtags(value);
  const uniqueArrayHashtags = new Set([...arrayHashtags]);

  return arrayHashtags.length === uniqueArrayHashtags.size;
};

const isMaxDescriptionLength = (value) => value.length < MAX_DESCRIPTION_LENGTH;

pristine.addValidator(
  fieldHashtags,
  isMaxCountHashtags,
  ErrorHashtagsMessages.EXCEEDED_COUNT,
  FIRST_CHECK,
  true
);

pristine.addValidator(
  fieldHashtags,
  isMinCharactersHashtags,
  ErrorHashtagsMessages.MIN_LENGTH_CHARACTERS,
  SECOND_CHECK,
  true
);

pristine.addValidator(
  fieldHashtags,
  isMaxCharactersHashtags,
  ErrorHashtagsMessages.MAX_LENGTH_CHARACTERS,
  THIRD_CHECK,
  true
);

pristine.addValidator(
  fieldHashtags,
  isValidHashtag,
  ErrorHashtagsMessages.INVALID,
  FOURTH_CHECK,
  true
);

pristine.addValidator(
  fieldHashtags,
  isDuplicatedHashtag,
  ErrorHashtagsMessages.DUPLICATED,
  FIFTH_CHECK,
  true
);

pristine.addValidator(
  fieldDescription,
  isMaxDescriptionLength,
  ErrorDescriptionMessages.LENGTH
);

export { pristine };
