import loadComplexes from './list/load';

import loadComplex from './id/load';
import createComplex from './id/create';
import updateComplex from './id/update';

import uploadPhoto, { uploadPhotoStarted } from './id/photos/upload';

export default {
  loadComplexes,
  loadComplex,
  createComplex,
  updateComplex,

  uploadPhoto,
  uploadPhotoStarted,
};
