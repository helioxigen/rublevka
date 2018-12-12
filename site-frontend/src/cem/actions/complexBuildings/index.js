import loadComplexBuildings from './list/load';

import loadComplexBuilding from './id/load';
import createComplexBuilding from './id/create';
import updateComplexBuilding from './id/update';

import uploadPhoto, { uploadPhotoStarted } from './id/photos/upload';

import loadDocuments from './id/documents/load';
import uploadDocument from './id/documents/upload';
import updateDocument from './id/documents/update';
import deleteDocument from './id/documents/delete';

import { loadPrimaryProperties } from './id/properties/list/load';
import createPrimaryProperty from './id/properties/id/create';

export default {
  loadComplexBuildings,
  loadComplexBuilding,
  createComplexBuilding,
  updateComplexBuilding,

  uploadPhoto,
  uploadPhotoStarted,

  loadDocuments,
  uploadDocument,
  updateDocument,
  deleteDocument,

  loadPrimaryProperties,
  createPrimaryProperty,
};
