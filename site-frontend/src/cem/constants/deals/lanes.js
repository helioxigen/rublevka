const defaultLaneFilterNot = {
  'stateDetails.toApprove': 'successful,unsuccessful',
};

export default {
  presentation: {
    kind: 'presentation',
    filter: {
      state: 'presentation',
    },
    filterNot: {
      ...defaultLaneFilterNot,
      state: 'negotiation,deposit_paid,agreement',
    },
  },
  negotiation: {
    kind: 'negotiation',
    filter: {
      state: 'negotiation',
    },
    filterNot: {
      ...defaultLaneFilterNot,
      state: 'presentation,deposit_paid,agreement',
    },
  },
  deposit_paid: {
    kind: 'deposit_paid',
    filter: {
      state: 'deposit_paid',
    },
    filterNot: {
      ...defaultLaneFilterNot,
      state: 'presentation,negotiation,agreement',
    },
  },
  agreement: {
    kind: 'agreement',
    filter: {
      state: 'agreement',
    },
    filterNot: {
      ...defaultLaneFilterNot,
      state: 'presentation,negotiation,deposit_paid',
    },
  },
  approval: {
    kind: 'approval',
    filter: {
      'stateDetails.toApprove': 'successful,unsuccessful',
    },
  },
};
