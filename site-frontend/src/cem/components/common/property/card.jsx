import React, { Component } from 'react';

import { Link } from 'react-router';

import CountIndicator from 'cem/components/common/countIndicator';

import UI from 'cem/components/ui';
const {
  Icon,
  Grid: { Container, Row, Col },
} = UI;

import cn from 'classnames';
import s from 'cem/styles/dashboard/taskCard';
import sUtils from 'cem/styles/utils';

import * as dict from 'cem/constants/properties/dictionaries';

class Card extends Component {
  render() {
    const {
      data: {
        id, category, kind,
        location = {}, specification = {}, information = {},
      } = {},
    } = this.props;

    return (
      <Link to={`/properties/${category}/${id}`} className={s.card}>
        <Container fluid>
          <Row sm="middle">
            <Col sm="16" md="18">
              <Row sm="middle">
                <Col sm="4" md="5" lg="3" className={s.textMd}>
                  {dict.kinds[kind] || ''}
                </Col>
                <Col sm="10" md="10" lg="8" className={cn(s.textMd, sUtils.pushedTopXs2)}>
                  {location.subLocalityName ? `${location.subLocalityName}, ` : ''}
                  {location.street ? `${location.street}` : ''}
                  {location.house ? `, д. ${location.house}` : ''}
                  {location.flatNumber ? `, кв. ${location.flatNumber}` : ''}
                </Col>
                <Col sm="6" md="5" lg="3" className={cn(s.textMd, sUtils.pushedTopXs2)}>
                  {specification.rooms ? <CountIndicator count={specification.rooms} declensionForms={['комната', 'комнаты', 'комнат']} /> : ''}
                </Col>
                <Col sm="4" md="5" lg="3" className={cn(s.textMd, sUtils.pushedTopXs2Md2)}>
                  {specification.totalArea ? `${specification.totalArea} м²` : ''}
                </Col>
                <Col sm="10" md="5" lg="2" className={cn(s.textMd, sUtils.pushedTopXs2Md2)}>
                  {dict.conditions[information.condition] || ''}
                </Col>
              </Row>
            </Col>
            <Col sm="4" md="2" className={cn(sUtils.textRightMd, sUtils.pushedTopXs2)}>
              <span className={s.textMd}>ID: {id}</span>
              <Icon className={s.icon} icon="chevron-down" />
            </Col>
          </Row>
        </Container>
      </Link>
    );
  }
}

export default Card;
