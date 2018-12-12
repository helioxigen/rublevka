import { reduxForm } from 'redux-form';

import DefaultAbout from './about/default';
import phoneCallAbout from './about/phoneCall';
import submitValidator from 'core/decorators/submitValidator';
import formSettings from 'cem/_client_leads/constants/form';

import Header from './header';

export default {
  // by requestKind
  selling: {
    About: reduxForm(formSettings.selling)(submitValidator()(DefaultAbout)),
    Header: reduxForm(formSettings.selling)(submitValidator()(Header)),
  },
  properties: {
    About: reduxForm(formSettings.properties)(submitValidator()(DefaultAbout)),
    Header: reduxForm(formSettings.properties)(submitValidator()(Header)),
  },
  selection: {
    About: reduxForm(formSettings.selection)(submitValidator()(DefaultAbout)),
    Header: reduxForm(formSettings.selection)(submitValidator()(Header)),
  },

  // leadKind if leadKind == phone_call
  phoneCall: {
    About: reduxForm(formSettings.phoneCall)(submitValidator()(phoneCallAbout)),
    Header: reduxForm(formSettings.phoneCall)(submitValidator()(Header)),
  },
  recommendation: {
    About: reduxForm(formSettings.recommendation)(submitValidator()(DefaultAbout)),
    Header: reduxForm(formSettings.recommendation)(submitValidator()(Header)),
  },
};
