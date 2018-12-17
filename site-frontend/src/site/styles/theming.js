import global from 'window-or-global';

export const common = {
  brandPrimary: '#ff4c4e',
  brandWhite: '#fff',
  brandBlack: '#232323',
  brandSuccess: '#00c853',
  brandWarning: '#ff9800',
  brandInfo: '#5bc0de',
  grey: '#e8e8e8',
  greyDark: '#4a4a4a',
  greyLight: '#e3e3e3',
  greyBlue: '#687981',
  greyBlueDark: '#566973',
  starDust: '#9b9b9b',
  bodyBg: '#fafafa',
  footerBg: '#252525',
  doveGray: '#636363',
  nobel: '#b5b5b5',
  silver: '#aaaaaa',
  silverChalice: '#afafaf',
  gallery: '#edecec',

  brandPrimaryHover: '#f24345',
  brandPrimaryFocus: '#e53e40',
  brandSuccessHover: '#00b44b',
  brandSuccessFocus: '#00a745',
};

export const themes = {
  'jq.estate': {
    brandPrimary: '#ff4c4e',
    brandPrimaryHover: '#f24345',
  },
  'rublevka.ru': {
    brandPrimary: '#5f5d8a',
    brandPrimaryHover: '#53517d',
  },
  'riga.ru': {
    brandPrimary: '#5f5d8a',
    brandPrimaryHover: '#53517d',
  },
  'kievka.ru': {
    brandPrimary: '#5f5d8a',
  },
  'minka.ru': {
    brandPrimary: '#5f5d8a',
  },
};

export default { ...common, ...themes[global.config.domain] };
