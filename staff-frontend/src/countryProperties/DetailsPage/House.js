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
  SelectControl,
} from './styled';
import { Body } from '../../UI';
import { selectFixedValueData } from './schema';

const HouseSection = ({
  enableHouseEditMode,
  isEditMode,
  property,
  onUpdate,
}) => {
  const { specification } = property;
  const {
    area,
    bedrooms,
    loggias,
    ceilingHeight,
    rooms,
    balconies,
    wcs,
    elevators,
  } = specification;
  const update = (key, value) =>
    onUpdate({
      ...property,
      specification: { ...specification, [key]: value },
    });

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
              <Body>{area ? `${area} м²` : 'Не указано'}</Body>
            </PropertyValue>
          </Property>
          <Property xs={3}>
            <PropertyTitle>Спален</PropertyTitle>
            <PropertyValue>
              <Body>{bedrooms || 'Не указано'}</Body>
            </PropertyValue>
          </Property>
          <Property xs={3}>
            <PropertyTitle>Лоджий</PropertyTitle>
            <PropertyValue>
              <Body>{loggias || 'Не указано'}</Body>
            </PropertyValue>
          </Property>
          <Property xs={3}>
            <PropertyTitle>Высота потолков</PropertyTitle>
            <PropertyValue>
              <Body>{ceilingHeight || 'Не указано'}</Body>
            </PropertyValue>
          </Property>
          <Property xs={3}>
            <PropertyTitle>Комнат</PropertyTitle>
            <PropertyValue>
              <Body>{rooms || 'Не указано'}</Body>
            </PropertyValue>
          </Property>
          <Property xs={3}>
            <PropertyTitle>Балконов</PropertyTitle>
            <PropertyValue>
              <Body>{balconies || 'Не указано'}</Body>
            </PropertyValue>
          </Property>
          <Property xs={3}>
            <PropertyTitle>Санузлов</PropertyTitle>
            <PropertyValue>
              <Body>{wcs || 'Не указано'}</Body>
            </PropertyValue>
          </Property>
          <Property xs={3}>
            <PropertyTitle>Лифт</PropertyTitle>
            <PropertyValue>
              <Body>{elevators || 'Не указано'}</Body>
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
        <EditPropertyInput
          defaultValue={area}
          placeholder="Площадь, м"
          onSubmit={value => update('area', value)}
        />
        <PropertyTitle>Высота потолков</PropertyTitle>
        <EditPropertyInput
          defaultValue={ceilingHeight}
          placeholder="Высота, м"
          onSubmit={value => update('ceilingHeight', value)}
        />
        <PropertyTitle>Комнат</PropertyTitle>
        <EditPropertyInput
          defaultValue={rooms}
          placeholder="Комнат, шт."
          onSubmit={value => update('rooms', value)}
        />
        <PropertyTitle>Спален</PropertyTitle>
        <EditPropertyInput
          defaultValue={bedrooms}
          placeholder="Спален, шт."
          onSubmit={value => update('bedrooms', value)}
        />
      </Col>
      <Col xsOffset={1} xs={3}>
        <PropertyTitle>Лоджий</PropertyTitle>
        <SelectControl
          selected={loggias}
          options={selectFixedValueData}
          onChange={value => update('loggias', value)}
        />
        <PropertyTitle>Балконов</PropertyTitle>
        <SelectControl
          options={selectFixedValueData}
          selected={balconies}
          onChange={value => update('balconies', value)}
        />
        <PropertyTitle>Санузлов</PropertyTitle>
        <SelectControl
          options={selectFixedValueData}
          selected={wcs}
          onChange={value => update('wcs', value)}
        />
      </Col>
      <Col xs={3}>
        <PropertyTitle>Лифт</PropertyTitle>
        <SelectControl
          options={selectFixedValueData}
          selected={elevators}
          onChange={value => update('elevators', value)}
        />
      </Col>
    </EditPropertyRow>
  );
};
export default HouseSection;
