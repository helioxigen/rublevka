import customStyles from 'cem/styles/ui';

import Carousel from 'core/components/ui/carousel';
import Select from 'core/components/ui/select/select';
import AsyncSelect from 'core/components/ui/select/async';

import MapBox from './map';
import Modal from './modal';
import Rating from './rating';
import Tooltip from './tooltip';
import Dropdown from './dropdown';
import Daypicker from './daypicker';
import Checklist from './checklist';
import SortingDropdown from './sortingDropdown';
import PriceInput from './priceInput';

export default {
  components: {
    Checklist,
    PriceInput,
    Modal,
    MapBox,
    Select,
    Rating,
    Tooltip,
    Carousel,
    Dropdown,
    Daypicker,
    AsyncSelect,
    SortingDropdown,
  },
  styles: {
    mapBox: customStyles.map,
    asyncSelect: customStyles.select,
  },
};
