import { reduxForm } from 'redux-form';

import DefaultAbout from './default';
import WithoutRequestKind from './withoutRequestKind';
import submitValidator from 'core/decorators/submitValidator';
import formSettings from 'cem/_client_leads/constants/form';

import Header from '../header';

export default {
  // ok
  selling: {
    About: reduxForm(formSettings.selling)(submitValidator()(DefaultAbout)),
    Header: reduxForm(formSettings.selling)(submitValidator()(Header)),
  },

  purchase: {
    About: reduxForm(formSettings.purchase)(submitValidator()(DefaultAbout)),
    Header: reduxForm(formSettings.purchase)(submitValidator()(Header)),
  },

  // to remove
  recommendation: {
    About: reduxForm(formSettings.recommendation)(
      submitValidator()(DefaultAbout),
    ),
    Header: reduxForm(formSettings.recommendation)(submitValidator()(Header)),
  },

  withoutRequestKind: {
    About: reduxForm(formSettings.withoutRequestKind)(
      submitValidator()(WithoutRequestKind),
    ),
    Header: reduxForm(formSettings.withoutRequestKind)(
      submitValidator()(Header),
    ),
  },
};
