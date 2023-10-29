import { getRandomInt, getUniqueValue } from './util.js';

const NAMES = ['Александр', 'Екатерина', 'Михаил', 'Анна', 'Дмитрий', 'Ольга', 'Иван', 'Мария', 'Сергей', 'Елена',];
const DESCRIPTIONS = [
  'Расцветающее яблочное дерево в саду.',
  'Закат на океане.',
  'Улочки старого города.',
  'Дети, бегущие под дождем.',
  'Горы в облаках.',
  'Старик с улыбкой',
  'Абстрактная живопись с яркими красками',
  'Осенний лес с золотистыми листьями',
  'Ночной городской пейзаж с огнями небоскребов',
  'Счастливая семья на пикнике',
];
const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо.Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра.В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают.Как можно было поймать такой неудачный момент ? !',
];

const NUMBER_POST = 25;
const MAXIMUM_NUMBER_COMMENTS = 30;
const MAXIMUM_NUMBER_LIKES = 200;
const MINIMUM_NUMBER_LIKES = 15;
const MAXIMUM_INDEX_DESCRIPTIONS = DESCRIPTIONS.length - 1;
const MAXIMUM_INDEX_NAMES = NAMES.length - 1;
const MAXIMUM_INDEX_MESSAGES = MESSAGES.length - 1;
const MAXIMUM_INDEX_AVATAR = 6 + 1;
const MINIMUM_INDEX_AVATAR = 0 + 1;
const NUMBER_UNIQUE_ID = 25;

const generatePhotoId = getUniqueValue(NUMBER_UNIQUE_ID);
const generateUrlId = getUniqueValue(NUMBER_UNIQUE_ID);

const createComments = (max, min = 1) => {
  const generateCommentsId = getUniqueValue(NUMBER_UNIQUE_ID);
  const commentsArray = [];
  const randomNumberComments = getRandomInt(max, min);

  for (let i = 0; i < randomNumberComments; i++) {
    commentsArray.push({
      commentsId: generateCommentsId(),
      avatar: `img/avatar-${getRandomInt(MINIMUM_INDEX_AVATAR, MAXIMUM_INDEX_AVATAR)}.svg`,
      message: MESSAGES[getRandomInt(MAXIMUM_INDEX_MESSAGES)],
      name: NAMES[getRandomInt(MAXIMUM_INDEX_NAMES)],
    });
  }

  return commentsArray;
};

const createUserPost = () => ({
  id: generatePhotoId(),
  url: `photos/${generateUrlId()}.jpg`,
  description: DESCRIPTIONS[getRandomInt(MAXIMUM_INDEX_DESCRIPTIONS)],
  likes: getRandomInt(MAXIMUM_NUMBER_LIKES, MINIMUM_NUMBER_LIKES),
  comments: createComments(MAXIMUM_NUMBER_COMMENTS),
});

const generateUserPosts = () => Array.from({ length: NUMBER_POST }, createUserPost);

export { generateUserPosts };
