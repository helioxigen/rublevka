import * as dict from './dictionaries';

import { dictToOptions } from 'core/helpers';

export const states = dictToOptions(dict.states, 'value', 'label');
export const linkKinds = dictToOptions(dict.linkKinds, 'value', 'label');

// kinds
export const kinds = dictToOptions(dict.kinds, 'value', 'label');
const kindsForProperty = kinds.filter(
  ({ value }) => value !== 'preview' && value !== 'negotiation',
);
export const commonKinds = kinds.filter(({ value }) => value !== 'negotiation');

// preview
export const previewStateOptions = dictToOptions(dict.previewStates, 'value', 'label');
export const objectKlassOptions = dictToOptions(dict.objectKlasses, 'value', 'label');

export const getKindsByLinkKind = (linkKind) => {
  if (linkKind === 'deal') return kinds;
  if (linkKind === 'property') return kindsForProperty;

  return commonKinds;
};
