import atoms from '@react-ui/atoms-css-modules';

import Button from './button';
import Text from 'core/components/ui/text';
import RetinaImage from 'core/components/ui/retinaImage';
import CountIndicator from './countIndicator';

import Visibility from './visibility';
import Icon from './icon';
import Checkbox from './checkbox';
import DL from './list';
import ParamList from './paramList';
import MultiSelect from './multiSelect';

// NOTE A temporary measure
import Pager from 'ui/pager';
import * as Navbar from './navbar';

import customStyles from 'styles/ui';

export default {
  components: {
    ...atoms.components,
    Navbar: {
      ...atoms.components.Navbar,
      ...Navbar,
    },
    Button,
    Visibility,
    CardVisibility: Visibility,
    Icon,
    Text,
    Checkbox,
    DL,
    ParamList,
    RetinaImage,
    CountIndicator,
    MultiSelect,

    Pager,
  },
  styles: {
    ...atoms.styles,
    cardVisibility: customStyles.cardVisibility,
    dl: customStyles.list,
  },
};
