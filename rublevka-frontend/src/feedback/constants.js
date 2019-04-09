import global from 'window-or-global';

export const offices = {
  moscow: {
    latitude: 55.756802,
    longitude: 37.564751,
    address: 'Москва, ул. Рочдельская, 15',
    phoneNumber: '74951342693',
    email: `info@${global.config.domain}`,
    name: 'Офис в Москве',
  },
  zhukovka: {
    latitude: 55.736649,
    longitude: 37.246916,
    address: 'Жуковка, Рублёво-успенское ш., 71',
    phoneNumber: '74951059547',
    email: `info@${global.config.domain}`,
    name: 'Офис в Жуковке',
  },
  zhukovkaJQ: {
    latitude: 55.73605,
    longitude: 37.2463,
    address: 'Рублёво-Успенское шоссе, Жуковка, 54 Б, 2 этаж',
    phoneNumber: '74951059547',
    email: `info@${global.config.domain}`,
    name: 'Офис в Жуковке',
  },
};
