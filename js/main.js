const NAMES = [
  'Александр',
  'Екатерина',
  'Михаил',
  'Анна',
  'Дмитрий',
  'Ольга',
  'Иван',
  'Мария',
  'Сергей',
  'Елена',
];

const DESCRIPTION = [
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

const MESSAGE = [
  'Всё отлично!',
  'В целом всё неплохо.Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра.В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают.Как можно было поймать такой неудачный момент ? !',
];

function getRandomInt(max, min = 1) {
  const previousValues = [];

  return function () {
    min = Math.ceil(min);
    max = Math.floor(max);
    let currentValue = (Math.floor(Math.random() * (max - min + 1)) + min) - 1;

    if (previousValues.length >= (max - min + 1)) {
      // console.error(`Превышает число запросов. Уникальные числа из диапазона от ${min} до ${max} закончились`);
      return null;
    }

    while (previousValues.includes(currentValue)) {
      currentValue = (Math.floor(Math.random() * (max - min + 1)) + min) - 1;
    }

    previousValues.push(currentValue);

    return currentValue;
  };
}

const createPostUser = () => {
  const generatePhotoId = getRandomInt(25); // TODO нужно ли выносить значения аргументов в отдельные переменные?
  const generateUrl = getRandomInt(25);
  const generateDescription = getRandomInt(6);
  const generateLikes = getRandomInt(200, 15);
  const generateComments = getRandomInt(30);
  const generateCommentsId = getRandomInt(10); // выносим из функции createComments() для проверки уникальности id.

  const createComments = () => {
    const generateAvatar = getRandomInt(6);
    const generateMessage = getRandomInt(6);
    const generateName = getRandomInt(10);

    return {
      commentsId: generateCommentsId(),
      avatar: `img/avatar-${generateAvatar()}.svg`,
      message: MESSAGE[generateMessage()],
      name: NAMES[generateName()],
    };
  };

  return {
    id: generatePhotoId(),
    url: `photos/${generateUrl()}.jpg`,
    description: DESCRIPTION[generateDescription()],
    likes: generateLikes(),
    comments: Array.from({ length: generateComments() }, createComments),
  };
};

createPostUser();
