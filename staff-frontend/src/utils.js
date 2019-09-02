/* eslint-disable import/prefer-default-export */

export const getImage = (id, height = '128', wm = '', isCloud = false) => {
  if (id.startsWith('CLOUD:')) {
    return `https://ucarecdn.com/${id.replace('CLOUD:','')}/-/resize/${height}/image.jpg`;
  }

  const wmParam = wm ? `-${wm}` : '';
  const heightParam = height ? `-${height}` : '';
  return `https://images.rublevka.ru/${id}${wmParam}${heightParam}`;
};

export const getAvatarImage = (id, size = 128) =>
  (id
    ? `${getImage(id, size)}`
    : 'https://s3.eu-central-1.amazonaws.com/dt-marketing/assets/placeholder-photo.svg');
