import React from 'react';
import { Col, Row } from 'react-flexbox-grid';
import {
  EditButton,
  EditPropertyInput,
  EditPropertyRow,
  Property,
  PropertyBigValue,
  PropertySubTitle,
  PropertyTitle,
  PropertyValue,
} from './styled';
import Select from '../../UI/Select';
import { Body } from '../../UI';
import {
  gasSupply,
  sewerageSupply,
  waterSupply,
} from '../constants/dictionaries';
import SelectBubble from '../../UI/SelectBubble';
import {
  selectGasData,
  selectSewageData,
  selectSewageWaterSupply,
} from './schema';

const CommunicationSection = ({ enableEditMode, isEditMode, property }) => {
  if (!isEditMode) {
    return (
      <Row>
        <Property xs={3}>
          <PropertyBigValue>Коммуникации</PropertyBigValue>
        </Property>
        <Col xs={9}>
          <Row>
            <Property xs={6}>
              <PropertyTitle>Электричество</PropertyTitle>
              <PropertyValue>
                <Body>
                  {property.communication.powerSupply || 'Не указано'} кВт
                </Body>
              </PropertyValue>
            </Property>
            <Property xs={6}>
              <PropertyTitle>Водоснабжение</PropertyTitle>
              <PropertyValue>
                <Body>
                  {waterSupply[property.communication.waterSupply] ||
                    'Не указано'}
                </Body>
              </PropertyValue>
            </Property>
            <Property xs={6}>
              <PropertyTitle>Газ</PropertyTitle>
              <PropertyValue>
                <Body>
                  {gasSupply[property.communication.gasSupply] || 'Не указано'}
                </Body>
              </PropertyValue>
            </Property>
            <Property xs={6}>
              <PropertyTitle>Канализация</PropertyTitle>
              <PropertyValue>
                <Body>
                  {sewerageSupply[property.communication.sewerageSupply] ||
                    'Не указано'}
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
        <PropertyBigValue>Коммуникации</PropertyBigValue>
      </Col>
      <Col xsOffset={1} xs={2}>
        <PropertyTitle>Электричество</PropertyTitle>
        <EditPropertyInput
          defaultValue={property.communication.powerSupply}
          placeholder="Электр-во,кВт"
        />
      </Col>
      <Col xsOffset={1} xs={6}>
        <PropertyTitle>
          Газ <PropertySubTitle>Опционально</PropertySubTitle>
        </PropertyTitle>
        <SelectBubble
          selected={property.communication.gasSupply}
          unselectable
          selectData={selectGasData}
        />
        <PropertyTitle>Канализация</PropertyTitle>
        <Select
          selectData={selectSewageData}
          selected={property.communication.sewerageSupply}
          filled
        />
        <PropertyTitle>Водоснабжение</PropertyTitle>
        <Select
          selectData={selectSewageWaterSupply}
          selected={property.communication.waterSupply}
          filled
        />
      </Col>
    </EditPropertyRow>
  );
};

export default CommunicationSection;
