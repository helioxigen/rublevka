import React from 'react';
import { Col, Row } from 'react-flexbox-grid';
import {
  EditButton,
  EditPropertyInput,
  EditPropertyRow,
  Property,
  PropertyTitle,
  PropertyValue,
  SubTitle,
} from './styled';
import { Body } from '../../UI';
import Tags from '../../UI/Tags';
import {
  undef,
  landscapeKinds,
  dictionaryToOptions,
} from '../constants/dictionaries';

function createLandscapeKindLabels(list) {
  return list.map((value, index) => (
    <Body key={list[index]}>
      {index > 0 && ', '}
      {landscapeKinds[list[index]]}
    </Body>
  ));
}

const PlotSection = ({
  enableEditMode, isEditMode, property, onUpdate,
}) => {
  const { landDetails } = property;
  const { area, landscapeKind = [] } = landDetails;
  const numLandscapeKinds = Object.keys(landscapeKind).length;
  const update = (key, value) =>
    onUpdate({
      ...property,
      landDetails: { ...landDetails, [key]: value },
    });

  if (!isEditMode) {
    return (
      <>
        <Row>
          <Col xs={12}>
            <SubTitle>Участок</SubTitle>
          </Col>
        </Row>
        <Row>
          <Property xs={5}>
            <PropertyTitle>Площадь</PropertyTitle>
            <PropertyValue>
              <Body>{area ? `${area} сот.` : undef}</Body>
            </PropertyValue>
          </Property>
          <Property xs={5}>
            <PropertyTitle>Тип участка</PropertyTitle>
            <PropertyValue>
              {numLandscapeKinds ? (
                createLandscapeKindLabels(landscapeKind)
              ) : (
                <Body>{undef}</Body>
              )}
            </PropertyValue>
          </Property>
        </Row>
        <Row>
          <Col xs={12}>
            <EditButton onClick={enableEditMode}>Редактировать</EditButton>
          </Col>
        </Row>
      </>
    );
  }
  return (
    <EditPropertyRow>
      <Col xs={2}>
        <SubTitle>Участок</SubTitle>
      </Col>
      <Col xsOffset={1} xs={2}>
        <PropertyTitle>Площадь</PropertyTitle>
        <EditPropertyInput
          defaultValue={area}
          placeholder="Площадь, сот."
          onSubmit={value => update('area', value)}
        />
      </Col>
      <Col xsOffset={1} xs={6}>
        <PropertyTitle>Тип участка</PropertyTitle>
        <Tags
          options={dictionaryToOptions(landscapeKinds)}
          currentValue={landscapeKind}
          // FIXME на самом деле тут должен быть необязательный мультивыбор
          onChange={value => update('landscapeKind', [value])}
        />
      </Col>
    </EditPropertyRow>
  );
};

export default PlotSection;
