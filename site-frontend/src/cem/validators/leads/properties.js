import { validateContactDetails } from './common';
export default values => ({
  contactDetails: validateContactDetails(values.contactDetails, values.state),
});
