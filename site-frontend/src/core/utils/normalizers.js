const formatNumber = (value) => {
  const valueAsArray = String(value).split('').reverse('');
  const result = [];
  valueAsArray.map((char, index) => {
    if (index % 3 === 0) result.push(' ');
    result.push(char);
  });

  return result.reverse().join('').trim();
};

// TODO Refactor this craziness!
const normalizeNumber = (value, previousValue) => {
  const valueAsString = String(value);

  if (valueAsString.length >= 20) {
    return normalizeNumber(valueAsString.substring(0, 19), previousValue);
  } else if (value && !isNaN(value) && valueAsString[valueAsString.length - 1] !== '.') {
    if (valueAsString.indexOf('.') === -1) {
      return parseInt(value, 10);
    }
    return parseFloat(parseFloat(value).toFixed(2));
  } else if (valueAsString[valueAsString.length - 1] === '.') {
    return value;
  } else if (value === '' || value === 0) {
    return undefined;
  }
  return previousValue;
};

const normalizeString = value => value ? String(value) : undefined;

const normalizeStringBool = value => typeof value === 'string' ? value === 'true' : !!value;

const normalizeBool = (value) => {
  if (typeof value === 'boolean') {
    return value;
  } else if (value === 'true') {
    return true;
  }
  return false;
};

const normalizePercent = top => (value, prevValue) => {
  const numberValue = normalizeNumber(value);
  if (!numberValue) return value;
  return numberValue > top ? prevValue : numberValue;
};

const normalizeArray = (value, delimeter = ',') => {
  if (typeof value === 'string') {
    return value.split(delimeter).filter(item => item);
  } else if (Array.isArray(value)) {
    return value.filter(item => item);
  }
  return [];
};

const normalizeName = (value) => {
  if (!value) return value;
  const valueLower = value.toLowerCase();
  const valueCapitalized = valueLower.charAt(0).toUpperCase() + valueLower.slice(1);

  return valueCapitalized;
};

const normalizeDate = value => value && !/\d{4}-\d{2}-\d{2}/.test(value) ? value.toISOString().split('T')[0] : value;

const normalizeYear = ({ isLimitedToPast }) => (value, previousValue) => {
  if (value === '') return '';

  const isFormatCorrect = /^([1,2]|[1,2][0-9]|[1,2][0-9][0-9]|[1,2][0-9][0-9][0-9])$/.test(value);

  return isFormatCorrect && (!isLimitedToPast || value <= new Date().getFullYear()) ? Number(value) : previousValue;
};

const normalizePhone = value => value
  // phoneMask.input(value);
  // return phoneMask.getValue().split(`_`)[0];
  // const onlyNums = value.replace(/[^\d]/g, ``);
  // const countryCode = onlyNums.slice(0, 1);
  // const cityCode = onlyNums.slice(1, 4);
  // const numGroupOne = onlyNums.slice(4, 7);
  // const numGroupTwo = onlyNums.slice(7, 9);
  // const numGroupThree = onlyNums.slice(9, 11);
  //
  // if (onlyNums.length > 10) {
  //   return `+${countryCode}(${cityCode})${numGroupOne}-${numGroupTwo}-${numGroupThree}`;
  // } else if (onlyNums.length > 8) {
  //   return `+${countryCode}(${cityCode})${numGroupOne}-${numGroupTwo}${onlyNums.slice(9)}`;
  // } else if (onlyNums.length > 6) {
  //   return `+${countryCode}(${cityCode})${numGroupOne}${onlyNums.slice(7)}`;
  // } else if (onlyNums.length > 3) {
  //   return `+${countryCode}(${cityCode})${onlyNums.slice(4)}`;
  // } else if (onlyNums.length > 0) {
  //   return `+${countryCode}${onlyNums.slice(1)}`;
  // }
;

const numberArray = (value, delimeter = ',') => normalizeArray(value, delimeter).map(normalizeNumber);

export default {
  formatNumber,
  normalizeNumber,
  normalizeString,
  normalizeStringBool,
  normalizeBool,
  normalizeDate,
  normalizeYear,
  normalizeArray,
  numberArray,
  normalizeName,
  normalizePhone,
  normalizePercent,
};
