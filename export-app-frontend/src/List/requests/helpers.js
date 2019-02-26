export const mapDocs = doc => ({
  docID: doc.id,
  ...doc.data(),
});

export const reduceDocs = (acc, data) => {
  if (data.offerKind === 'sale') {
    return {
      ...acc,
      itemsOnSale: [...acc.itemsOnSale, data],
    };
  }
  if (data.offerKind === 'rent') {
    return {
      ...acc,
      itemsOnRent: [...acc.itemsOnRent, data],
    };
  }
  return acc;
};
