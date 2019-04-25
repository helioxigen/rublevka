import React from 'react';
import { Col, Row } from 'react-flexbox-grid';
import {
  EditButton,
  EditPropertyRow,
  Property,
  PropertyBigValue,
  PropertyTitle,
  PropertyValue,
  SelectControl,
} from './styled';
import { Body } from '../../UI';
import { selectFixedValueData } from './schema';

const ParkingSection = ({
  enableEditMode, isEditMode, property, onUpdate,
}) => {
  const { additionalDetails } = property;
  const { garageArea, parkingArea } = additionalDetails;
  const update = (key, value) =>
    onUpdate({
      ...property,
      additionalDetails: { ...additionalDetails, [key]: value },
    });

  if (!isEditMode) {
    return (
      <Row>
        <Property xs={3}>
          <PropertyBigValue>Парковка</PropertyBigValue>
        </Property>
        <Col xs={9}>
          <Row>
            <Property xs={6}>
              <PropertyTitle>Машиномест в гараже</PropertyTitle>
              <PropertyValue>
                <Body>{garageArea || 'Не указано'}</Body>
              </PropertyValue>
            </Property>
            <Property xs={6}>
              <PropertyTitle>Машиномест на парковке</PropertyTitle>
              <PropertyValue>
                <Body>{parkingArea || 'Не указано'}</Body>
              </PropertyValue>
            </Property>
            <Col xs={12}>
              <EditButton onClick={enableEditMode}>Редактировать</EditButton>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
  return (
    <EditPropertyRow>
      <Col xs={2}>
        <PropertyBigValue>Парковка</PropertyBigValue>
      </Col>
      <Col xsOffset={1} xs={9}>
        <PropertyTitle>Машиномест в гараже</PropertyTitle>
        <SelectControl
          options={selectFixedValueData}
          selected={garageArea}
          onChange={value => update('garageArea', value)}
        />
        <PropertyTitle>Машиномест на парковке</PropertyTitle>
        <SelectControl
          options={selectFixedValueData}
          selected={parkingArea}
          onChange={value => update('parkingArea', value)}
        />
      </Col>
    </EditPropertyRow>
  );
};

export default ParkingSection;
