import atoms from '@react-ui/atoms-css-modules';
import themeWidegrid from '@react-ui/theme-widegrid';

import RetinaImage from 'core/components/ui/retinaImage';
import Text from 'core/components/ui/text';

import Button from './button';
import Back from './back';
import List from './list';
import Icon from './icon';
import Heading from './heading';
import FormattedTime from './formattedTime';
import ParamList from './paramList';
import StaticDictionary from './staticDictionary';
import Switcher from './switcher';
import Image from './Image';

// NOTE A temporary measure
import Pager from 'site/ui/pager';
import StaticMask from 'core/components/ui/staticMask2';

export default {
  components: {
    ...atoms.components,
    Button,
    Back,
    List,
    Icon,
    Image,
    RetinaImage,
    Text,
    Heading,
    FormattedTime,
    ParamList,
    StaticDictionary,
    Switcher,
    StaticMask,

    Pager,
  },
  styles: {
    ...atoms.styles,
    ...themeWidegrid,
  },
};
