/* eslint-disable react/style-prop-object */
import React from 'react';
import { Row, Col } from 'react-flexbox-grid';
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
  SelectControl,
} from './styled';

import Tags from '../../UI/Tags';
// import SelectBubble from '../../UI/SelectBubble';

import { BodyBig, Body } from '../../UI';
import {
  resaleKinds,
  saleKinds,
  feeKinds,
  // states,
  periods,
  binarySelect,
  dictionaryToOptions,
  currencies,
} from '../constants/dictionaries';
import Switcher from '../../UI/Switcher';

function BooleanValue({ value, children }) {
  return (
    <BodyBig>
      {value ? '✅' : '🚫'} {children}
    </BodyBig>
  );
}

function Offer({
  offer,
  houseArea,
  landArea,
  // state,
  kind,
  isRent,
}) {
  const isLand = kind === 'land';
  const area = isLand ? landArea : houseArea;

  return (
    <Row>
      <Property xs={4}>
        <PropertyTitle>{!isRent ? 'Продажа' : 'Аренда'}</PropertyTitle>
        <PropertyBigValue>
          {offer.price && (
            <FormattedNumber
              style="currency"
              maximumSignificantDigits={12}
              currency={offer.currency}
              value={offer.price}
            />
          )}
          {isRent && ' в месяц'}
        </PropertyBigValue>
        <PropertyValue>
          <Body>
            {offer.price && (
              <FormattedNumber
                style="currency"
                maximumSignificantDigits={12}
                currency={offer.currency}
                value={Math.round(offer.price / area, -2)}
              />
            )}{' '}
            за {isLand ? 'сот' : 'м²'}
          </Body>
        </PropertyValue>
      </Property>
      <Property xs={4}>
        <PropertyTitle>Комиссия</PropertyTitle>
        {offer.agentFixedPrice ? (
          <PropertyBigValue>
            <FormattedNumber
              style="currency"
              maximumSignificantDigits={12}
              currency={offer.agentFixedPrice.currency}
              value={offer.agentFixedPrice.price}
            />
          </PropertyBigValue>
        ) : (
          <>
            <PropertyBigValue>{offer.agentFee}%</PropertyBigValue>
            <PropertyValue>
              <Body>
                {offer.price && (
                  <FormattedNumber
                    style="currency"
                    maximumSignificantDigits={12}
                    currency={offer.currency}
                    value={offer.price * 0.01 * offer.agentFee}
                  />
                )}
              </Body>
            </PropertyValue>
          </>
        )}
      </Property>
      <Property xs={4}>
        <PropertyTitle>Показать на сайте</PropertyTitle>
        <BooleanValue value={!offer.isDisabled} />
      </Property>
    </Row>
  );
}

function preparePrice(value) {
  return value.replace(/\s/g, '');
}

export default function ConditionsSection({
  enableEditMode,
  isEditMode,
  property,
  onUpdate,
  // id,
}) {
  const {
    saleOffer,
    rentOffer,
    specification = {},
    landDetails,
    state,
    kind,
  } = property;
  const { agentFixedPrice: saleAgentFixedPrice } = saleOffer;
  const saleIsAgentFixed = !!saleAgentFixedPrice;
  const updateSale = (key, value) => {
    console.log('update sale', key, value);
    onUpdate({
      ...property,
      saleOffer: {
        ...saleOffer,
        [key]: value,
      },
    });
  };
  const updateAgentFee = (isFixed, agentFee, agentFixedPrice) => {
    if (isFixed) {
      onUpdate({
        ...property,
        saleOffer: {
          ...saleOffer,
          agentFee,
          isAgentFixed: true,
          agentFixedPrice,
        },
      });
    } else {
      onUpdate({
        ...property,
        saleOffer: {
          ...saleOffer,
          agentFee,
          isAgentFixed: false,
          agentFixedPrice: null,
        },
      });
    }
  };

  if (!isEditMode) {
    return (
      <>
        <SubTitle>Условия</SubTitle>

        {saleOffer && (
          <>
            <Offer
              offer={saleOffer}
              state={state}
              houseArea={specification.area}
              landArea={landDetails.area}
              kind={kind}
            />

            <Row>
              <Property xs={4}>
                <BodyBig>{saleKinds[saleOffer.kind]}</BodyBig>
                <BodyBig>{resaleKinds[saleOffer.isResale]}</BodyBig>
              </Property>
              <Property xs={4}>
                <BooleanValue value={saleOffer.isMortgage}>
                  Ипотека
                </BooleanValue>
                <BooleanValue value={saleOffer.isInstallment}>
                  Рассрочка
                </BooleanValue>
                <BooleanValue value={saleOffer.isBargain}>Торг</BooleanValue>
              </Property>
            </Row>
          </>
        )}

        {rentOffer && saleOffer && <Separator />}

        {rentOffer && (
          <>
            <Offer
              offer={rentOffer}
              state={state}
              houseArea={specification.area}
              landArea={landDetails.area}
              kind={kind}
              isRent
            />
            <Row>
              <Property xs={4}>
                <BodyBig>{periods[rentOffer.period]}</BodyBig>
                <BodyBig>
                  {rentOffer.deposit === 0 ? (
                    'Без залога'
                  ) : (
                    <>
                      <FormattedNumber
                        style="currency"
                        maximumSignificantDigits={12}
                        currency={rentOffer.currency}
                        value={rentOffer.deposit * rentOffer.price}
                      />{' '}
                      залог
                    </>
                  )}
                </BodyBig>
              </Property>
              <Property xs={4}>
                <BooleanValue value={rentOffer.isAllowedChildren}>
                  С детьми
                </BooleanValue>
                <BooleanValue value={rentOffer.isAllowedPets}>
                  С животными
                </BooleanValue>
              </Property>
            </Row>
          </>
        )}

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
            isCurrency
            defaultValue={saleOffer.price}
            onSubmit={value => updateSale('price', preparePrice(value))}
            placeholder={`Цена${
              saleOffer.currency ? `, ${currencies[saleOffer.currency]}` : ''
            }`}
          />
          <Switcher
            selected={saleOffer.currency}
            onChange={value => updateSale('currency', value)}
          />
        </Col>

        <Col xsOffset={1} xs={3}>
          <PropertyTitle>
            Сделка
            <PropertySubTitle>Опционально</PropertySubTitle>
          </PropertyTitle>
          <Tags
            options={dictionaryToOptions(saleKinds)}
            currentValue={saleOffer.kind}
            onChange={value => updateSale('kind', value)}
            isRemovable
          />
          <PropertyTitle>Тип продажи</PropertyTitle>
          <SelectControl
            options={dictionaryToOptions(resaleKinds)}
            selected={saleOffer.isResale}
            onChange={value => updateSale('isResale', value)}
          />
          <PropertyTitle>Комиссия</PropertyTitle>
          <SelectControl
            options={dictionaryToOptions(feeKinds)}
            selected={saleIsAgentFixed ? 'fixed' : 'percent'}
            onChange={(value) => {
              updateAgentFee(
                value === 'fixed',
                saleOffer.agentFee,
                saleAgentFixedPrice || { currency: 'RUB', price: 0 },
              );
            }}
          />
          {saleIsAgentFixed ? (
            <>
              <EditPropertyInput
                isCurrency
                defaultValue={saleAgentFixedPrice.price}
                placeholder={`Сумма${
                  saleAgentFixedPrice.currency
                    ? `, ${currencies[saleAgentFixedPrice.currency]}`
                    : ''
                }`}
                onSubmit={(value) => {
                  updateAgentFee(true, saleOffer.agentFee, {
                    ...saleAgentFixedPrice,
                    price: preparePrice(value),
                  });
                }}
              />
              <Switcher
                selected={saleAgentFixedPrice.currency}
                onChange={(value) => {
                  updateAgentFee(true, saleOffer.agentFee, {
                    ...saleAgentFixedPrice,
                    currency: value,
                  });
                }}
              />
            </>
          ) : (
            <EditPropertyInput
              defaultValue={property.saleOffer.agentFee}
              placeholder="Процент, %"
            />
          )}
        </Col>

        <Col xs={3}>
          <PropertyTitle>Рассрочка</PropertyTitle>
          <SelectControl
            options={dictionaryToOptions(binarySelect)}
            selected={property.saleOffer.isInstallment}
            onChange={value => updateSale('isInstallment', value)}
          />
          <PropertyTitle>Ипотека</PropertyTitle>
          <SelectControl
            options={dictionaryToOptions(binarySelect)}
            selected={property.saleOffer.isMortgage}
            onChange={value => updateSale('isMortgage', value)}
          />
          <PropertyTitle>Торг</PropertyTitle>
          <SelectControl
            options={dictionaryToOptions(binarySelect)}
            selected={property.saleOffer.isBargain}
            onChange={value => updateSale('isBargain', value)}
          />
        </Col>
      </EditPropertyRow>

      {/* <EditPropertyRow>
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
          <SegmentedControl
            selectData={selectRentTimeData}
            selected={1}
            filled
          />
          <PropertyTitle>Комиссия</PropertyTitle>
          <SegmentedControl
            selectData={selectCommissionData}
            selected={1}
            filled
          />
          <EditPropertyInput placeholder="Сумма, $" />
          <Switcher selected={currencies[property.saleOffer.currency]} />
        </Col>
        <Col xs={3}>
          <PropertyTitle>С детьми</PropertyTitle>
          <SegmentedControl selectData={selectBinaryData} selected={1} filled />
          <PropertyTitle>С животными</PropertyTitle>
          <SegmentedControl selectData={selectBinaryData} selected={1} filled />
        </Col>
      </EditPropertyRow> */}
    </>
  );
}
