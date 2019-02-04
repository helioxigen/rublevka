import { createAction } from 'redux-actions';

export const getPropertyPending = createAction('GET_PROPERTY_PENDING');
export const getPropertySuccess = createAction('GET_PROPERTY_SUCCESS');
export const getPropertyReject = createAction('GET_PROPERTY_REJECT');
