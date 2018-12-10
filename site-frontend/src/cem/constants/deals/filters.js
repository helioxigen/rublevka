export const defaultFilter = {
  presentation: { state: 'presentation' },
  negotiation: { state: 'negotiation' },
  deposit_paid: { state: 'deposit_paid' },
  agreement: { state: 'agreement' },
  approval: { 'stateDetails.toApprove': 'successful,unsuccessful' },
};

export const defaultFilterNot = {
  presentation: { 'stateDetails.toApprove': 'successful,unsuccessful' },
  negotiation: { 'stateDetails.toApprove': 'successful,unsuccessful' },
  deposit_paid: { 'stateDetails.toApprove': 'successful,unsuccessful' },
  agreement: { 'stateDetails.toApprove': 'successful,unsuccessful' },
  approval: {},
};
