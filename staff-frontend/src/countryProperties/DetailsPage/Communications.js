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
  SelectControl,
} from './styled';
import { Body } from '../../UI';
import {
  gasSupplyKind,
  sewerageSupplyKind,
  waterSupplyKind,
  dictionaryToOptions,
} from '../constants/dictionaries';
import SelectBubble from '../../UI/SelectBubble';

const CommunicationSection = ({
  enableEditMode,
  isEditMode,
  property,
  onUpdate,
}) => {
  const { communication } = property;
  const {
    powerSupply, waterSupply, gasSupply, sewerageSupply,
  } = communication;
  const update = (key, value) =>
    onUpdate({
      ...property,
      communication: { ...communication, [key]: value },
    });

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
                <Body>{powerSupply || 'Не указано'} кВт</Body>
              </PropertyValue>
            </Property>
            <Property xs={6}>
              <PropertyTitle>Водоснабжение</PropertyTitle>
              <PropertyValue>
                <Body>{waterSupplyKind[waterSupply] || 'Не указано'}</Body>
              </PropertyValue>
            </Property>
            <Property xs={6}>
              <PropertyTitle>Газ</PropertyTitle>
              <PropertyValue>
                <Body>{gasSupplyKind[gasSupply] || 'Не указано'}</Body>
              </PropertyValue>
            </Property>
            <Property xs={6}>
              <PropertyTitle>Канализация</PropertyTitle>
              <PropertyValue>
                <Body>
                  {sewerageSupplyKind[sewerageSupply] || 'Не указано'}
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
        <PropertyTitle>Электричество, кВт</PropertyTitle>
        <EditPropertyInput
          defaultValue={powerSupply}
          placeholder="Электр-во, кВт"
          onSubmit={value => update('powerSupply', value)}
        />
      </Col>
      <Col xsOffset={1} xs={6}>
        <PropertyTitle>
          Газ <PropertySubTitle>Опционально</PropertySubTitle>
        </PropertyTitle>
        <SelectBubble
          options={dictionaryToOptions(gasSupplyKind)}
          selected={gasSupply}
          onChange={value => update('gasSupply', value)}
          unselectable
        />
        <PropertyTitle>Канализация</PropertyTitle>
        <SelectControl
          options={dictionaryToOptions(sewerageSupplyKind)}
          selected={sewerageSupply}
          onChange={value => update('sewerageSupply', value)}
          filled
        />
        <PropertyTitle>Водоснабжение</PropertyTitle>
        <SelectControl
          options={dictionaryToOptions(waterSupplyKind)}
          onChange={value => update('waterSupply', value)}
          selected={waterSupply}
          filled
        />
      </Col>
    </EditPropertyRow>
  );
};

export default CommunicationSection;
