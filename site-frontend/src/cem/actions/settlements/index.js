import loadSettlements from './list/load';

import loadSettlement from './id/load';
import createSettlement from './id/create';
import updateSettlement from './id/update';
import changeLocation from './id/location';

import uploadDocument from './id/documents/upload';
import loadDocuments from './id/documents/load';
import updateDocument from './id/documents/update';
import deleteDocument from './id/documents/delete';

import uploadPhoto, { uploadPhotoStarted } from './id/photos/upload';

import { loadPrimaryProperties } from './properties/list/load';

export default {
  loadSettlements,
  loadSettlement,
  createSettlement,
  updateSettlement,
  changeLocation,
  loadDocuments,
  uploadDocument,
  updateDocument,
  deleteDocument,
  uploadPhoto,
  uploadPhotoStarted,
  loadPrimaryProperties,
};
