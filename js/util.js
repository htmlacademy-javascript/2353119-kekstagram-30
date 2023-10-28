const getRandomInt = (max, min = 1) => {
  const intMin = Math.ceil(min);
  const intMax = Math.floor(max);

  return Math.floor(Math.random() * (intMax - intMin + 1)) + intMin;
};

const getUniqueValue = (max, min = 1) => {
  const previousValues = [];

  return () => {
    let currentValue = getRandomInt(max, min);

    if (previousValues.length >= (max - min + 1)) { // Остановка цикла если уникальные числа из диапазона от min до max закончились;
      return null;
    }

    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInt(max, min);
    }

    previousValues.push(currentValue);

    return currentValue;
  };
};

const isEscapeKey = (evt) => evt.key === 'Escape';

export { getRandomInt, getUniqueValue, isEscapeKey };
