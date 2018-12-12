import leads from './leads';
import deals from './deals';
import tasks from './tasks';
import properties from './properties';
import removeRequest from './requests/remove';
import searchRequest from './requests/search';
import complexBuildingPrimaryPropertiesCommonFields from './complexBuildings/properties/primary/common';
import complexBuildingPrimaryPropertiesTable from './complexBuildings/properties/primary/table';
import complexBuilding from './complexBuildings/about';
import settlementPrimaryPropertiesCommonFields from './settlements/properties/primary/common';
import settlementPrimaryPropertiesTable from './settlements/properties/primary/table';
import contacts from 'cem/_contacts/normalization';
import complexes from './complexes';
import users from './users';

export default {
  // 'leadSellingRequest': leads.selling,
  leadSelectionRequest: leads.selection,
  leadModalApproved: leads.process,
  deal: deals.about,
  dealChangeState: deals.about,
  task: tasks.about,
  propertiesCity: {
    ...properties.about,
    ...properties.city.about,
  },
  propertiesCountry: {
    ...properties.about,
    ...properties.country.about,
  },
  removalRequest: removeRequest,
  propertySearchRequest: searchRequest,
  complexBuilding,
  complexBuildingPrimaryPropertiesCommonFields,
  complexBuildingPrimaryPropertiesTable,
  settlementPrimaryPropertiesCommonFields,
  settlementPrimaryPropertiesTable,
  contact: contacts.about,
  complex: complexes.about,
  user: users.about,
};
