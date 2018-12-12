import * as types from 'cem/constants/complexes/actions';

const resetLinkedContacts = complexId => ({
  type: types.RESET_LINKED_CONTACTS,
  complexId,
});

export default resetLinkedContacts;
