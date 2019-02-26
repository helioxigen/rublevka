import React from 'react';

import Contracts from './contracts';
import Documents from './documents';

import UI from 'cem/components/ui';
const {
  Grid: { Row },
} = UI;

import s from 'cem/styles/id/content';

export default ({
  formKey,
  params: { category },
  isDocumentsUploadAllowed,
}) => (
  <Row>
    <section className={s.section}>
      <Contracts
        propertyId={formKey}
        category={category}
        isDocumentsUploadAllowed={isDocumentsUploadAllowed}
      />
      <Documents
        propertyId={formKey}
        category={category}
        isDocumentsUploadAllowed={isDocumentsUploadAllowed}
      />
    </section>
  </Row>
);
