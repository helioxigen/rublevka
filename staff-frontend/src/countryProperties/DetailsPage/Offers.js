/* eslint-disable react/style-prop-object */
import React from 'react';
import { Col, Row } from 'react-flexbox-grid';
import { FormattedNumber } from 'react-intl';
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
} from './styled';
import Select from '../../UI/Select';
import SelectBubble from '../../UI/SelectBubble';
import { Body, BodyBig, BodyBold } from '../../UI';
import {
  currencies,
  resaleKinds,
  saleKinds,
  states,
} from '../constants/dictionaries';
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
  property,
  setNewPrice = () => {},
  // isRent = false,
  id,
}) => {
  if (!isEditMode) {
    const { saleOffer } = property;
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
            <PropertyBigValue>
              {saleOffer.price && (
                <FormattedNumber
                  style="currency"
                  maximumSignificantDigits={1}
                  currency={saleOffer.currency}
                  value={saleOffer.price}
                />
              )}
            </PropertyBigValue>
            <PropertyValue>
              <BodyBold>Стоимость за м²:&nbsp;</BodyBold>
              <Body>
                {saleOffer.price && (
                  <FormattedNumber
                    style="currency"
                    maximumSignificantDigits={1}
                    currency={saleOffer.currency}
                    value={Math.round(
                      saleOffer.price / property.specification.area,
                      -2,
                    )}
                  />
                )}
              </Body>
            </PropertyValue>
          </Property>
          <Property xs={4}>
            <PropertyTitle>Комиссия</PropertyTitle>
            <PropertyBigValue>{property.saleOffer.agentFee}%</PropertyBigValue>
            <PropertyValue>
              <BodyBold>Полная комиссия:&nbsp;</BodyBold>
              <Body>
                {saleOffer.price && (
                  <FormattedNumber
                    style="currency"
                    maximumSignificantDigits={1}
                    currency={saleOffer.currency}
                    value={saleOffer.price * 0.01 * property.saleOffer.agentFee}
                  />
                )}
              </Body>
            </PropertyValue>
          </Property>
          <Property xs={4}>
            <PropertyTitle>Текущий статус</PropertyTitle>
            <PropertyBigValue>
              {property.state && states[property.state].title}
            </PropertyBigValue>
          </Property>
        </Row>

        <Separator big />

        <Row>
          <Property xs={4}>
            <PropertyTitle>Тип продажи</PropertyTitle>
            <BodyBig>{saleKinds[property.saleOffer.kind]}</BodyBig>
          </Property>
          <Property xs={4}>
            <PropertyTitle>Ипотека</PropertyTitle>
            <BodyBig>
              {property.saleOffer.isMortgage ? 'Возможна' : 'Невозможна'}
            </BodyBig>
          </Property>
          <Property xs={4}>
            <PropertyTitle>Закрытая продажа</PropertyTitle>
            <BodyBig>{property.state === 'private' ? 'Да' : 'Нет'}</BodyBig>
          </Property>
          <Property xs={4}>
            <PropertyTitle>Статус продажи</PropertyTitle>
            <BodyBig>{resaleKinds[property.saleOffer.isResale]}</BodyBig>
          </Property>
          <Property xs={4}>
            <PropertyTitle>Рассрочка</PropertyTitle>
            <BodyBig>
              {property.saleOffer.isInstallment ? 'Возможна' : 'Невозможна'}
            </BodyBig>
          </Property>
          <Property xs={4}>
            <PropertyTitle>Показывать на сайте</PropertyTitle>
            <BodyBig>{property.saleOffer.isDisabled ? 'Нет' : 'Да'}</BodyBig>
          </Property>
          <Property xs={4}>
            <PropertyTitle>Торг</PropertyTitle>
            <BodyBig>
              {property.saleOffer.isBargain ? 'Возможен' : 'Невозможен'}
            </BodyBig>
          </Property>
        </Row>
        <EditButton onClick={enableEditMode}>Редактировать</EditButton>
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
          <EditPropertyInput
            onBlur={e => setNewPrice(id, +e.target.value)}
            placeholder="Цена, Руб"
          />
          <Switcher selected={currencies[property.saleOffer.currency]} />
        </Col>
        <Col xsOffset={1} xs={3}>
          <PropertyTitle>Сделка</PropertyTitle>
          <SelectBubble selected={3} selectData={selectDealData} />
          <PropertyTitle>Комиссия</PropertyTitle>
          <Select selectData={selectCommissionData} selected={1} filled />
          <EditPropertyInput
            defaultValue={property.saleOffer.agentFee}
            placeholder="Процент, %"
          />
        </Col>
        <Col xs={3}>
          <PropertyTitle>Рассрочка</PropertyTitle>
          <Select
            selectData={selectBinaryData}
            selected={property.saleOffer.isInstallment}
            filled
          />
          <PropertyTitle>Ипотека</PropertyTitle>
          <Select
            selectData={selectBinaryData}
            selected={property.saleOffer.isMortgage}
            filled
          />
          <PropertyTitle>Торг</PropertyTitle>
          <Select
            selectData={selectBinaryData}
            selected={property.saleOffer.isBargain}
            filled
          />
        </Col>
      </EditPropertyRow>
      <EditPropertyRow>
        <Col xs={2}>
          <SubTitle>Аренда</SubTitle>
        </Col>
        <Col xsOffset={1} xs={2}>
          <EditPropertyInput placeholder="Цена, Руб" />
          <Switcher selected={currencies[property.saleOffer.currency]} />
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
          <Switcher selected={currencies[property.saleOffer.currency]} />
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
