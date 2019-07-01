import xor from 'lodash/xor';
import { createReducer } from '../../utils/store';
import { TOGGLE_FAVORITE, CHANGE_CURRENCY } from './actions';

export const userInitialState = {
    favorites: [],
    currency: 'rub',
};

export const userReducer = createReducer({
    [TOGGLE_FAVORITE]: (payload, state) => ({
        favorites: xor(state.list, [payload]),
    }),
    [CHANGE_CURRENCY]: ({ code }) => ({
        currency: code,
    }),
})(userInitialState);
