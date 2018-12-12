export const makeDefaultQueryParams = (group, dealType) => {
  const groupParts = group.split('.');
  const id = groupParts[groupParts.length - 1];

  return {
    [`initial.bySettlementId.${id}`]: {
      filter: {
        state: 'public',
        'location.settlementId': id,
        isResale: 'false',
      },
    },
    [`resale.bySettlementId.${id}`]: {
      filter: {
        state: 'public',
        'location.settlementId': id,
        isResale: 'true',
        [`${dealType}Offer.multiCurrencyPrice.usd`]: '0..',
      },
    },
  };
};

export const resourceName = category => `${category}Properties`;
