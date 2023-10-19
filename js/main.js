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

const getRandomInt = (maxInt, minInt = 1) => (Math.floor(Math.random() * (maxInt - minInt + 1)) + minInt) - 1;

const getUniqueValue = (max, min = 1) => {
  const minValue = Math.ceil(min);
  const maxValue = Math.floor(max);
  const previousValues = [];
  let currentValue = getRandomInt(maxValue, minValue);

  return () => {
    if (previousValues.length >= (maxValue - minValue + 1)) { // Остановка цикла если уникальные числа из диапазона от ${minInt} до ${maxInt} закончились;
      return null;
    }

    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInt(maxValue, minValue);
    }

    previousValues.push(currentValue);

    return currentValue;
  };
};

const generatePhotoId = getUniqueValue(25);
const generateUrlIndex = getUniqueValue(25);
const generateCommentsId = getUniqueValue(35);

const createComments = () => ({
  commentsId: generateCommentsId(),
  avatar: `img/avatar-${getRandomInt(6)}.svg`,
  message: MESSAGES[getRandomInt(6)],
  name: NAMES[getRandomInt(10)],
});

const createPostUser = () => ({
  id: generatePhotoId(),
  url: `photos/${generateUrlIndex()}.jpg`,
  description: DESCRIPTIONS[getRandomInt(6)],
  likes: getRandomInt(200, 15),
  comments: Array.from({ length: getRandomInt(30) }, createComments),
});

createPostUser();
