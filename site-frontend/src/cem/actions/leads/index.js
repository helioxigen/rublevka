import loadLeads from './list/load';
import _loadLeads from './list/_load';
import loadLead from './id/load';

import createLead from './id/create';
import updateLead from './id/update';
import convertTo from './id/convertTo';

import processLead from './id/process';

export default {
  loadLeads,
  loadLead,
  createLead,
  updateLead,
  processLead,
  convertTo,

  // NOTE New action for leads loading
  _loadLeads,
};
