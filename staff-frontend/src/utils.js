/* eslint-disable import/prefer-default-export */

export const getImage = (id, height, wm = 'rublevka') =>
  `https://images.rublevka.ru/${id}-${wm}-${height}`;
