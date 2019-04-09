// FIXME
/* eslint-disable max-len */

import React, { Component } from 'react';

import styled from 'styled-components';
import Downshift from 'downshift';

import { connect } from 'react-redux';

import { updateDisplayOption } from '../../../displayOptions/actions';

import { kindsTranslit } from '../../../constants/properties/dictionaries';

import {
  prices,
  landAreas,
} from '../../../countryProperties/v2019/list/filter/options';

import UI from '../../../ui/v2019';
import media from '../../../styles/media';

import {
  Wrapper,
  Form,
  Dropdown,
  Selector,
  SelectorName,
  SelectorValue,
  Options,
  Option,
  Search,
} from './styled';
import Select from './Select';
import {
  sellKinds as kinds,
  bedroomsOptions,
  currencySymbols,
} from './constants';

const { RadioButton } = UI;

const PriceTitle = styled.p`
  display: none;
  margin: 0;
  line-height: 18px;
  font-size: 15px;
  font-weight: 500;
  text-transform: uppercase;

  color: #232323;

  ${media.xs`
    margin-top: 8px;
    display: block;
  `}
`;

const InputsBlock = styled.div`
  max-width: 100%;
  display: flex;
  flex-direction: column;

  ${media.xs`
    margin-top: 8px;
    margin-bottom: 16px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  `}
`;

const AreaBlock = InputsBlock.extend`
  ${media.xs`
    margin-bottom: 8px;
  `}
`;

const Divider = styled.p`
  display: none;
  margin: 0 4px;
  line-height: 15px;
  font-size: 13px;
  font-weight: 500;
  color: #232323;

  ${media.xs`
    display: block;
  `}
`;

const SelectWrapper = styled.div`
  margin: 6px 0px;
  width: 100%;

  ${media.xs`
    margin: 0;
    max-width: 110px;
  `}
`;

class Sell extends Component {
  state = {
    priceTo: null,
    priceFrom: null,
    areaFrom: null,
    areaTo: null,
    bedrooms: bedroomsOptions[0].value,
    kind: kinds[0].value,
  };

  formateData = () => {
    const { currency } = this.props;
    const {
      priceTo,
      priceFrom,
      areaFrom,
      areaTo,
      bedrooms,
      kind = {},
    } = this.state;

    if (kind !== 'land') {
      return {
        sale: {
          min: (priceFrom || {}).value,
          max: (priceTo || {}).value,
          currencyPrice: `saleOffer.multiCurrencyPrice.${currency}`,
        },
        bedrooms: { min: parseInt(bedrooms, 10), max: null },
        kind: [kind],
      };
    }

    return {
      sale: {
        min: (priceFrom || {}).value,
        max: (priceTo || {}).value,
        currencyPrice: `saleOffer.multiCurrencyPrice.${currency}`,
      },
      landArea: {
        min: (areaFrom || {}).value,
        max: (areaTo || {}).value,
      },
      kind: [kind],
    };
  };

  generateCostPhrase = () => {
    const { currency } = this.props;
    const { priceTo, priceFrom } = this.state;
    const currencySymbol = currencySymbols[currency];

    if (priceFrom && !priceTo) {
      return `От ${priceFrom.label} ${currencySymbol}`;
    }
    if (!priceFrom && priceTo) {
      return `До ${priceTo.label} ${currencySymbol}`;
    }
    if (priceFrom && priceTo) {
      return `От ${priceFrom.label} до ${priceTo.label} ${currencySymbol}`;
    }

    return 'Любая';
  };

  generateAreaPhrase = () => {
    const { areaFrom, areaTo } = this.state;

    if (areaFrom && !areaTo) {
      return `От ${areaFrom.label}`;
    }
    if (!areaFrom && areaTo) {
      return `До ${areaTo.label}`;
    }
    if (areaFrom && areaTo) {
      return `От ${areaFrom.label} до ${areaTo.label}`;
    }

    return 'Любая';
  };

  render() {
    const { priceTo, priceFrom, areaTo, areaFrom, bedrooms, kind } = this.state;
    const { navigate, dispatch, currency } = this.props;
    const priceResetButtonActive = priceTo || priceFrom;
    const areaResetButtonActive = areaTo || areaFrom;
    const sellPrices = prices[currency].sale.map(item => ({
      value: item.value,
      label: currency === 'rub' ? item.label.slice(0, -2) : item.label.slice(1),
    }));

    return (
      <Wrapper>
        <Form>
          <Downshift
            onChange={item => this.setState({ kind: item.value })}
            itemToString={item => `${item}`}
            initialSelectedItem={kinds[0]}
          >
            {({
              getToggleButtonProps,
              isOpen,
              selectedItem,
              getRootProps,
              getMenuProps,
              getItemProps,
              selectItem,
            }) => (
              <Dropdown
                isOpen={isOpen}
                {...getRootProps({ refKey: 'innerRef' })}
              >
                <Selector {...getToggleButtonProps({ refKey: 'innerRef' })}>
                  <SelectorName>тип объекта</SelectorName>
                  <SelectorValue>{selectedItem.name}</SelectorValue>
                </Selector>
                {isOpen && (
                  <Options
                    getToggleButtonProps={getToggleButtonProps}
                    getMenuProps={getMenuProps}
                    isResetButtonActive={selectedItem !== kinds[0]}
                    resetButtonCallback={() => selectItem(kinds[0])}
                  >
                    {kinds.map((item, index) => (
                      <Option
                        {...getItemProps({
                          key: item.value,
                          index,
                          item,
                        })}
                        selected={selectedItem.value === item.value}
                      >
                        {item.name}
                      </Option>
                    ))}
                  </Options>
                )}
              </Dropdown>
            )}
          </Downshift>
          <Downshift>
            {({ getToggleButtonProps, isOpen, getRootProps, getMenuProps }) => (
              <Dropdown
                isOpen={isOpen}
                {...getRootProps({ refKey: 'innerRef' })}
              >
                <Selector {...getToggleButtonProps({ refKey: 'innerRef' })}>
                  <SelectorName>цена</SelectorName>
                  <SelectorValue>{this.generateCostPhrase()}</SelectorValue>
                </Selector>
                {isOpen && (
                  <Options
                    isResetButtonActive={priceResetButtonActive}
                    resetButtonCallback={() =>
                      this.setState({
                        priceFrom: null,
                        priceTo: null,
                      })
                    }
                    withSaveButton
                    getToggleButtonProps={getToggleButtonProps}
                    getMenuProps={getMenuProps}
                  >
                    <PriceTitle>стоимость:</PriceTitle>
                    <InputsBlock>
                      <SelectWrapper>
                        <Select
                          placeholder="ОТ"
                          onChange={value =>
                            this.setState({ priceFrom: value })
                          }
                          items={sellPrices}
                          bound={(priceTo || {}).value}
                          initialValue={priceFrom}
                          type="from"
                        />
                      </SelectWrapper>
                      <Divider>–</Divider>
                      <SelectWrapper>
                        <Select
                          placeholder="ДО"
                          onChange={value => this.setState({ priceTo: value })}
                          items={sellPrices.slice(1)}
                          bound={(priceFrom || {}).value}
                          initialValue={priceTo}
                          type="to"
                        />
                      </SelectWrapper>
                    </InputsBlock>
                    <RadioButton
                      name="currency"
                      text="Доллары ($)"
                      value="usd"
                      checked={currency === 'usd'}
                      handleChange={e =>
                        dispatch(
                          updateDisplayOption('currency', e.target.value),
                        )
                      }
                    />
                    <RadioButton
                      name="currency"
                      text="Рубли (₽)"
                      value="rub"
                      checked={currency === 'rub'}
                      handleChange={e =>
                        dispatch(
                          updateDisplayOption('currency', e.target.value),
                        )
                      }
                    />
                    <RadioButton
                      name="currency"
                      text="Евро (€)"
                      value="eur"
                      checked={currency === 'eur'}
                      handleChange={e =>
                        dispatch(
                          updateDisplayOption('currency', e.target.value),
                        )
                      }
                    />
                  </Options>
                )}
              </Dropdown>
            )}
          </Downshift>
          {kind !== 'land' ? (
            <Downshift
              onChange={item => this.setState({ bedrooms: item.value })}
              itemToString={item => (item || {}).label}
              initialSelectedItem={bedroomsOptions[0]}
            >
              {({
                getToggleButtonProps,
                isOpen,
                selectedItem,
                getRootProps,
                getMenuProps,
                getItemProps,
                selectItem,
              }) => (
                <Dropdown
                  isOpen={isOpen}
                  {...getRootProps({ refKey: 'innerRef' })}
                >
                  <Selector {...getToggleButtonProps({ refKey: 'innerRef' })}>
                    <SelectorName>спален</SelectorName>
                    <SelectorValue>{selectedItem.label}</SelectorValue>
                  </Selector>
                  {isOpen && (
                    <Options
                      getToggleButtonProps={getToggleButtonProps}
                      getMenuProps={getMenuProps}
                      isResetButtonActive={bedrooms !== '2'}
                      resetButtonCallback={() => selectItem(bedroomsOptions[0])}
                    >
                      {bedroomsOptions.map((item, index) => (
                        <Option
                          {...getItemProps({
                            key: item.value,
                            index,
                            item,
                          })}
                          selected={selectedItem.value === item.value}
                        >
                          {item.label}
                        </Option>
                      ))}
                    </Options>
                  )}
                </Dropdown>
              )}
            </Downshift>
          ) : (
            <Downshift>
              {({
                getToggleButtonProps,
                isOpen,
                getRootProps,
                getMenuProps,
              }) => (
                <Dropdown
                  isOpen={isOpen}
                  {...getRootProps({ refKey: 'innerRef' })}
                >
                  <Selector {...getToggleButtonProps({ refKey: 'innerRef' })}>
                    <SelectorName>площадь (сот.)</SelectorName>
                    <SelectorValue>{this.generateAreaPhrase()}</SelectorValue>
                  </Selector>
                  {isOpen && (
                    <Options
                      isResetButtonActive={areaResetButtonActive}
                      resetButtonCallback={() =>
                        this.setState({ areaFrom: null, areaTo: null })
                      }
                      withSaveButton
                      getToggleButtonProps={getToggleButtonProps}
                      getMenuProps={getMenuProps}
                    >
                      <PriceTitle>Площадь:</PriceTitle>
                      <AreaBlock>
                        <SelectWrapper>
                          <Select
                            placeholder="ОТ"
                            onChange={value =>
                              this.setState({ areaFrom: value })
                            }
                            items={landAreas.map(item => ({
                              value: item.value,
                              label: `${item.label} сот`,
                            }))}
                            bound={(areaTo || {}).value || 100}
                            initialValue={areaFrom}
                            type="from"
                          />
                        </SelectWrapper>
                        <Divider>–</Divider>
                        <SelectWrapper>
                          <Select
                            placeholder="ДО"
                            onChange={value => this.setState({ areaTo: value })}
                            items={landAreas
                              .map(item => ({
                                value: item.value,
                                label: `${item.label} сот`,
                              }))
                              .slice(1)}
                            bound={(areaFrom || {}).value || 10}
                            initialValue={areaTo}
                            type="to"
                          />
                        </SelectWrapper>
                      </AreaBlock>
                    </Options>
                  )}
                </Dropdown>
              )}
            </Downshift>
          )}
        </Form>
        <Search
          onClick={() =>
            navigate(
              `/zagorodnaya/prodaja/${kindsTranslit[kind]}`,
              'countryProperties.sale',
              this.formateData(),
            )
          }
        />
      </Wrapper>
    );
  }
}

export default connect()(Sell);
