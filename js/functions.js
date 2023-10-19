// длина строки
const STRING = 'проверяемая строка';
const STRING_LENGTH = 20;

const getLengthString = (string, length) => length >= string.length;

getLengthString(STRING, STRING_LENGTH);

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

// Делу — время
const isWorkingHours = (start, end, meetings, length) => {
  const startWorkDay = start.split(':');
  const endWorkDay = end.split(':');
  const startMeetings = meetings.split(':');
  const lengthMeetings = length;

  const timeLeft = ((parseInt(endWorkDay[0], 10) - parseInt(startMeetings[0], 10)) * 60) + (parseInt(endWorkDay[1], 10) + parseInt(startMeetings[1], 10));
  const сheckStart = ((parseInt(startMeetings[0], 10) - parseInt(startWorkDay[0], 10)) * 60) + (parseInt(startWorkDay[1], 10)) + parseInt(startMeetings[1], 10);

  return timeLeft >= lengthMeetings && сheckStart >= 0;
};

isWorkingHours('08:00', '17:30', '14:00', 90); // true
isWorkingHours('8:0', '10:0', '8:0', 120); // true
isWorkingHours('08:00', '14:30', '14:00', 90); // false
isWorkingHours('14:00', '17:30', '08:0', 90); // false
isWorkingHours('8:00', '17:30', '08:00', 900); // false
