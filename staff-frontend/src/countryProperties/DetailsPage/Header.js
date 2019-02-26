import React from 'react';
import { Col, Row } from 'react-flexbox-grid';
import {
  MainSelectTitle,
  MainStatusBar,
  MainTitle,
  PointIcon,
  TitleAddress,
} from './styled';
import Select from '../../UI/Select';
import { kinds } from '../constants/dictionaries';
import { selectStatusData, selectTypeData } from './schema';
import pointIcon from './img/point-icon.svg';
import { BodyBig } from '../../UI';

export default function Header({ isEditMode, property }) {
  if (!isEditMode) {
    return (
      <>
        <MainTitle>
          {kinds[property.kind]} в посёлке {property.location.settlementName}
        </MainTitle>
        <TitleAddress>
          <PointIcon src={pointIcon} />
          <BodyBig>
            {property.location.localityName}, {property.location.mkadDistance}{' '}
            км от МКАД
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
          <Select selectData={selectTypeData} selected={1} />
        </Col>
        <Col xs={8}>
          <Select selectData={selectStatusData} selected={3} />
        </Col>
      </MainStatusBar>
    </>
  );
}
