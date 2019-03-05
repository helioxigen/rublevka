import * as types from 'core/constants/favorites';

export const toggleFavorite = (id, dealType) => ({
  type: types.TOGGLE_FAVORITE,
  id,
  dealType,
});

export default { toggleFavorite };
