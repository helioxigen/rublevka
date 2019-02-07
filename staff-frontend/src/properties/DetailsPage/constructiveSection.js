import React from 'react';
import { Col, Row } from 'react-flexbox-grid';
import {
  EditButton,
  EditPropertyInput,
  EditPropertyRow,
  Property,
  PropertyBigValue,
  PropertyTitle,
  PropertyValue,
} from './style';
import Select from '../../UI/Select';
import { Body } from '../../UI';
import { conditions, roofMaterials, wallMaterials } from '../dictionaries';
import SelectBubble from '../../UI/SelectBubble';
import { selectBinaryData, selectRoogData, selectWallData } from './schema';

const ConstructiveSection = ({ enableEditMode, isEditMode, property }) => {
  if (!isEditMode) {
    return (
      <Row>
        <Property xs={3}>
          <PropertyBigValue>Конструктив</PropertyBigValue>
        </Property>
        <Col xs={9}>
          <Row>
            <Property xs={4}>
              <PropertyTitle>Стены</PropertyTitle>
              <PropertyValue>
                <Body>
                  {wallMaterials[property.specification.wallMaterial] ||
                    'Не указано'}
                </Body>
              </PropertyValue>
            </Property>
            <Property xs={4}>
              <PropertyTitle>Кондиционирование</PropertyTitle>
              <PropertyValue>
                <Body>
                  {conditions[property.specification.condition] || 'Не указано'}
                </Body>
              </PropertyValue>
            </Property>
            <Property xs={4}>
              <PropertyTitle>Год постройки</PropertyTitle>
              <PropertyValue>
                <Body>{property.specification.builtYear || 'Не указано'}</Body>
              </PropertyValue>
            </Property>
            <Property xs={4}>
              <PropertyTitle>Крыша</PropertyTitle>
              <PropertyValue>
                <Body>
                  {roofMaterials[property.specification.roofMaterial] ||
                    'Не указано'}
                </Body>
              </PropertyValue>
            </Property>
            <Property xs={4}>
              <PropertyTitle>Вентиляция</PropertyTitle>
              <PropertyValue>
                <Body>
                  {property.specification.withVentilation
                    ? 'Есть'
                    : 'Отсутствует'}
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
        <PropertyBigValue>Конструктив</PropertyBigValue>
      </Col>
      <Col xsOffset={1} xs={2}>
        <PropertyTitle>Год постройки</PropertyTitle>
        <EditPropertyInput placeholder="Год" />
      </Col>
      <Col xsOffset={1} xs={3}>
        <PropertyTitle>Стены</PropertyTitle>
        <SelectBubble selected={1} selectData={selectWallData} />
        <PropertyTitle>Крыша</PropertyTitle>
        <SelectBubble selected={1} selectData={selectRoogData} />
      </Col>
      <Col xs={3}>
        <PropertyTitle>Кондиционирование</PropertyTitle>
        <Select selectData={selectBinaryData} selected={1} filled />
        <PropertyTitle>Вентиляция</PropertyTitle>
        <Select selectData={selectBinaryData} selected={1} filled />
      </Col>
    </EditPropertyRow>
  );
};

export default ConstructiveSection;
