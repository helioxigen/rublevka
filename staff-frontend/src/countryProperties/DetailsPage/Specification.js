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
  SelectControl,
} from './styled';
import { Body } from '../../UI';
import {
  binarySelect,
  roofMaterials,
  wallMaterials,
  dictionaryToOptions,
} from '../constants/dictionaries';
import SelectBubble from '../../UI/SelectBubble';

const ConstructiveSection = ({
  enableEditMode,
  isEditMode,
  property,
  onUpdate,
}) => {
  const { specification } = property;
  const {
    wallMaterial,
    builtYear,
    roofMaterial,
    withVentilation,
    withConditioning,
  } = specification;
  const update = (key, value) =>
    onUpdate({
      ...property,
      specification: { ...specification, [key]: value },
    });

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
                <Body>{wallMaterials[wallMaterial] || 'Не указано'}</Body>
              </PropertyValue>
            </Property>
            <Property xs={4}>
              <PropertyTitle>Кондиционирование</PropertyTitle>
              <PropertyValue>
                <Body>{binarySelect[withConditioning]}</Body>
              </PropertyValue>
            </Property>
            <Property xs={4}>
              <PropertyTitle>Год постройки</PropertyTitle>
              <PropertyValue>
                <Body>{builtYear || 'Не указано'}</Body>
              </PropertyValue>
            </Property>
            <Property xs={4}>
              <PropertyTitle>Крыша</PropertyTitle>
              <PropertyValue>
                <Body>{roofMaterials[roofMaterial] || 'Не указано'}</Body>
              </PropertyValue>
            </Property>
            <Property xs={4}>
              <PropertyTitle>Вентиляция</PropertyTitle>
              <PropertyValue>
                <Body>{binarySelect[withVentilation]}</Body>
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
        <EditPropertyInput
          defaultValue={builtYear}
          placeholder="Год"
          onSubmit={value => update('builtYear', value)}
        />
      </Col>
      <Col xsOffset={1} xs={3}>
        <PropertyTitle>Стены</PropertyTitle>
        <SelectBubble
          selected={wallMaterial}
          options={dictionaryToOptions(wallMaterials)}
          onChange={value => update('wallMaterial', value)}
        />
        <PropertyTitle>Крыша</PropertyTitle>
        <SelectBubble
          selected={roofMaterial}
          options={dictionaryToOptions(roofMaterials)}
          onChange={value => update('roofMaterial', value)}
        />
      </Col>
      <Col xs={3}>
        <PropertyTitle>Кондиционирование</PropertyTitle>
        <SelectControl
          options={dictionaryToOptions(binarySelect)}
          selected={withConditioning}
          onChange={value => update('withConditioning', value)}
        />
        <PropertyTitle>Вентиляция</PropertyTitle>
        <SelectControl
          options={dictionaryToOptions(binarySelect)}
          selected={withVentilation}
          onChange={value => update('withVentilation', value)}
        />
      </Col>
    </EditPropertyRow>
  );
};

export default ConstructiveSection;
