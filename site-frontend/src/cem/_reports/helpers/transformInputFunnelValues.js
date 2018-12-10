const toPercentage = (left, right) => (((left / right) || 0) * 100);

export default values => ({
  departmentId: values.departmentId,
  departmentName: values.departmentName,
  staffUserId: values.staffUserId,
  staffUserFullName: values.staffUserFullName,

  clientLeadsCount: values.clientLeadsTotal,

  inProgressCount: values.clientLeadsInProgress,
  inProgressPercentage: parseFloat(toPercentage(values.clientLeadsInProgress, values.clientLeadsTotal)),

  presentationsCount: values.clientLeadsPresentation,
  presentationsPercentage: parseFloat(toPercentage(values.clientLeadsPresentation, values.clientLeadsInProgress)),

  negotiationsCount: values.clientLeadsNegotiation,
  negotiationsPercentage: parseFloat(toPercentage(values.clientLeadsNegotiation, values.clientLeadsInProgress)),

  agreementsCount: values.clientLeadsAgreement,
  agreementsPercentage: parseFloat(toPercentage(values.clientLeadsDepositPaid, values.clientLeadsInProgress)),

  depositsCount: values.clientLeadsDepositPaid,
  depositsPercentage: parseFloat(toPercentage(values.clientLeadsAgreement, values.clientLeadsInProgress)),

  successfulDealsCount: values.clientLeadsSuccessfulDeal,
  successfulDealsPercentage: parseFloat(toPercentage(values.clientLeadsSuccessfulDeal, values.clientLeadsInProgress)),
});
