import * as types from 'core/constants/favorites';

export const toggleFavorite = id => ({
  type: types.TOGGLE_FAVORITE,
  id,
});

export default { toggleFavorite };
