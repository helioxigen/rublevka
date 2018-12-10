import React, { Component } from 'react';
import { Link } from 'react-router';

import UI from 'cem/components/ui';
const {
  Icon,
  Grid: { Container, Row, Col },
} = UI;

import cn from 'classnames';
import s from 'cem/styles/ui/card2';
// import sButton from 'cem/styles/buttons';
import sUtils from 'cem/styles/utils';

import CountIndicator from 'cem/components/common/countIndicator';

import * as dict from 'cem/constants/complexBuildings/dictionaries';

class Card extends Component {
  render() {
    const { data } = this.props;

    return (
      <Link to={`/places/complexes/buildings/${data.id}`} className={s.card}>
        <Container fluid>
          <Row sm="middle">
            <Col sm={1}>
              <span className={s.textMd}>
                №{data.location.building}
              </span>
            </Col>
            <Col sm={8}>
              <span className={s.textMd}>
                <CountIndicator count={data.details.floors} declensionForms={['этаж', 'этажа', 'этажей']} />
              </span>
            </Col>
            <Col sm={2}>
              <span className={s.textMd}>
                {!!data.details.deliveryQuarter && `${dict.deliveryQuarters[data.details.deliveryQuarter]}`}
                {!!data.details.deliveryQuarter && !!data.details.builtYear && '/'}
                {!!data.details.builtYear && `${data.details.builtYear}`}
              </span>
            </Col>
            <Col sm={4}>
              <span className={s.textMd}>
                {dict.constructionStages[data.details.constructionStage]}
              </span>
            </Col>
            <Col sm={2} smOffset={1}>
              <span className={s.textMd}>
                <CountIndicator count={data.statistics.propertiesCount} declensionForms={['объект', 'объекта', 'объектов']} />
              </span>
            </Col>
            <Col sm={2} className={cn(sUtils.textRight, sUtils.pushedTopXs2)}>
              <span className={cn(s.textMd, s[dict.states[data.state].style])}>ID: {data.id}</span>
              <Icon className={s.icon} icon="chevron-down" />
            </Col>
          </Row>
        </Container>
      </Link>
    );
  }
}

export default Card;
