import React from 'react';
import { Link } from 'react-router';

import moment from 'moment';

import cn from 'classnames';
import UI from 'cem/components/ui';
const { Icon, Grid: { Container, Row, Col } } = UI;

import s from 'cem/styles/ui/card2';
import sUtils from 'cem/styles/utils';

import { states as statesDict } from 'cem/_newsletters/constants/dictionaries';

export default (props) => {
  const { data = {} } = props;

  return (
    <Link to={`/newsletters/${data.id}`} className={s.card}>
      <Container fluid>
        <Row sm="middle">
          <Col sm={11}>
            <span className={s.textMd}>
              {data.title}
            </span>
          </Col>
          <Col sm={3}>
            <span className={s.textMd}>
              {statesDict[data.state].title}
            </span>
          </Col>
          <Col sm={3}>
            <span className={s.textMd}>
              {moment(data.scheduledAt).format('DD.MM.YYYY HH:mm')}
            </span>
          </Col>
          <Col sm={3} className={cn(sUtils.textRight, sUtils.pushedTopXs2)}>
            <span className={s.textMd}>ID: {data.id}</span>
            <Icon className={s.icon} icon="chevron-down" />
          </Col>
        </Row>
      </Container>
    </Link>
  );
};
