import xorBy from 'lodash/xorBy';
import { createReducer } from '../../utils/store';
import { TOGGLE_FAVORITE, CHANGE_CURRENCY, favoriteTypes, SET_FAVORITE, INIT_USER } from './actions';

export const userInitialState = {
    favoriteFetching: false,
    favoriteItems: [],
    favorite: [],
    currency: 'rub',
};

export const userReducer = createReducer({
    [favoriteTypes.request]: () => ({
        favoriteFetching: true,
    }),
    [favoriteTypes.success]: ({ response: { items } }) => ({
        favoriteItems: items,
    }),
    [SET_FAVORITE]: ({ payload: { favorite } }) => ({
        favorite,
    }),
    [TOGGLE_FAVORITE]: ({ payload }, state) => ({
        favorite: xorBy(state.favorite, [payload], i => `${i.id}.${i.dealType}`),
    }),
    [CHANGE_CURRENCY]: ({ payload: { code } }) => ({
        currency: code,
    }),
    [INIT_USER]: ({ payload: { currency, favorite } }) => ({
        favorite,
        currency,
    }),
})(userInitialState);
