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
  SelectControl,
} from './styled';
import propertyOptionIcon from './img/property-option-icon.svg';
import { Body } from '../../UI';
import { mainLayouts } from '../constants/dictionaries';
import { selectFixedValueData } from './schema';

const LayoutSection = ({
  enableEditMode, isEditMode, property, onUpdate,
}) => {
  const { specification } = property;
  const { layouts } = specification;
  const update = (key, value) =>
    onUpdate({
      ...property,
      specification: {
        ...specification,
        layouts: { ...layouts, [key]: value },
      },
    });

  if (!isEditMode) {
    if (layouts) {
      const propertyOptions = Object.keys(layouts);

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
                    {property.specification.layouts[propertyOptionItem] > 1
                      && `(${property.specification.layouts[propertyOptionItem]})`}
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
        <SelectControl
          options={selectFixedValueData}
          selected={layouts.living_room}
          onChange={value => update('living_room', value)}
          filled
        />
        <PropertyTitle>Кабинетов</PropertyTitle>
        <SelectControl
          options={selectFixedValueData}
          selected={layouts.office}
          onChange={value => update('office', value)}
          filled
        />
        <PropertyTitle>Игровых</PropertyTitle>
        <SelectControl
          options={selectFixedValueData}
          selected={layouts.game_room}
          onChange={value => update('game_room', value)}
          filled
        />
        <PropertyTitle>Мансард</PropertyTitle>
        <SelectControl
          options={selectFixedValueData}
          selected={layouts.loft}
          onChange={value => update('loft', value)}
          filled
        />
      </Col>
      <Col xsOffset={1} xs={2}>
        <PropertyTitle>Технических помещений</PropertyTitle>
        <SelectControl
          options={selectFixedValueData}
          selected={layouts.technical_room}
          onChange={value => update('technical_room', value)}
          filled
        />
        <PropertyTitle>Хозяйственных помещений</PropertyTitle>
        <SelectControl
          options={selectFixedValueData}
          selected={layouts.utility_room}
          onChange={value => update('utility_room', value)}
          filled
        />
        <PropertyTitle>Кухонь</PropertyTitle>
        <SelectControl
          options={selectFixedValueData}
          selected={layouts.kitchen}
          onChange={value => update('kitchen', value)}
          filled
        />
        <PropertyTitle>СПА-зон</PropertyTitle>
        <SelectControl
          options={selectFixedValueData}
          selected={layouts.spa_zone}
          onChange={value => update('spa_zone', value)}
          filled
        />
      </Col>
      <Col xsOffset={1} xs={2}>
        <PropertyTitle>Столовых</PropertyTitle>
        <SelectControl
          options={selectFixedValueData}
          selected={layouts.dining_room}
          onChange={value => update('dining_room', value)}
          filled
        />
        <PropertyTitle>Гардеробных</PropertyTitle>
        <SelectControl
          options={selectFixedValueData}
          selected={layouts.dressing_room}
          onChange={value => update('dressing_room', value)}
          filled
        />
        <PropertyTitle>Кладовых</PropertyTitle>
        <SelectControl
          options={selectFixedValueData}
          selected={layouts.storage}
          onChange={value => update('storage', value)}
          filled
        />
      </Col>
    </EditPropertyRow>
  );
};

export default LayoutSection;
