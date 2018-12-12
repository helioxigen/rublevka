import { loadList, loadListStarted, loadListFailed, loadListSucceeded } from './list/load';

import { loadElement, loadElementStarted, loadElementFailed, loadElementSucceeded } from './id/load';
import { createElement, createElementStarted, createElementFailed, createElementSucceeded } from './id/create';
import { updateElement, updateElementStarted, updateElementFailed, updateElementSucceeded } from './id/update';
import { deleteElement, deleteElementStarted, deleteElementFailed, deleteElementSucceeded } from './id/delete';

import { uploadElementPhoto, uploadElementPhotoStarted, uploadElementPhotoFailed, uploadElementPhotoSucceeded } from './id/photo';

import { loadLinkedList, loadLinkedListStarted, loadLinkedListFailed, loadLinkedListSucceeded } from './linkedResource/list/load';
import { createLinkedResourceRecord, createLinkedResourceRecordStarted, createLinkedResourceRecordFailed, createLinkedResourceRecordSucceeded } from './linkedResource/id/create';
import { updateLinkedResourceRecord, updateLinkedResourceRecordStarted, updateLinkedResourceRecordFailed, updateLinkedResourceRecordSucceeded } from './linkedResource/id/update';
import { deleteLinkedResourceRecord, deleteLinkedResourceRecordStarted, deleteLinkedResourceRecordFailed, deleteLinkedResourceRecordSucceeded } from './linkedResource/id/delete';


export {
  loadList, loadListStarted, loadListFailed, loadListSucceeded,

  loadElement, loadElementStarted, loadElementFailed, loadElementSucceeded,
  createElement, createElementStarted, createElementFailed, createElementSucceeded,
  updateElement, updateElementStarted, updateElementFailed, updateElementSucceeded,
  deleteElement, deleteElementStarted, deleteElementFailed, deleteElementSucceeded,

  uploadElementPhoto, uploadElementPhotoStarted, uploadElementPhotoFailed, uploadElementPhotoSucceeded,

  loadLinkedList, loadLinkedListStarted, loadLinkedListFailed, loadLinkedListSucceeded,
  createLinkedResourceRecord, createLinkedResourceRecordStarted, createLinkedResourceRecordFailed, createLinkedResourceRecordSucceeded,
  updateLinkedResourceRecord, updateLinkedResourceRecordStarted, updateLinkedResourceRecordFailed, updateLinkedResourceRecordSucceeded,
  deleteLinkedResourceRecord, deleteLinkedResourceRecordStarted, deleteLinkedResourceRecordFailed, deleteLinkedResourceRecordSucceeded,
};
