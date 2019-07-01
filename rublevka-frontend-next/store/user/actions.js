export const TOGGLE_FAVORITE = 'User.Favorites.Toggle';
export const CHANGE_CURRENCY = 'User.Currency.Changed';

export const toggleFavorite = ({ id, dealType }) => ({
    type: TOGGLE_FAVORITE,
    payload: {
        id,
        dealType,
    },
});

export const toggleCurrency = ({ code }) => ({
    type: CHANGE_CURRENCY,
    payload: {
        code,
    },
});
