import React from 'react';
import { FormattedDate } from 'react-formatted';
import { Link } from 'react-router';

import CountIndicator from 'cem/components/common/countIndicator';

import cn from 'classnames';
import UI from 'cem/components/ui';
const {
  Icon,
  Grid: { Container, Row, Col },
} = UI;

import Photo from '../photo';
import StaticMask from 'core/components/ui/staticMask';

import { kinds } from 'cem/constants/tasks/dictionaries';
import * as dict from 'cem/_contacts/constants/dictionaries';

import s from 'cem/styles/ui/card2';
import sUtils from 'cem/styles/utils';

export default ({ contact = {} }) => {
  const { details = {} } = contact;
  const isArchived = contact.state !== 'active';

  const { lastTaskDeadline, lastTaskKind } = contact;
  const { successfulDealsCount, unsuccessfulDealsCount } = contact;

  const hasTask = !!lastTaskKind;

  const taskKindTitle = hasTask ? kinds[lastTaskKind].title : null;

  return (
    <Link to={`/contacts/${contact.id}`} className={s.card}>
      <Container fluid>
        <Row sm="middle">
          <Col sm={2}>
            <Photo photo={details.photo} kind="circle" size="64" />
          </Col>
          <Col sm={3}>
            <span className={s.textMd}>
              {details.firstName} {details.middleName} {details.lastName}
            </span>
          </Col>
          <Col sm={3}>
            <span className={s.textMd}>
              {dict.contactKinds[contact.kind]}
            </span>
          </Col>
          {!isArchived && (
            <Col sm={5}>
              <span className={s.textMd}>
                <StaticMask pattern="+1 (111) 111-11-11">
                  {details.phoneNumber}
                </StaticMask>
              </span>
            </Col>
          )}
          {isArchived && (
            <Col sm={5}>
              <span className={s.textMd}>
                {!!successfulDealsCount && (
                  <div>
                    <CountIndicator className={s.success} count={successfulDealsCount} declensionForms={['успешная сделка', 'успешных сделки', 'успешных сделок']} />
                  </div>
                )}

                {!!unsuccessfulDealsCount && (
                  <div>
                    <CountIndicator className={s.danger} count={unsuccessfulDealsCount} declensionForms={['неуспешная сделка', 'неуспешных сделки', 'неуспешных сделок']} />
                  </div>
                )}
              </span>
            </Col>
          )}
          <Col sm={4}>
            {!isArchived && (
              <span className={s.textMd}>
                {details.email}
              </span>
            )}
            {isArchived && hasTask && (
              <span className={s.textMd}>
                Последняя задача:
                <br />
                <span className={cn(sUtils.textGrey, sUtils.pushedTopXs2)}>
                  {taskKindTitle} <FormattedDate mask="dd.mm.yyyy HH:MM" value={lastTaskDeadline} />
                </span>
              </span>
            )}
          </Col>
          <Col sm={3} className={cn(sUtils.textRight, sUtils.pushedTopXs2)}>
            <span className={s.textMd}>ID: {contact.id}</span>
            <Icon className={s.icon} icon="chevron-down" />
          </Col>
        </Row>
      </Container>
    </Link>
  );
};
