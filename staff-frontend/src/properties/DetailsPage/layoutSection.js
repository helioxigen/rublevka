import React from 'react';
import { Col, Row } from 'react-flexbox-grid';
import {
  EditButton,
  EditPropertyRow,
  Property,
  PropertyBigValue,
  PropertyOption,
  PropertyOptionIcon,
  PropertyOptionWrapper,
  PropertyTitle,
  PropertyValue,
} from './style';
import propertyOptionIcon from './img/property-option-icon.svg';
import { Body } from '../../UI';
import { mainLayouts } from '../dictionaries';
import Select from '../../UI/Select';
import { selectFixedValueData } from './schema';

const LayoutSection = ({
  enableEditMode,
  isEditMode,
  property,
  propertyOptions,
}) => {
  if (!isEditMode) {
    return (
      property.specification.layouts && (
        <>
          <Row>
            <Property xs={12}>
              <PropertyBigValue>Планировка</PropertyBigValue>
            </Property>
          </Row>
          <PropertyOptionWrapper>
            {propertyOptions.map(propertyOptionItem => (
              <PropertyOption xs={4}>
                <PropertyOptionIcon src={propertyOptionIcon} />
                <PropertyValue>
                  <Body>
                    {mainLayouts[propertyOptionItem]}{' '}
                    {property.specification.layouts[propertyOptionItem] > 1 &&
                      `(${property.specification.layouts[propertyOptionItem]})`}
                  </Body>
                </PropertyValue>
              </PropertyOption>
            ))}
          </PropertyOptionWrapper>
          <Row>
            <Col xs={12}>
              <EditButton onClick={enableEditMode}>Редактировать</EditButton>
            </Col>
          </Row>
        </>
      )
    );
  }

  return (
    <EditPropertyRow>
      <Col xs={2}>
        <PropertyBigValue>Планировка</PropertyBigValue>
      </Col>
      <Col xsOffset={1} xs={2}>
        <PropertyTitle>Гостиных</PropertyTitle>
        <Select selectData={selectFixedValueData} selected={0} filled />
        <PropertyTitle>Кабинетов</PropertyTitle>
        <Select selectData={selectFixedValueData} selected={0} filled />
        <PropertyTitle>Игровых</PropertyTitle>
        <Select selectData={selectFixedValueData} selected={0} filled />
        <PropertyTitle>Мансард</PropertyTitle>
        <Select selectData={selectFixedValueData} selected={0} filled />
      </Col>
      <Col xsOffset={1} xs={2}>
        <PropertyTitle>Технических помещений</PropertyTitle>
        <Select selectData={selectFixedValueData} selected={0} filled />
        <PropertyTitle>Хозяйственных помещений</PropertyTitle>
        <Select selectData={selectFixedValueData} selected={0} filled />
        <PropertyTitle>Кухонь</PropertyTitle>
        <Select selectData={selectFixedValueData} selected={0} filled />
        <PropertyTitle>СПА-зон</PropertyTitle>
        <Select selectData={selectFixedValueData} selected={0} filled />
      </Col>
      <Col xsOffset={1} xs={2}>
        <PropertyTitle>Столовых</PropertyTitle>
        <Select selectData={selectFixedValueData} selected={0} filled />
        <PropertyTitle>Гардеробных</PropertyTitle>
        <Select selectData={selectFixedValueData} selected={0} filled />
      </Col>
    </EditPropertyRow>
  );
};

export default LayoutSection;
