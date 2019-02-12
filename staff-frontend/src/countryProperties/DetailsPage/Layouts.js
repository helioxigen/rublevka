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
} from './styled';
import propertyOptionIcon from './img/property-option-icon.svg';
import { Body } from '../../UI';
import { mainLayouts } from '../constants/dictionaries';
import Select from '../../UI/Select';
import { selectFixedValueData } from './schema';

const LayoutSection = ({ enableEditMode, isEditMode, property }) => {
  if (!isEditMode) {
    if (property.specification.layouts) {
      const propertyOptions = Object.keys(property.specification.layouts);

      return (
        <>
          <Row>
            <Property xs={12}>
              <PropertyBigValue>Планировка</PropertyBigValue>
            </Property>
          </Row>
          <PropertyOptionWrapper>
            {propertyOptions.map(propertyOptionItem => (
              <PropertyOption key={mainLayouts[propertyOptionItem]} xs={4}>
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
      );
    }
  }

  return (
    <EditPropertyRow>
      <Col xs={2}>
        <PropertyBigValue>Планировка</PropertyBigValue>
      </Col>
      <Col xsOffset={1} xs={2}>
        <PropertyTitle>Гостиных</PropertyTitle>
        <Select
          selectData={selectFixedValueData}
          selected={property.specification.layouts.living_room}
          filled
        />
        <PropertyTitle>Кабинетов</PropertyTitle>
        <Select
          selectData={selectFixedValueData}
          selected={property.specification.layouts.office}
          filled
        />
        <PropertyTitle>Игровых</PropertyTitle>
        <Select
          selectData={selectFixedValueData}
          selected={property.specification.layouts.game_room}
          filled
        />
        <PropertyTitle>Мансард</PropertyTitle>
        <Select
          selectData={selectFixedValueData}
          selected={property.specification.layouts.loft}
          filled
        />
      </Col>
      <Col xsOffset={1} xs={2}>
        <PropertyTitle>Технических помещений</PropertyTitle>
        <Select
          selectData={selectFixedValueData}
          selected={property.specification.layouts.technical_room}
          filled
        />
        <PropertyTitle>Хозяйственных помещений</PropertyTitle>
        <Select
          selectData={selectFixedValueData}
          selected={property.specification.layouts.utility_room}
          filled
        />
        <PropertyTitle>Кухонь</PropertyTitle>
        <Select
          selectData={selectFixedValueData}
          selected={property.specification.layouts.kitchen}
          filled
        />
        <PropertyTitle>СПА-зон</PropertyTitle>
        <Select
          selectData={selectFixedValueData}
          selected={property.specification.layouts.spa_zone}
          filled
        />
      </Col>
      <Col xsOffset={1} xs={2}>
        <PropertyTitle>Столовых</PropertyTitle>
        <Select
          selectData={selectFixedValueData}
          selected={property.specification.layouts.dining_room}
          filled
        />
        <PropertyTitle>Гардеробных</PropertyTitle>
        <Select
          selectData={selectFixedValueData}
          selected={property.specification.layouts.dressing_room}
          filled
        />
      </Col>
    </EditPropertyRow>
  );
};

export default LayoutSection;
