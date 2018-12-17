import { loadPropertiesByCategory, loadProperties } from './list/load';
import { resetFilter, updateFilter } from './list/filter';
import createProperty from './list/create';
import loadProperty from './id/load';
import updateProperty from './id/update';
import changeResidentialComplex, { changeResidentialComplexComplete } from './id/changeResidential';
import changeLocation from './id/changeLocation';
import { uploadPhoto, uploadLayout } from './photos';
import {
  searchResidential,
  updateResidential,
  createResidential,
  loadResidential,
} from './residential';
import { loadTasksByPropertyId, updateTasksPagination } from './tasks';
import { loadLeadsByPropertyId } from './leads';
import loadPropertyEvents from './events';

import bannerActions from './banners';

export default {
  loadPropertiesByCategory,
  loadProperties,
  createProperty,
  loadProperty,
  updateProperty,
  changeResidentialComplex,
  changeResidentialComplexComplete,
  changeLocation,
  uploadPhoto,
  uploadLayout,
  searchResidential,
  updateResidential,
  createResidential,
  loadResidential,
  loadTasksByPropertyId,
  updateTasksPagination,
  loadLeadsByPropertyId,
  loadPropertyEvents,

  resetFilter,
  updateFilter,
  ...bannerActions,
};
