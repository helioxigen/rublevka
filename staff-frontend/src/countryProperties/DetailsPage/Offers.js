/* eslint-disable react/style-prop-object */
import React from 'react';
import styled from 'styled-components';
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

import { BodyBig, Body, theme } from '../../UI';
import {
  resaleKinds,
  saleKinds,
  feeKinds,
  periods,
  binarySelect,
  dictionaryToOptions,
  currencies,
  deposits,
} from '../constants/dictionaries';
import Switcher from '../../UI/Switcher';

const Reset = styled.button`
  margin: 0;
  line-height: 28px;
  font-size: 18px;
  color: ${theme.gray};
  text-align: left;

  border: 0;
  background: none;
  padding: 0;
  align-self: baseline;
  cursor: pointer;
`;

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
  if (!value) {
    return 0;
  }
  if (typeof value === 'string') {
    return value.replace(/\s/g, '');
  }
  return value;
}

const ConditionsSection = ({
  enableEditMode,
  isEditMode,
  property,
  onUpdate,
}) => {
  const {
    saleOffer,
    rentOffer,
    specification = {},
    landDetails,
    state,
    kind,
  } = property;

  const update = (value) => {
    onUpdate(value);
  };

  const updateKey = (offerKey, key, value) => {
    update({
      ...property,
      [offerKey]: { ...property[offerKey], [key]: value },
    });
  };

  const updateSale = (key, value) => {
    updateKey('saleOffer', key, value);
  };

  const updateRent = (key, value) => {
    updateKey('rentOffer', key, value);
  };

  const clearSale = () => {
    update({
      ...property,
      saleOffer: null,
    });
  };

  const clearRent = () => {
    update({
      ...property,
      rentOffer: null,
    });
  };

  const updateAgentFee = (offerKind, isFixed, agentFee, agentFixedPrice) => {
    if (isFixed) {
      update({
        ...property,
        [offerKind]: {
          ...property[offerKind],
          agentFee,
          isAgentFixed: true,
          agentFixedPrice,
        },
      });
    } else {
      update({
        ...property,
        [offerKind]: {
          ...property[offerKind],
          agentFee,
          isAgentFixed: false,
          agentFixedPrice: null,
        },
      });
    }
  };

  const updateSaleAgentFee = (isFixed, agentFee, agentFixedPrice) => {
    updateAgentFee('saleOffer', isFixed, agentFee, agentFixedPrice);
  };

  const updateRentAgentFee = (isFixed, agentFee, agentFixedPrice) => {
    updateAgentFee('rentOffer', isFixed, agentFee, agentFixedPrice);
  };

  const updatePrice = (offerKind, priceValue = 0, currencyValue = 'RUB') => {
    update({
      ...property,
      [offerKind]: {
        ...property[offerKind],
        price: preparePrice(priceValue),
        currency: currencyValue,
      },
    });
  };

  const updateSalePrce = (priceValue, currencyValue) => {
    updatePrice('saleOffer', priceValue, currencyValue);
  };

  const updateRentPrce = (priceValue, currencyValue) => {
    updatePrice('rentOffer', priceValue, currencyValue);
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
      <SaleOfferEdit
        property={property}
        update={updateSale}
        updateAgentFee={updateSaleAgentFee}
        updatePrice={updateSalePrce}
        clear={clearSale}
      />
      <Separator />
      <RentOfferEdit
        property={property}
        update={updateRent}
        updateAgentFee={updateRentAgentFee}
        updatePrice={updateRentPrce}
        clear={clearRent}
      />
    </>
  );
};

export default ConditionsSection;

const SaleOfferEdit = ({
  property,
  update,
  updateAgentFee,
  clear,
  updatePrice,
}) => {
  const { saleOffer = {} } = property;
  const {
    price,
    currency,
    // kind,
    isResale,
    agentFixedPrice,
    agentFee,
    isInstallment,
    // isMortgage,
    isBargain,
  } = saleOffer;
  const isAgentFixed = !!agentFixedPrice;

  return (
    <EditPropertyRow>
      <Col xs={2}>
        <SubTitle>Продажа</SubTitle>
        <Reset onClick={() => clear()}>Сбросить</Reset>
      </Col>
      <Col xsOffset={1} xs={2}>
        <EditPropertyInput
          isCurrency
          defaultValue={price}
          onSubmit={(value) => {
            updatePrice(value, currency);
          }}
          placeholder={`Цена${currency ? `, ${currencies[currency]}` : ''}`}
        />
        <Switcher
          selected={currency}
          onChange={value => updatePrice(price, value)}
        />
      </Col>

      <Col xsOffset={1} xs={3}>
        {/* <PropertyTitle>
          Сделка
          <PropertySubTitle>Опционально</PropertySubTitle>
        </PropertyTitle>
        <Tags
          options={dictionaryToOptions(saleKinds)}
          currentValue={kind}
          onChange={value => update('kind', value)}
          isRemovable
        /> */}
        <PropertyTitle>Тип продажи</PropertyTitle>
        <SelectControl
          options={dictionaryToOptions(resaleKinds)}
          selected={isResale}
          onChange={value => update('isResale', value)}
        />

        <PropertyTitle>Комиссия</PropertyTitle>
        <SelectControl
          options={dictionaryToOptions(feeKinds)}
          selected={isAgentFixed ? 'fixed' : 'percent'}
          onChange={(value) => {
            updateAgentFee(
              value === 'fixed',
              agentFee,
              agentFixedPrice || { currency: 'RUB', price: 0 },
            );
          }}
        />
        {isAgentFixed ? (
          <>
            <EditPropertyInput
              isCurrency
              defaultValue={agentFixedPrice.price}
              placeholder={`Сумма${
                agentFixedPrice.currency
                  ? `, ${currencies[agentFixedPrice.currency]}`
                  : ''
              }`}
              onSubmit={(value) => {
                updateAgentFee(true, saleOffer.agentFee, {
                  ...agentFixedPrice,
                  price: preparePrice(value),
                });
              }}
            />
            <Switcher
              selected={agentFixedPrice.currency}
              onChange={(value) => {
                updateAgentFee(true, saleOffer.agentFee, {
                  ...agentFixedPrice,
                  currency: value,
                });
              }}
            />
          </>
        ) : (
          <EditPropertyInput
            defaultValue={agentFee}
            placeholder="Процент, %"
            onSubmit={(value) => {
              updateAgentFee(false, value);
            }}
          />
        )}
      </Col>

      <Col xs={3}>
        <PropertyTitle>Рассрочка</PropertyTitle>
        <SelectControl
          options={dictionaryToOptions(binarySelect)}
          selected={isInstallment}
          onChange={value => update('isInstallment', value)}
        />
        {/* <PropertyTitle>Ипотека</PropertyTitle>
        <SelectControl
          options={dictionaryToOptions(binarySelect)}
          selected={isMortgage}
          onChange={value => update('isMortgage', value)}
        /> */}
        <PropertyTitle>Торг</PropertyTitle>
        <SelectControl
          options={dictionaryToOptions(binarySelect)}
          selected={isBargain}
          onChange={value => update('isBargain', value)}
        />
      </Col>
    </EditPropertyRow>
  );
};

const RentOfferEdit = ({
  property,
  update,
  updateAgentFee,
  clear,
  updatePrice,
}) => {
  const { rentOffer = {} } = property;
  const {
    price = '',
    currency,
    agentFee,
    deposit,
    period,
    isAllowedChildren,
    isAllowedPets,
  } = rentOffer;
  const { agentFixedPrice } = rentOffer;
  const isAgentFixed = !!agentFixedPrice;

  return (
    <EditPropertyRow>
      <Col xs={2}>
        <SubTitle>Аренда</SubTitle>
        <Reset onClick={() => clear()}>Сбросить</Reset>
      </Col>

      <Col xsOffset={1} xs={2}>
        <EditPropertyInput
          isCurrency
          defaultValue={price}
          onSubmit={(value) => {
            updatePrice(value, currency);
          }}
          placeholder={`Цена${currency ? `, ${currencies[currency]}` : ''}`}
        />
        <Switcher
          selected={currency}
          onChange={value => updatePrice(price, value)}
        />
      </Col>

      <Col xsOffset={1} xs={3}>
        <PropertyTitle>
          Залог
          <PropertySubTitle>Опционально</PropertySubTitle>
        </PropertyTitle>
        <Tags
          options={dictionaryToOptions(deposits)}
          currentValue={String(deposit)}
          onChange={value => update('deposit', value)}
          isRemovable
        />

        <PropertyTitle>Период аренды</PropertyTitle>
        <Tags
          options={dictionaryToOptions(periods)}
          currentValue={String(period)}
          onChange={value => update('period', value)}
          isRemovable
        />

        <PropertyTitle>Комиссия</PropertyTitle>
        <SelectControl
          options={dictionaryToOptions(feeKinds)}
          selected={isAgentFixed ? 'fixed' : 'percent'}
          onChange={(value) => {
            updateAgentFee(
              value === 'fixed',
              rentOffer.agentFee,
              agentFixedPrice || { currency: 'RUB', price: 0 },
            );
          }}
        />
        {isAgentFixed ? (
          <>
            <EditPropertyInput
              isCurrency
              defaultValue={agentFixedPrice.price}
              placeholder={`Сумма${
                agentFixedPrice.currency
                  ? `, ${currencies[agentFixedPrice.currency]}`
                  : ''
              }`}
              onSubmit={(value) => {
                updateAgentFee(true, rentOffer.agentFee, {
                  ...agentFixedPrice,
                  price: preparePrice(value),
                });
              }}
            />
            <Switcher
              selected={agentFixedPrice.currency}
              onChange={(value) => {
                updateAgentFee(true, rentOffer.agentFee, {
                  ...agentFixedPrice,
                  currency: value,
                });
              }}
            />
          </>
        ) : (
          <EditPropertyInput
            defaultValue={agentFee}
            placeholder="Процент, %"
            onSubmit={(value) => {
              updateAgentFee(false, value);
            }}
          />
        )}
      </Col>

      <Col xs={3}>
        <PropertyTitle>С детьми</PropertyTitle>
        <SelectControl
          options={dictionaryToOptions(binarySelect)}
          selected={isAllowedChildren}
          onChange={value => update('isAllowedChildren', value)}
        />

        <PropertyTitle>С животными</PropertyTitle>
        <SelectControl
          options={dictionaryToOptions(binarySelect)}
          selected={isAllowedPets}
          onChange={value => update('isAllowedPets', value)}
        />
      </Col>
    </EditPropertyRow>
  );
};
