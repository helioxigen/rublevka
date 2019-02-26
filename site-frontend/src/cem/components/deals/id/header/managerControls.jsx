import React from 'react';
import { FormattedDate } from 'react-formatted';

import { fetchResource } from 'cem/helpers/autocomplete';

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
  data: { stateDetails = {}, state, updatedByUserId, updatedAt },
  isCurrentUserDepartmentManager,
  actions,
}) => {
  const isReasonPresented = !!stateDetails.reason;
  const isNeedToApprove = !!stateDetails.toApprove;
  const isApproved = state === 'successful' || state === 'unsuccessful';
  const isApprovedByUser = !!updatedByUserId;

  return (
    <section>
      {isReasonPresented && (
        <Row>
          <Col sm="14" lg="10" smOffset="3" lgOffset="5">
            <Heading size="sm">Причина:</Heading>
            <p className={sUtils.pushedTop1_5}>{stateDetails.reason}</p>
          </Col>
        </Row>
      )}

      {isNeedToApprove && isCurrentUserDepartmentManager && (
        <Row sm="center" className={sUtils.pushedTop2}>
          <Col sm="12" md="10">
            <Button
              className={sUtils.pushedRight2}
              type="button"
              kind="success"
              size="xs"
              onClick={() =>
                actions.changeState('approve').then(() => actions.load())
              }
            >
              одобрить
            </Button>
            <Button
              type="button"
              kind="danger"
              size="xs"
              onClick={() =>
                actions.changeState('disapprove').then(() => actions.load())
              }
            >
              отклонить
            </Button>
          </Col>
        </Row>
      )}

      {isApproved && isApprovedByUser && (
        <Row>
          <Col sm="14" lg="10" smOffset="3" lgOffset="5">
            <Row>
              <Col sm="6">
                <p className={s.success}>Одобрено</p>
              </Col>
              <Col sm="6" smOffset="1">
                <p className={sUtils.textCenter}>
                  <StaticDictionary
                    fetch={fetchResource('/v1/users/staff', 'name')}
                    value={updatedByUserId}
                    labelKey="firstName"
                  />{' '}
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
