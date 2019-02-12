import * as dict from './dictionaries';

import { dictToOptions } from 'core/helpers';

export const states = dictToOptions(dict.states, 'value', 'label');
export const linkKinds = dictToOptions(dict.linkKinds, 'value', 'label');

const commonKinds = ['call', 'email', 'sms', 'meeting', 'free'];
const dealKinds = ['preview', 'negotiation'];

export const kinds = {
  common: [...commonKinds].map(key => ({
    value: key,
    label: dict.kinds[key].title,
  })),
  deal: [...commonKinds, ...dealKinds].map(key => ({
    value: key,
    label: dict.kinds[key].title,
  })),
  all: Object.keys(dict.kinds).map(key => ({
    value: key,
    label: dict.kinds[key].title,
  })),
};
