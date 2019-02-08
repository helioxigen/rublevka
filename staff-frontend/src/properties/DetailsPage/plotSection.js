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
} from './style';
import { Body } from '../../UI';
import { landscapeKinds } from '../dictionaries';
import SelectBubble from '../../UI/SelectBubble';
import { selectPlotData, selectReliefData, selectTreesData } from './schema';

const PlotSection = ({ enableEditMode, isEditMode, property }) => {
  if (!isEditMode) {
    return (
      <>
        <Row>
          <Col xs={12}>
            <SubTitle>Участок</SubTitle>
          </Col>
        </Row>
        <Row>
          <Property xs={5}>
            <PropertyTitle>Площадь</PropertyTitle>
            <PropertyValue>
              <Body>{property.landDetails.area || 'Не указано'} сот.</Body>
            </PropertyValue>
          </Property>
          <Property xs={5}>
            <PropertyTitle>Тип участка</PropertyTitle>
            <PropertyValue>
              {property.landDetails.landscapeKind &&
                property.landDetails.landscapeKind.map(
                  (landscapeKindIte, index) => (
                    <Body>
                      {index > 0 && ','}
                      {
                        landscapeKinds[
                          property.landDetails.landscapeKind[index]
                        ]
                      }
                    </Body>
                  ),
                )}
            </PropertyValue>
          </Property>
        </Row>
        <Row>
          <Col xs={12}>
            <EditButton onClick={enableEditMode}>Редактировать</EditButton>
          </Col>
        </Row>
      </>
    );
  }
  return (
    <EditPropertyRow>
      <Col xs={2}>
        <SubTitle>Участок</SubTitle>
      </Col>
      <Col xsOffset={1} xs={2}>
        <PropertyTitle>Площадь</PropertyTitle>
        <EditPropertyInput placeholder="Площадь, сот." />
      </Col>
      <Col xsOffset={1} xs={6}>
        <PropertyTitle>Участок</PropertyTitle>
        <SelectBubble selected={1} selectData={selectPlotData} />
        <PropertyTitle>Деревья</PropertyTitle>
        <SelectBubble selected={1} selectData={selectTreesData} />
        <PropertyTitle>Рельеф</PropertyTitle>
        <SelectBubble selected={1} selectData={selectReliefData} />
      </Col>
    </EditPropertyRow>
  );
};

export default PlotSection;
