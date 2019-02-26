import errorsDict from 'core/constants/errors';

export const formatListErrorMessage = errors =>
  errors.map(error => errorsDict[error.code]).join(', ');

export const composeErrorMessage = error => {
  const errorMessage = errorsDict[error.code] || error.message;

  if (!errorMessage) {
    return 'Возникла неизвестная ошибка';
  } else if (typeof errorMessage === 'function') {
    return errorMessage(error.details);
  }
  return errorMessage;
};
