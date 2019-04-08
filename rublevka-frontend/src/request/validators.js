export function phoneLength(phoneNumber) {
  if (phoneNumber.match(/\d/g).length !== 11) {
    return 'Телефон введен неправильно';
  }
  return null;
}

export function emailFormat(email) {
  const regexEmail = /\S+@\S+\.\S+/;
  const matchEmail = regexEmail.exec(email);

  if (matchEmail === null) {
    return 'Неправильный формат почты';
  }
  return null;
}
