import React from 'react';

import { FormattedCurrency } from 'react-formatted';
import { kinds, conditions } from 'cem/constants/properties/dictionaries';

import UI from 'cem/components/ui';
const {
  ParamList,
  Label,
  Grid: { Container, Row, Col },
} = UI;

import s from 'cem/styles/ui/card';
import sUtils from 'cem/styles/utils';

export default props => (
  <Container fluid>
    <Row>
      <Col sm="12" md="14" lg="12">
        <div className={s.flex}>
          <Row>
            <Col sm="20">
              {props.location.routeName && (
                <p className={s.title}>{props.location.routeName}</p>
              )}
              <h2 className={s.fullName}>
                {props.location.settlementName
                  ? props.location.settlementName
                  : '—'}
                {!!props.location.mkadDistance &&
                  `, ${props.location.mkadDistance} км`}
                {!!props.location.house && `, № ${props.location.house}`}
              </h2>
            </Col>
          </Row>
          <Row>
            <Col className={sUtils.pushedTopXs2} xs="10" sm="5" md="5" lg="2">
              <ParamList label="ID">{props.id}</ParamList>
            </Col>
            <Col className={sUtils.pushedTopXs2} xs="10" sm="7" md="5" lg="3">
              <ParamList label="Тип">
                {kinds[props.kind] ? kinds[props.kind] : 'Не указано'}
              </ParamList>
            </Col>
            {(props.kind === 'house' ||
              props.kind === 'townhouse' ||
              props.kind === 'flat' ||
              props.kind === 'penthouse') && (
              <Col className={sUtils.pushedTopXs2} xs="10" sm="5" md="5" lg="3">
                <ParamList label="Площадь">
                  {props.specification.area
                    ? `${props.specification.area} м²`
                    : 'Не указано'}
                </ParamList>
              </Col>
            )}
            {(props.kind === 'land' ||
              props.kind === 'house' ||
              props.kind === 'townhouse') && (
              <Col
                className={sUtils.pushedTopXs2Sm2}
                xs="10"
                sm="5"
                md="5"
                lg="3"
              >
                <ParamList label="Участок">
                  {!!props.landDetails && !!props.landDetails.area
                    ? `${props.landDetails.area} сот`
                    : 'Не указано'}
                </ParamList>
              </Col>
            )}
            <Col className={sUtils.pushedTopXs2Md2} sm="6" md="5" lg="4">
              <ParamList label="Состояние">
                {conditions[props.specification.condition]
                  ? conditions[props.specification.condition]
                  : 'Не указано'}
              </ParamList>
            </Col>
          </Row>
        </div>
      </Col>
      <Col sm="3" md="2" lg="3">
        {!!props.badge && (
          <Label
            style={{ background: props.badge.color }}
            className={sUtils.textUppercase}
          >
            {props.badge.title}
          </Label>
        )}
      </Col>
      <Col className={sUtils.pushedTopXs2} sm="8" md="6" lg="5">
        <Row>
          {!!props.saleOffer && (
            <Col xs="20">
              <ParamList label="Продажа" big>
                <FormattedCurrency
                  symbol={props.saleOffer.currency}
                  value={props.saleOffer.price}
                />
              </ParamList>
            </Col>
          )}
          {!!props.rentOffer && (
            <Col xs="20">
              <ParamList label="Аренда" big>
                <FormattedCurrency
                  symbol={props.rentOffer.currency}
                  value={props.rentOffer.price}
                />
              </ParamList>
            </Col>
          )}
        </Row>
      </Col>
    </Row>
  </Container>
);
