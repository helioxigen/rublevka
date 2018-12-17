import { loadContacts } from './list';
import loadLeadsByContactId from './leads';
import loadDealsByContactId from './deals';
import {
  loadContact,
  createId,
  updateId,
  uploadFile,
  loadDocuments,
  createDocument,
  updateDocument,
  deleteDocument,
  loadLinkedContacts,
  addLinkedContact,
  updateLinkedContact,
  deleteLinkedContact,
} from './id';

export {
  loadContacts,
  loadContact,
  createId,
  updateId,
  uploadFile,
  loadDocuments,
  createDocument,
  updateDocument,
  deleteDocument,
  loadLinkedContacts,
  addLinkedContact,
  updateLinkedContact,
  deleteLinkedContact,
  loadLeadsByContactId,
  loadDealsByContactId,
};
