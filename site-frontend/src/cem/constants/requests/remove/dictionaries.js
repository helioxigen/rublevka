export const lanes = {
  managerApproval: {
    style: 'warning',
    title: 'На подтверждении у руководителя',
  },
  hubManagerApproval: {
    style: 'warning',
    title: 'На подтверждении у директора хаба',
  },
};

export const states = {
  new: {
    style: 'warning',
    title: 'На подтверждении у руководителя',
  },
  approved: {
    style: 'warning',
    title: 'На подтверждении у директора хаба',
  },
  finished: {
    style: 'success',
    title: 'Удален',
  },
  rejected: {
    style: 'danger',
    title: 'Отказано',
  },
};

export const laneFilters = {
  managerApproval: {
    state: 'new',
  },
  hubManagerApproval: {
    state: 'approved',
  },
  archive: {
    state: 'rejected,finished',
  },
};

export const kinds = {
  duplicate: 'Дубль',
  lost: 'Потерян',
};
