export const extractIdFromLocation = (location) => {
  const locationSplit = location.split('/');
  const id = locationSplit[locationSplit.length - 1];

  return id;
};
