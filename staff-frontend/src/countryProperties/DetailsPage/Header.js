import React from 'react';
import { Col, Row } from 'react-flexbox-grid';
import {
  MainSelectTitle,
  MainStatusBar,
  MainTitle,
  PointIcon,
  TitleAddress,
  SelectControl,
} from './styled';
import { kinds, states, dictionaryToOptions } from '../constants/dictionaries';
import pointIcon from './img/point-icon.svg';
import { BodyBig } from '../../UI';

const stateOptions = Object.entries(states).map(([key, value]) => ({
  value: key,
  label: value.title,
}));

export default function Header({ isEditMode, property, onUpdate }) {
  const { kind, state, location } = property;
  const { settlementName, localityName, mkadDistance } = location;
  const update = (key, value) =>
    onUpdate({
      ...property,
      [key]: value,
    });

  if (!isEditMode) {
    return (
      <>
        <MainTitle>
          {kinds[kind]} в посёлке {settlementName}
        </MainTitle>
        <TitleAddress>
          <PointIcon src={pointIcon} />
          <BodyBig>
            {localityName}, {mkadDistance} км от МКАД
          </BodyBig>
        </TitleAddress>
      </>
    );
  }

  return (
    <>
      <Row>
        <Col xs={4}>
          <MainSelectTitle>Тип</MainSelectTitle>
        </Col>
        <Col xs={8}>
          <MainSelectTitle>Статус</MainSelectTitle>
        </Col>
      </Row>
      <MainStatusBar>
        <Col xs={4}>
          <SelectControl
            options={dictionaryToOptions(kinds)}
            selected={kind}
            onChange={value => update('kind', value)}
          />
        </Col>
        <Col xs={8}>
          <SelectControl
            options={stateOptions}
            selected={state}
            onChange={value => update('state', value)}
          />
        </Col>
      </MainStatusBar>
    </>
  );
}
