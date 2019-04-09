import alert from './alert.css';
import visibility from './visibility.css';
import cardVisibility from './cardVisibility.css';
import navbar from './navbar.css';
import pager from './pager.css';
import button from './button.css';
import form from './form.css';
import list from './list.css';
import checkbox from './checkbox.css';
import dropdown from './dropdown.css';
import slider from './slider.css';
import loading from './loading.css';
import media from './media.css';
import grid from './grid.css';
import modal from './modal.css';
import modal2 from './modal2.css';
import carousel from './carousel.css';
import select from './select.css';
import paramList from './paramList.css';

import theme from '../themes';

export default {
  alert: {
    ...alert,
    ...theme.alert,
  },
  visibility: {
    ...visibility,
    ...theme.visibility,
  },
  cardVisibility: {
    ...cardVisibility,
    ...theme.cardVisibility,
  },
  navbar: {
    ...navbar,
    ...theme.navbar,
  },
  pager: {
    ...pager,
    ...theme.pager,
  },
  button: {
    ...button,
    ...theme.button,
  },
  btnGroup: {
    ...button,
    ...theme.button,
  },
  form: {
    ...form,
    ...theme.form,
  },
  list: {
    ...list,
    ...theme.list,
  },
  checkbox: {
    ...checkbox,
    ...theme.checkbox,
  },
  dropdown: {
    ...dropdown,
    ...theme.dropdown,
  },
  slider: {
    ...slider,
    ...theme.slider,
  },
  slider2: {
    ...slider,
    ...theme.slider,
  },
  loading: {
    ...loading,
    ...theme.loading,
  },
  media: {
    ...media,
    ...theme.media,
  },
  select: {
    ...select,
    ...theme.select,
  },
  grid: {
    ...grid,
    ...theme.grid,
  },
  modal: {
    ...modal,
    ...theme.modal,
  },
  modal2: {
    ...modal2,
    ...theme.modal2,
  },
  carousel: {
    ...carousel,
    ...theme.carousel,
  },
  paramList: {
    ...paramList,
    ...theme.paramList,
  },
};
