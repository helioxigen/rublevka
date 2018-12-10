export const states = {
  presentation: {
    style: 'primary',
    title: 'Показы',
  },
  negotiation: {
    style: 'warning',
    title: 'Переговоры',
  },
  deposit_paid: {
    style: 'warning',
    title: 'Внесен задаток',
  },
  agreement: {
    style: 'success',
    title: 'Заключение договора',
  },
  successful: {
    style: 'success',
    title: 'Сделка состоялась',
  },
  unsuccessful: {
    style: 'danger',
    title: 'Сделка не заключена',
  },
};

export const lanes = {
  presentation: {
    style: 'primary',
    title: 'Показы',
    statsKey: 'presentation',
  },
  negotiation: {
    style: 'warning',
    title: 'Переговоры',
    statsKey: 'negotiation',
  },
  deposit_paid: {
    style: 'warning',
    title: 'Внесен задаток',
    statsKey: 'depositPaid',
  },
  agreement: {
    style: 'success',
    title: 'Заключение договора',
    statsKey: 'agreement',
  },
  approval: {
    title: 'Ожидает подтверждения',
  },
};

export const offerKinds = {
  purchase: 'Покупка',
  rent: 'Аренда',
};
