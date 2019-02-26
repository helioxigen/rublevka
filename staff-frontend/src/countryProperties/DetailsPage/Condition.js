import React from 'react';
import { Col, Row } from 'react-flexbox-grid';
import {
  EditButton,
  EditPropertyRow,
  Property,
  PropertyBigValue,
  PropertyTitle,
  PropertyValue,
} from './styled';
import { Body } from '../../UI';
import SelectEmotion from '../../UI/SelectEmotion';
import { furnitureKinds, renovateKinds } from '../constants/dictionaries';
import Select from '../../UI/Select';
import { selectFinishData, selectFurnitureData, conditions } from './schema';

const ConditionSection = ({ enableEditMode, isEditMode, property }) => {
  if (!isEditMode) {
    return (
      <Row>
        <Property xs={3}>
          <PropertyBigValue>Состояние</PropertyBigValue>
        </Property>
        <Col xs={9}>
          <Row>
            <Property xs={4}>
              <PropertyTitle>Стадия строительства</PropertyTitle>
              <PropertyValue>
                <Body>
                  {renovateKinds[property.specification.renovate] ||
                    'Не указано'}
                </Body>
              </PropertyValue>
            </Property>
            <Property xs={4}>
              <PropertyTitle>Мебель</PropertyTitle>
              <PropertyValue>
                <Body>
                  {property.specification.furniture
                    ? furnitureKinds[property.specification.furniture]
                    : 'Не указано'}
                </Body>
              </PropertyValue>
            </Property>
            <Property xs={4}>
              <PropertyTitle>Состояние</PropertyTitle>
              <PropertyValue>
                <Body>{conditions[property.specification.condition]}</Body>
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
        <PropertyBigValue>Состояние</PropertyBigValue>
      </Col>
      <Col xsOffset={1} xs={9}>
        <PropertyTitle>Мебель</PropertyTitle>
        <Select
          selectData={selectFurnitureData}
          selected={property.specification.furniture}
          filled
        />
        <PropertyTitle>Отделка</PropertyTitle>
        <Select selectData={selectFinishData} selected={0} filled />
        <PropertyTitle>Состояние</PropertyTitle>
        <SelectEmotion selected={property.specification.condition} />
      </Col>
    </EditPropertyRow>
  );
};

export default ConditionSection;
