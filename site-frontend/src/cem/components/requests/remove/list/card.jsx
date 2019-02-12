import React from 'react';

import { Link } from 'react-router';

import UI from 'cem/components/ui';
const {
  ParamList,
  Grid: { Container, Row, Col },
} = UI;
import { FormattedDate } from 'react-formatted';

import cn from 'classnames';
import s from 'cem/styles/deals/card';
import sUtils from 'cem/styles/utils';

import { kinds } from 'cem/constants/requests/remove/dictionaries';

export default ({ data, creatorUserData = {}, responsibleUserData = {} }) => (
  <Link
    to={`/requests/properties/to_remove/${data.id}`}
    className={cn(s.card, sUtils.height17_5)}
  >
    <Container fluid>
      <Row>
        <Col xs="20">
          <h4 className={s.title}>{kinds[data.kind]}</h4>
        </Col>
        <Col xs="10">
          <ParamList label="Заказчик" small>{`${(creatorUserData.firstName &&
            `${creatorUserData.firstName[0]}.`) ||
            ''} ${creatorUserData.lastName || ''}`}</ParamList>
        </Col>
        <Col xs="10">
          <ParamList
            label={responsibleUserData.id ? 'Ответственный' : ''}
            small
          >{`${(responsibleUserData.firstName &&
            `${responsibleUserData.firstName[0]}.`) ||
            ''} ${responsibleUserData.lastName || ''}`}</ParamList>
        </Col>
      </Row>
      <Row className={sUtils.pushedTop2_7}>
        <Col sm="10">
          <ParamList label="ID" small>
            {data.id}
          </ParamList>
        </Col>
        <Col sm="10">
          <ParamList label="Дата поступления" small>
            <FormattedDate mask="dd.mm.yyyy HH:MM" value={data.createdAt} />
          </ParamList>
        </Col>
      </Row>
    </Container>
  </Link>
);
