import api from '@api';
import { query } from '@utils';

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

    localStorage.setItem('favorite', JSON.stringify(favorite));
};

export const setFavorite = favorite => ({
    type: SET_FAVORITE,
    payload: {
        favorite,
    },
});

export const toggleCurrency = ({ code }) => ({
    type: CHANGE_CURRENCY,
    payload: {
        code,
    },
});

const createApiCallTypes = (reducerName, resultName, noCache = true) => {
    const types = {
        request: `${reducerName}.${resultName}.LoadRequest`,
        success: `${reducerName}.${resultName}.LoadSuccess`,
        error: `${reducerName}.${resultName}.LoadError`,
        ...(noCache ? {} : { error: `${reducerName}.${resultName}.LoadCacheRestore` }),
    };

    return {
        ...types,
        value: [types.request, types.success, types.error],
    };
};

export const favoriteTypes = createApiCallTypes('User', 'Favorite');

export const fetchFavorite = ids => ({
    types: favoriteTypes.value,
    shouldCall: state => !state.user.favorite.lists,
    call: () => api.properties.getMany(1, { filter: { id: ids.join(',') } }),
    payload: {},
});
