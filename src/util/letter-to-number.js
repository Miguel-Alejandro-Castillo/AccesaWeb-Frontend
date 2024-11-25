import _ from 'lodash';

const letterToNumberMap = new Map([
    ['uno', 1],
    ['uno punto veinticinco', 1.25],
    ['uno punto cinco', 1.5],
    ['uno punto setenta y cinco', 1.75],
    ['dos', 2],
    ['dos punto veinticinco', 2.25],
    ['dos punto cinco', 2.5]
]);

export function convertLetterToNumber(text) {
  if (letterToNumberMap.has(_.lowerCase(_.trim(text))))
    return letterToNumberMap.get(_.lowerCase(_.trim(text)));
  return text;
}