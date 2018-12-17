import translit from 'translitit-cyrillic-russian-to-latin';

export const nameToSlug = string =>
  translit(string)
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .toLowerCase();
