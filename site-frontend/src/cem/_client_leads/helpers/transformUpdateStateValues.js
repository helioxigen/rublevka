export default (values) => {
  const expectedFinishDateAt = new Date(values.expectedFinishDateAt);
  const { contactKindId } = values;

  return {
    contactKindId,
    dealDetails: {
      ...values,
      expectedFinishDateAt: `${expectedFinishDateAt.getFullYear()}-${expectedFinishDateAt.getMonth()}-${expectedFinishDateAt.getDate()}`,
    },
  };
};
