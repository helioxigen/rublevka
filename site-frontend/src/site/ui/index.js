import initUI from '@react-ui/core';

import customStyles from 'site/styles/ui';

import atoms from './atoms';
import molecules from './molecules';

const styles = {
  ...atoms.styles,
  ...customStyles,
  ...molecules.styles,
};

const UI = initUI(
  atoms.components,
  molecules.components,
)(styles);

export default UI;
