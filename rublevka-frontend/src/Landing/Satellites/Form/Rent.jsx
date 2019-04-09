// FIXME
/* eslint-disable max-len */

import React, { Component } from 'react';

import styled from 'styled-components';
import Downshift from 'downshift';

import { connect } from 'react-redux';

import { updateDisplayOption } from '../../../displayOptions/actions';

import { kindsTranslit } from '../../../constants/properties/dictionaries';

import { prices } from '../../../countryProperties/v2019/list/filter/options';

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
  rentKinds as kinds,
  bedroomsOptions,
  currencySymbols,
} from './constants';

const { RadioButton } = UI;

const PriceTitle = styled.p`
  display: none;
  margin: 0;
  line-height: 18px;
  font-size: 15px;
  text-transform: uppercase;

  color: #232323;

  ${media.xs`
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

class Rent extends Component {
  state = {
    priceTo: null,
    priceFrom: null,
    bedrooms: bedroomsOptions[0].value,
    kind: kinds[0].value,
  };

  formateData = () => {
    const { currency } = this.props;
    const { priceTo = {}, priceFrom = {}, bedrooms, kind = {} } = this.state;

    return {
      rent: {
        min: (priceFrom || {}).value,
        max: (priceTo || {}).value,
        currencyPrice: `rentOffer.multiCurrencyPrice.${currency}`,
      },
      bedrooms: { min: parseInt(bedrooms, 10), max: null },
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

  render() {
    const { priceTo, priceFrom, bedrooms, kind } = this.state;
    const { navigate, dispatch, currency } = this.props;
    const priceResetButtonActive = priceTo || priceFrom;
    const rentPrices = prices[currency].rent.map(item => ({
      value: item.value,
      label: item.label.slice(0, -5),
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
                          items={rentPrices}
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
                          items={rentPrices.slice(1)}
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
        </Form>
        <Search
          onClick={() =>
            navigate(
              `/zagorodnaya/arenda/${kindsTranslit[kind]}`,
              'countryProperties.rent',
              this.formateData(),
            )
          }
        />
      </Wrapper>
    );
  }
}

export default connect()(Rent);
