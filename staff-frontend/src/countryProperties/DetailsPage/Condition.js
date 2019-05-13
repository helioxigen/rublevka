import React from 'react';
import { Col, Row } from 'react-flexbox-grid';
import {
  EditButton,
  EditPropertyRow,
  Property,
  PropertyBigValue,
  PropertyTitle,
  PropertySubTitle,
  PropertyValue,
  SelectControl,
} from './styled';
import { Body, Tags } from '../../UI';
import {
  furnitureKinds,
  renovateKinds,
  conditions,
  dictionaryToOptions,
} from '../constants/dictionaries';

const ConditionSection = ({
  enableEditMode,
  isEditMode,
  property,
  onUpdate,
}) => {
  const { specification } = property;
  const { renovate, furniture, condition } = specification;
  const update = (key, value) =>
    onUpdate({
      ...property,
      specification: { ...specification, [key]: value },
    });

  if (!isEditMode) {
    return (
      <Row>
        <Property xs={3}>
          <PropertyBigValue>Состояние</PropertyBigValue>
        </Property>
        <Col xs={9}>
          <Row>
            <Property xs={4}>
              <PropertyTitle>Ремонт</PropertyTitle>
              <PropertyValue>
                <Body>{renovateKinds[renovate] || 'Не указано'}</Body>
              </PropertyValue>
            </Property>
            <Property xs={4}>
              <PropertyTitle>Мебель</PropertyTitle>
              <PropertyValue>
                <Body>
                  {furniture ? furnitureKinds[furniture] : 'Не указано'}
                </Body>
              </PropertyValue>
            </Property>
            <Property xs={4}>
              <PropertyTitle>Состояние</PropertyTitle>
              <PropertyValue>
                <Body>{condition ? conditions[condition] : 'Не указано'}</Body>
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
        <SelectControl
          selected={furniture}
          options={dictionaryToOptions(furnitureKinds)}
          onChange={value => update('furniture', value)}
        />
        <PropertyTitle>Ремонт</PropertyTitle>
        <SelectControl
          selected={renovate}
          options={dictionaryToOptions(renovateKinds)}
          onChange={value => update('renovate', value)}
        />
        <PropertyTitle>
          Состояние
          <PropertySubTitle>Опционально</PropertySubTitle>
        </PropertyTitle>
        <Tags
          isRemovable
          currentValue={condition}
          options={dictionaryToOptions(conditions)}
          onChange={value => update('condition', value)}
        />
      </Col>
    </EditPropertyRow>
  );
};

export default ConditionSection;
