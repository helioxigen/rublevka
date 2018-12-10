import auth from './auth';
import toastr from './toastr';

import comments from './comments';

import users from './users';
import _users from './_users';

import duty from './duty';

import _clientLeads from 'cem/_client_leads/reducers';
import _contacts from 'cem/_contacts/reducers/contacts';

import _deals from 'cem/_deals/reducers';

import leads from './leads';

import deals from './deals';

import companies from './companies';
import contactsByCompanyId from './contactsByCompanyId';

import contacts from './contacts';
import leadsByContactId from './leadsByContactId';
import dealsByContactId from './dealsByContactId';

import _properties from './_properties';
import properties from './properties';
import contactsByPropertyId from './contactsByPropertyId';
import contractsByPropertyId from './contractsByPropertyId';
import documentsByPropertyId from './documentsByPropertyId';
import tasksByPropertyId from './tasksByPropertyId';
import leadsByPropertyId from './leadsByPropertyId';
import bannersByPropertyId from './bannersByPropertyId';
import propertiesEvents from './propertiesEvents';

import places from './places';
import settlements from './settlements';
import documentsBySettlementId from './documentsBySettlementId';
import propertiesBySettlementId from './propertiesBySettlementId';

import complexes from './complexes';
import complexBuildingsByComplexId from './complexBuildingsByComplexId';
import contactsByComplexId from './contactsByComplexId';

import complexBuildings from './complexBuildings';
import documentsByComplexBuildingId from './documentsByComplexBuildingId';
import propertiesByComplexBuildingId from './propertiesByComplexBuildingId';

import _tasks from './_tasks';
import tasks from './tasks';
import documentByTaskId from './documentByTaskId';

import dictionaries from './dictionaries';
import leadSources from './leadSources';
import departments from './departments';
import divisions from './divisions';
import positions from './positions';
import exportPackages from './exportPackages';

import csi from './csi';
import answers from './answers';

import imagesRequests from './imagesRequests';
import searchRequests from './searchRequests';
import removalRequests from './removalRequests';
import leadsBySearchRequestId from './leadsBySearchRequestId';

export default {
  auth,
  toastr,

  comments,

  users,
  _users,

  duty,

  _clientLeads,
  leads,

  deals,
  _deals,

  companies,
  contactsByCompanyId,

  _contacts,
  contacts,
  leadsByContactId,
  dealsByContactId,

  _properties,
  properties,
  contactsByPropertyId,
  contractsByPropertyId,
  documentsByPropertyId,
  tasksByPropertyId,
  leadsByPropertyId,
  bannersByPropertyId,
  propertiesEvents,

  places,

  settlements,
  documentsBySettlementId,
  propertiesBySettlementId,

  complexes,
  complexBuildingsByComplexId,
  contactsByComplexId,

  complexBuildings,
  documentsByComplexBuildingId,
  propertiesByComplexBuildingId,

  _tasks,
  tasks,
  documentByTaskId,

  dictionaries,
  leadSources,
  departments,
  divisions,
  positions,
  exportPackages,
  csi,

  imagesRequests,
  searchRequests,
  removalRequests,
  answers,
  leadsBySearchRequestId,
};
