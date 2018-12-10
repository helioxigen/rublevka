import React from 'react';
import { Link } from 'react-router';

import { stateStyles } from 'cem/constants/companies/dictionaries';

import UI from 'cem/components/ui';
const {
  ParamList,
  Grid: { Container, Row, Col },
} = UI;

import cn from 'classnames';
import s from 'cem/styles/ui/card';

export default ({ data }) => (
  <Link to={`/companies/${data.id}`} className={cn(s.card, s[stateStyles[data.state]])}>
    <div className={s.cardWrapper}>
      <Container fluid className={s.flex}>
        <Row>
          <Col sm="6">
            <ParamList label="Наменование" big>{data.name}</ParamList>
          </Col>
          <Col sm="4">
            <ParamList label="ИНН" big>{data.inn}</ParamList>
          </Col>
          <Col sm="4">
            <ParamList label="ОГРН" big>{data.ogrn}</ParamList>
          </Col>
          {/* <Col sm="6">
            <ParamList label="Статус" big>{statesDict[data.state]}</ParamList>
          </Col> */}
        </Row>
        <Row>
          <Col sm="2">
            <ParamList label="ID">{data.id}</ParamList>
          </Col>
          {data.phoneNumbers && !!Object.keys(data.phoneNumbers).length &&
            <Col sm="6">
              <ParamList label="Телефоны">{Object.keys(data.phoneNumbers).map(key => data.phoneNumbers[key]).join(', ')}</ParamList>
            </Col>
          }
        </Row>
      </Container>
    </div>
  </Link>
);
