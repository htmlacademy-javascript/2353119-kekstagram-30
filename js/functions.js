// длина строки
const STRING = 'проверяемая строка';
const STRING_LENGTH = 20;

const checksLength = (string, length) => length >= string.length;

checksLength(STRING, STRING_LENGTH);

// палиндромом
const WORD = 1221;

const normalizeWord = (word) => word.toString().toUpperCase().replaceAll(' ', '');

const reverseWord = (word) => {
  let result = '';

  for (let i = word.length - 1; i >= 0; i--) {
    result += word[i];
  }

  return result;
};

const isPalindrome = () => reverseWord(normalizeWord(WORD)) === normalizeWord(WORD);

isPalindrome();
