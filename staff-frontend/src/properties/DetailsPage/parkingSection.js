import React from 'react';
import { Col, Row } from 'react-flexbox-grid';
import {
  EditButton,
  EditPropertyRow,
  Property,
  PropertyBigValue,
  PropertyTitle,
  PropertyValue,
} from './style';
import { Body } from '../../UI';
import Select from '../../UI/Select';
import { selectFixedValueData } from './schema';

const ParkingSection = ({ enableEditMode, isEditMode, property }) => {
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
                <Body>
                  {property.additionalDetails.garageArea || 'Не указано'}
                </Body>
              </PropertyValue>
            </Property>
            <Property xs={6}>
              <PropertyTitle>Машиномест на парковке</PropertyTitle>
              <PropertyValue>
                <Body>
                  {property.additionalDetails.parkingArea || 'Не указано'}
                </Body>
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
        <Select selectData={selectFixedValueData} selected={0} filled />
        <PropertyTitle>Машиномест на парковке</PropertyTitle>
        <Select selectData={selectFixedValueData} selected={0} filled />
      </Col>
    </EditPropertyRow>
  );
};

export default ParkingSection;
