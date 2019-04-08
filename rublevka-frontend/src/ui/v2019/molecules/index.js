import Carousel from 'core/components/ui/carousel';
import Select from 'core/components/ui/select/select';
import JQImage from 'core/components/ui/jqImage';

import Dropdown from './dropdown';
import CheckboxGroup from './checkboxGroup';
import Slider from './slider';
import Slider2 from './slider2';
import Modal from './modal';
import Modal2 from './modal2';
import ToggleSelect from './toggleSelect';
import LoadMore from './loadMore';

import customStyles from 'styles/ui/v2019';

export default {
  components: {
    Dropdown,
    CheckboxGroup,
    Slider, // mutable old one
    Slider2, // works fine
    Modal,
    ModalComplexes: Modal2,
    Carousel,
    Select,
    JQImage,
    ToggleSelect,
    LoadMore,
  },
  styles: {
    checkboxGroup: customStyles.checkbox,
    modalComplexes: customStyles.modal2,
  },
};
