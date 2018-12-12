import List from './list';

import IdContainer from './id';

import About from 'cem/components/properties/id/about';
import Photos from 'cem/components/properties/id/photos';
import Documents from 'cem/components/properties/id/documents';
import Requests from 'cem/components/common/leads/requests';
import Tasks from 'cem/_tasks/timeline';
import History from 'cem/components/properties/id/history';
import Marketing from 'cem/components/properties/id/marketing';

export default {
  List,
  Id: {
    Container: IdContainer,
    About,
    Photos,
    Documents,
    Requests,
    Tasks,
    History,
    Marketing,
  },
};
