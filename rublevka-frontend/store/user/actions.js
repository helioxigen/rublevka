import nookies from 'nookies';
import api from '@api';
import { createApiCallTypes } from '@utils';

export const TOGGLE_FAVORITE = 'User.Favorites.Toggle';
export const SET_FAVORITE = 'User.Favorites.Set';
export const CHANGE_CURRENCY = 'User.Currency.Changed';

export const toggleFavorite = ({ id, dealType }) => (dispatch, getState) => {
    dispatch({
        type: TOGGLE_FAVORITE,
        payload: {
            id,
            dealType,
        },
    });

    const { favorite } = getState().user;

    nookies.set({}, 'favorite', JSON.stringify(favorite));
};

export const setFavorite = favorite => dispatch => {
    dispatch({
        type: SET_FAVORITE,
        payload: {
            favorite,
        },
    });

    nookies.set({}, 'favorite', JSON.stringify(favorite));
};

export const setCurrency = code => dispatch => {
    dispatch({
        type: CHANGE_CURRENCY,
        payload: {
            code,
        },
    });

    nookies.set({}, 'currency', code);
};

export const INIT_USER = 'User.Init';
export const initUser = (favorite, currency) => ({
    type: INIT_USER,
    payload: {
        favorite,
        currency,
    },
});

export const favoriteTypes = createApiCallTypes('User', 'Favorite');

export const fetchFavorite = ids => ({
    types: favoriteTypes.value,
    shouldCall: state => !state.user.favorite.lists,
    call: () => api.properties.getMany(1, { filter: { id: ids.join(',') } }),
    payload: {},
});
