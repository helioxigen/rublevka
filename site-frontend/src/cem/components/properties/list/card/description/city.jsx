import React from 'react';

import { FormattedDate, FormattedCurrency } from 'react-formatted';
import { kinds, conditions } from 'cem/constants/properties/dictionaries';

import UI from 'cem/components/ui';
const {
  ParamList, Label,
  Grid: { Container, Row, Col },
} = UI;

import s from 'cem/styles/ui/card';
import sUtils from 'cem/styles/utils';

export default props => (
  <Container fluid>
    <Row>
      <Col sm="12" md="14" lg="15">
        <div className={s.flex}>
          <Row>
            <Col sm="20">
              {/* <p className={s.title}>{props.metro}</p> */}
              <h2 className={s.fullName}>
                {props.location.subLocalityName ? props.location.subLocalityName : '—'},
                &nbsp;{props.location.street ? props.location.street : '—'},
                д. {props.location.house ? props.location.house : '—'},
                кв. {props.location.flatNumber ? props.location.flatNumber : '—'}
              </h2>
            </Col>
          </Row>
          <Row>
            <Col className={sUtils.pushedTopXs2} xs="10" sm="5" md="5" lg="2">
              <ParamList label="ID">{props.id}</ParamList>
            </Col>
            <Col className={sUtils.pushedTopXs2} xs="10" sm="8" md="5" lg="3">
              <ParamList label="Тип">
                {props.kind && kinds[props.kind]}
                {!props.kind && 'Не указан'}
              </ParamList>
            </Col>

            {props.specification && (
              <Col className={sUtils.pushedTopXs2} xs="10" sm="7" md="5" lg="3">
                <ParamList label="Площадь">
                  {props.specification.totalArea && `${props.specification.totalArea} м²`}
                  {!props.specification.totalArea && 'Не указана'}
                </ParamList>
              </Col>
            )}

            {props.specification && (
              <Col className={sUtils.pushedTopXs2Sm2} xs="10" sm="5" md="5" lg="3">
                <ParamList label="Комнат">
                  {props.specification.rooms}
                  {!props.specification.rooms && 'Не указано'}
                </ParamList>
              </Col>
            )}

            {props.information && (
              <Col className={sUtils.pushedTopXs2Md2} xs="10" sm="6" md="5" lg="4">
                <ParamList label="Состояние">
                  {props.information.condition && conditions[props.information.condition]}
                  {!props.information.condition && 'Не указано'}
                </ParamList>
              </Col>
            )}

            {props.updatedAt && (
              <Col className={sUtils.pushedTopXs2Md2} xs="10" sm="9" md="7" lg="4">
                <ParamList label="Обновлен">
                  <FormattedDate value={props.updatedAt} mask="dd.mm.yyyy HH:MM" />
                </ParamList>
              </Col>
            )}
          </Row>
        </div>
      </Col>
      <Col className={sUtils.pushedTopXs2} sm="8" md="6" lg="5">
        <Row>
          {props.saleOffer && !!props.saleOffer.price && (
            <Col xs="20">
              <ParamList label="Продажа" big>
                <FormattedCurrency symbol={props.saleOffer.currency} value={props.saleOffer.price} />
              </ParamList>
            </Col>
          )}
          {props.rentOffer && !!props.rentOffer.price && (
            <Col className={sUtils.pushedTopXs2} xs="20">
              <ParamList label="Аренда" big>
                <FormattedCurrency symbol={props.rentOffer.currency} value={props.rentOffer.price} />
              </ParamList>
            </Col>
          )}
        </Row>
        <Row>
          {!!props.badge && (
            <Label style={{ background: props.badge.color }} className={sUtils.textUppercase}>{props.badge.title}</Label>
          )}
        </Row>
      </Col>
    </Row>
  </Container>
);
