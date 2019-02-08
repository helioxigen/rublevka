import React from 'react';
import { Col, Row } from 'react-flexbox-grid';
import {
  MainSelectTitle,
  MainStatusBar,
  MainTitle,
  PointIcon,
  TitleAddress,
} from './style';
import Select from '../../UI/Select';
import { selectStatusData, selectTypeData } from './schema';
import pointIcon from './img/point-icon.svg';
import { BodyBig } from '../../UI';

const TitleSection = ({ isEditMode, property }) => {
  if (!isEditMode) {
    return (
      <>
        <Row>
          <Col xs={12}>
            <MainTitle>
              Продажа дома в {property.location.settlementName}
            </MainTitle>
          </Col>
        </Row>
        <Row>
          <TitleAddress xs={12}>
            <PointIcon src={pointIcon} />
            <BodyBig>
              {property.location.localityName}, {property.location.mkadDistance}
              км от МКАД
            </BodyBig>
          </TitleAddress>
        </Row>
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
};

export default TitleSection;
