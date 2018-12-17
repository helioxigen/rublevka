import React from 'react';
import { FormattedDate } from 'react-formatted';

import { fetchResource } from 'cem/helpers/autocomplete';
import * as dict from 'cem/_client_leads/constants/dictionaries';

import UI from 'cem/components/ui';
const {
  Button,
  StaticDictionary,
  Heading,
  Grid: { Row, Col },
} = UI;

import s from 'cem/styles/id/header';
import sUtils from 'cem/styles/utils';

export default ({
  state,
  stateDetails = {},
  isCurrentUserDepartmentManager,
  updatedByUserId,
  updatedAt,
  process,
}) => {
  const isReasonPresented = !!stateDetails.reason;
  const isNeedToApprove = !!stateDetails.toApprove;
  const isApproved = state === 'rejected' || state === 'spam';
  const isApprovedByUser = !!updatedByUserId;

  return (
    <section>
      {isReasonPresented && (
        <Row>
          <Col sm="12" smOffset="4">
            <Heading size="sm">
              {`${dict.states[stateDetails.toApprove || state].title}`}, причина:
            </Heading>
            <p className={sUtils.pushedTop1_5}>{stateDetails.reason}</p>
          </Col>
        </Row>
      )}

      {isNeedToApprove && isCurrentUserDepartmentManager && (
        <Row sm="center" className={sUtils.pushedTop2}>
          <Col sm="12">
            <Button
              className={sUtils.pushedRight2}
              type="button"
              kind="danger"
              size="xs"
              onClick={() => process('disapprove')}
            >
              не одобрить
            </Button>
            <Button type="button" kind="success" size="xs" onClick={() => process('approve')}>
              одобрить
            </Button>
          </Col>
        </Row>
      )}

      {isApproved && isApprovedByUser && (
        <Row>
          <Col sm="12" smOffset="4">
            <Row>
              <Col sm="6">
                <p className={s.success}>Одобрено</p>
              </Col>
              <Col sm="6" smOffset="1">
                <p className={sUtils.textCenter}>
                  <StaticDictionary
                    fetch={fetchResource('/v1/users/staff', 'name')}
                    value={updatedByUserId}
                    labelKey="lastName"
                  />
                </p>
              </Col>
              <Col sm="6" smOffset="1">
                <p className={sUtils.textRight}>
                  <FormattedDate mask="dd.mm.yyyy HH:MM" value={updatedAt} />
                </p>
              </Col>
            </Row>
          </Col>
        </Row>
      )}
    </section>
  );
};
