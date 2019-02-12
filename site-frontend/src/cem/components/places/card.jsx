import React from 'react';
import { Link } from 'react-router';

import UI from 'cem/components/ui';
const {
  Grid: { Col, Row, Container },
} = UI;

import cn from 'classnames';
import s from 'cem/styles/ui/card';

export default ({ item, kind }) => (
  <Link
    to={`/places/${kind}/${item.id}`}
    className={cn(s.cardPlaces, s.success)}
  >
    <div className={s.padding1_5_1}>
      <Container fluid>
        <Row>
          <Col xs="20">{item.name}</Col>
        </Row>
      </Container>
    </div>
  </Link>
);
