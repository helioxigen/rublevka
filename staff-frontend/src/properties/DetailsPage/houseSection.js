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
} from './style';
import { Body } from '../../UI';
import Select from '../../UI/Select';
import { selectBinaryExistData, selectFixedValueData } from './schema';

const HouseSection = ({ enableHouseEditMode, isEditMode, property }) => {
  if (!isEditMode) {
    return (
      <>
        <Row>
          <Col xs={12}>
            <SubTitle>Дом</SubTitle>
          </Col>
        </Row>
        <Row>
          <Property xs={3}>
            <PropertyTitle>Площадь дома</PropertyTitle>
            <PropertyValue>
              <Body>{property.specification.area} м²</Body>
            </PropertyValue>
          </Property>
          <Property xs={3}>
            <PropertyTitle>Спален</PropertyTitle>
            <PropertyValue>
              <Body>{property.specification.bedrooms || 'Не указано'}</Body>
            </PropertyValue>
          </Property>
          <Property xs={3}>
            <PropertyTitle>Лоджий</PropertyTitle>
            <PropertyValue>
              <Body>{property.specification.loggias || 'Не указано'}</Body>
            </PropertyValue>
          </Property>
          <Property xs={3}>
            <PropertyTitle>Высота потолков</PropertyTitle>
            <PropertyValue>
              <Body>
                {property.specification.ceilingHeight || 'Не указано'}
              </Body>
            </PropertyValue>
          </Property>
          <Property xs={3}>
            <PropertyTitle>Комнат</PropertyTitle>
            <PropertyValue>
              <Body>{property.specification.rooms || 'Не указано'}</Body>
            </PropertyValue>
          </Property>
          <Property xs={3}>
            <PropertyTitle>Балконов</PropertyTitle>
            <PropertyValue>
              <Body>{property.specification.balconies || 'Не указано'}</Body>
            </PropertyValue>
          </Property>
          <Property xs={3}>
            <PropertyTitle>Санузлов</PropertyTitle>
            <PropertyValue>
              <Body>{property.specification.wcs || 'Не указано'}</Body>
            </PropertyValue>
          </Property>
          <Property xs={3}>
            <PropertyTitle>Лифт</PropertyTitle>
            <PropertyValue>
              <Body>{property.specification.elevators || 'Не указано'}</Body>
            </PropertyValue>
          </Property>
        </Row>
        <Row>
          <Col xs={12}>
            <EditButton onClick={enableHouseEditMode}>Редактировать</EditButton>
          </Col>
        </Row>
      </>
    );
  }
  return (
    <EditPropertyRow>
      <Col xs={2}>
        <SubTitle>Дом</SubTitle>
      </Col>
      <Col xsOffset={1} xs={2}>
        <PropertyTitle>Площадь дома</PropertyTitle>
        <EditPropertyInput placeholder="Площадь, м" />
        <PropertyTitle>Высота потолков</PropertyTitle>
        <EditPropertyInput placeholder="Высота, м" />
        <PropertyTitle>Комнат</PropertyTitle>
        <EditPropertyInput placeholder="Комнат, шт." />
        <PropertyTitle>Спален</PropertyTitle>
        <EditPropertyInput placeholder="Спален, шт." />
      </Col>
      <Col xsOffset={1} xs={3}>
        <PropertyTitle>Лоджий</PropertyTitle>
        <Select selectData={selectFixedValueData} selected={0} filled />
        <PropertyTitle>Балконов</PropertyTitle>
        <Select selectData={selectFixedValueData} selected={0} filled />
        <PropertyTitle>Ванных</PropertyTitle>
        <Select selectData={selectFixedValueData} selected={0} filled />
        <PropertyTitle>Санузлов</PropertyTitle>
        <Select selectData={selectFixedValueData} selected={0} filled />
      </Col>
      <Col xs={3}>
        <PropertyTitle>Лифт</PropertyTitle>
        <Select selectData={selectBinaryExistData} selected={1} filled />
      </Col>
    </EditPropertyRow>
  );
};
export default HouseSection;
