export const joinStrings = (...strings) =>
  strings.filter(str => !!str).join(' ');

export const capitalize = string =>
  string.charAt(0).toUpperCase() + string.slice(1);

export const replaceEnd = (string = '', search, replaceWith) =>
  string.replace(new RegExp(`${search}$`), replaceWith);
