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
  Separator,
  SubTitle,
} from './style';
import Select from '../../UI/Select';
import SelectBubble from '../../UI/SelectBubble';
import { Body, BodyBold } from '../../UI';
import { currencies, resaleKinds, saleKinds, states } from '../dictionaries';
import Switcher from '../../UI/Switcher';
import {
  selectBinaryData,
  selectDealData,
  selectCommissionData,
  selectMonthData,
  selectRentTimeData,
} from './schema';

const ConditionsSection = ({
  enableEditMode,
  isEditMode,
  currentPrice,
  property,
  isRent = false,
}) => {
  if (!isEditMode) {
    return (
      <>
        <Row>
          <Col xs={12}>
            <SubTitle>Условия</SubTitle>
          </Col>
        </Row>
        <Row>
          <Property xs={4}>
            <PropertyTitle>Стоимость</PropertyTitle>
            <PropertyBigValue>{currentPrice || '—'}</PropertyBigValue>
            <PropertyValue>
              <BodyBold>Стоимость за м² :&nbsp;</BodyBold>
              <Body>
                {currentPrice
                  ? `${currencies[property.saleOffer.currency]} + ' ' +
                      ${Math.round(
                        currentPrice / property.specification.area,
                        -2,
                      )}`
                  : '—'}
              </Body>
            </PropertyValue>
          </Property>
          <Property xs={4}>
            <PropertyTitle>Комиссия</PropertyTitle>
            <PropertyBigValue>{property.saleOffer.agentFee}%</PropertyBigValue>
            <PropertyValue>
              <BodyBold>Полная комиссия:&nbsp;</BodyBold>
              <Body>
                {currentPrice
                  ? currentPrice * 0.01 * property.saleOffer.agentFee
                  : '—'}
              </Body>
            </PropertyValue>
          </Property>
          <Property xs={4}>
            <PropertyTitle>Текущий статус</PropertyTitle>
            <PropertyBigValue>
              {property.state ? states[property.state].title : 'Нет информации'}
            </PropertyBigValue>
          </Property>
        </Row>
        <Separator big />
        <Row>
          <Property xs={4}>
            <PropertyTitle>Тип продажи</PropertyTitle>
            <PropertyValue>
              <Body>{saleKinds[property.saleOffer.kind]}</Body>
            </PropertyValue>
          </Property>
          <Property xs={4}>
            <PropertyTitle>Ипотека</PropertyTitle>
            <PropertyValue>
              <Body>
                {property.saleOffer.isMortgage ? 'Возможна' : 'Невозможна'}
              </Body>
            </PropertyValue>
          </Property>
          <Property xs={4}>
            <PropertyTitle>Закрытая продажа</PropertyTitle>
            <PropertyValue>
              <Body>{property.state === 'private' ? 'Да' : 'Нет'}</Body>
            </PropertyValue>
          </Property>
          <Property xs={4}>
            <PropertyTitle>Статус продажи</PropertyTitle>
            <PropertyValue>
              <Body>{resaleKinds[property.saleOffer.isResale]}</Body>
            </PropertyValue>
          </Property>
          <Property xs={4}>
            <PropertyTitle>Рассрочка</PropertyTitle>
            <PropertyValue>
              <Body>
                {property.saleOffer.isInstallment ? 'Возможна' : 'Невозможна'}
              </Body>
            </PropertyValue>
          </Property>
          <Property xs={4}>
            <PropertyTitle>Показывать на сайте</PropertyTitle>
            <PropertyValue>
              <Body>{property.saleOffer.isDisabled ? 'Нет' : 'Да'}</Body>
            </PropertyValue>
          </Property>
          <Property xs={4}>
            <PropertyTitle>Торг</PropertyTitle>
            <PropertyValue>
              <Body>
                {property.saleOffer.isBargain ? 'Возможен' : 'Невозможен'}
              </Body>
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
    <>
      <EditPropertyRow>
        <Col xs={2}>
          <SubTitle>Продажа</SubTitle>
        </Col>
        <Col xsOffset={1} xs={2}>
          <EditPropertyInput placeholder="Цена, Руб" />
          <Switcher selected={2} />
        </Col>
        <Col xsOffset={1} xs={3}>
          <PropertyTitle>Сделка</PropertyTitle>
          <SelectBubble selected={3} selectData={selectDealData} />
          <PropertyTitle>Комиссия</PropertyTitle>
          <Select selectData={selectCommissionData} selected={1} filled />
          <EditPropertyInput placeholder="Процент, %" />
        </Col>
        <Col xs={3}>
          <PropertyTitle>Рассрочка</PropertyTitle>
          <Select selectData={selectBinaryData} selected={1} filled />
          <PropertyTitle>Ипотека</PropertyTitle>
          <Select selectData={selectBinaryData} selected={1} filled />
          <PropertyTitle>Торг</PropertyTitle>
          <Select selectData={selectBinaryData} selected={1} filled />
        </Col>
      </EditPropertyRow>
      <EditPropertyRow>
        <Col xs={2}>
          <SubTitle>Аренда</SubTitle>
        </Col>
        <Col xsOffset={1} xs={2}>
          <EditPropertyInput placeholder="Цена, Руб" />
          <Switcher selected={2} />
        </Col>
        <Col xsOffset={1} xs={3}>
          <PropertyTitle>
            Залог
            <PropertySubTitle>Опционально</PropertySubTitle>
          </PropertyTitle>
          <SelectBubble
            selected={1}
            unselectable
            selectData={selectMonthData}
          />
          <PropertyTitle>Период аренды</PropertyTitle>
          <Select selectData={selectRentTimeData} selected={1} filled />
          <PropertyTitle>Комиссия</PropertyTitle>
          <Select selectData={selectCommissionData} selected={1} filled />
          <EditPropertyInput placeholder="Сумма, $" />
          <Switcher selected={2} />
        </Col>
        <Col xs={3}>
          <PropertyTitle>С детьми</PropertyTitle>
          <Select selectData={selectBinaryData} selected={1} filled />
          <PropertyTitle>С животными</PropertyTitle>
          <Select selectData={selectBinaryData} selected={1} filled />
        </Col>
      </EditPropertyRow>
    </>
  );
};

export default ConditionsSection;
