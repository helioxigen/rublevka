import React from 'react';

import LinkedContacts from 'cem/containers/common/linkedContacts';

export default props => <LinkedContacts resource="settlements" resourceId={Number(props.formKey)} isContactCreationAllowed {...props} />;
