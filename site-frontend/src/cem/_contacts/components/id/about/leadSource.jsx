import React, { Component } from 'react';
import { Link } from 'react-router';
import { FormattedDate } from 'react-formatted';

// constants
import {
  leadKinds,
  requestKinds,
} from 'cem/_client_leads/constants/dictionaries';

// UI
import UI from 'cem/components/ui';

// styles
import s from 'cem/styles/id/content';

// UI
const {
  Grid: { Row, Col },
  Heading,
  Icon,
} = UI;

export default class extends Component {
  render() {
    const { clientLead = {} } = this.props || {};

    if (clientLead) {
      const hasRequestKind = !!clientLead.requestDetails.requestKind;

      const leadKindTitle = leadKinds[clientLead.kind].title;
      const requestKindTitle = hasRequestKind
        ? requestKinds[clientLead.requestDetails.requestKind].title
        : null;

      return (
        <Row>
          <Col xs="20">
            <Heading size="md">
              Источник
              <Link
                className={s.linkIcon}
                to={`/client_leads/${clientLead.kind}/${clientLead.id}`}
              >
                <Icon className={s.icon} icon="arrow" />
              </Link>
            </Heading>
            <h4 className={s.heading}>
              {leadKindTitle}&nbsp;
              {hasRequestKind && <span>({requestKindTitle})</span>}
            </h4>
            <p className={s.description}>
              <FormattedDate
                mask="dd.mm.yy HH:MM"
                value={clientLead.createdAt}
              />
            </p>
            <p className={s.description}>
              {clientLead.contactDetails.firstName}&nbsp;
              {clientLead.contactDetails.lastName}
            </p>
          </Col>
        </Row>
      );
    }

    return null;
  }
}
