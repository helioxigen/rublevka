import React from 'react';

import { Link } from 'react-router';

import UI from 'cem/components/ui';
const {
  ParamList,
  Grid: { Container, Row, Col },
} = UI;
import { FormattedDate } from 'react-formatted';

import cn from 'classnames';
import s from 'cem/styles/ui/card';
import sUtils from 'cem/styles/utils';

import { kinds, states } from 'cem/constants/requests/images/dictionaries';

export default ({ data, creatorUserData = {}, responsibleUserData = {} }) => (
  <Link to={`/requests/properties/images/${data.id}`} className={cn(s.card, s[states[data.state].style])}>
    <div className={s.cardWrapper}>
      <Container fluid className={s.flex}>
        <Row>
          <Col sm="4" md="3">
            <ParamList label="Тип" big>{kinds[data.kind]}</ParamList>
          </Col>
          <Col className={sUtils.pushedTopXs2} sm="8" md="4">
            <ParamList label="Заказчик" big>{`${creatorUserData.firstName || ''} ${creatorUserData.lastName || ''}`}</ParamList>
          </Col>
          {responsibleUserData.id &&
            <Col className={sUtils.pushedTopXs2} sm="8" md="4">
              <ParamList label="Ответственный" big>{`${responsibleUserData.firstName || ''} ${responsibleUserData.lastName || ''}`}</ParamList>
            </Col>
          }
        </Row>
        <Row>
          <Col sm="3">
            <ParamList label="ID">{data.id}</ParamList>
          </Col>
          <Col className={sUtils.pushedTopXs2} sm="4" md="4">
            <ParamList label="Дата поступления">
              <FormattedDate mask="dd.mm.yyyy HH:MM" value={data.createdAt} />
            </ParamList>
          </Col>
        </Row>
      </Container>
    </div>
  </Link>
);
