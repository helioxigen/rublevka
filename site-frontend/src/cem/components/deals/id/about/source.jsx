import React from 'react';
import { Link } from 'react-router';

import { FormattedDate } from 'react-formatted';

import UI from 'cem/components/ui';
const {
  Heading,
  Icon,
  Grid: { Row, Col },
} = UI;

import s from 'cem/styles/id/content';
import sUtils from 'cem/styles/utils';

import { getLeadDescription } from 'cem/helpers/leads';

export default ({
  id,
  contactDetails = {},
  createdAt,
  requestDetails = {},
  kind,
}) => (
  <section className={sUtils.pushedTopXs4}>
    <Heading size="md">
      Источник
      <Link className={s.linkIcon} to={`/client_leads/${kind}/${id}`}>
        <Icon className={s.icon} icon="arrow" />
      </Link>
    </Heading>
    <Row className={sUtils.pushedTop2_7}>
      <Col xs="20">
        <h4 className={s.heading}>
          {getLeadDescription(kind, requestDetails.requestKind)}
        </h4>
        <p className={s.mediaText}>
          <FormattedDate mask="dd.mm.yy HH:MM" value={createdAt} />
        </p>
        <p className={s.mediaText}>
          {contactDetails.firstName} {contactDetails.lastName}
        </p>
      </Col>
    </Row>
  </section>
);
