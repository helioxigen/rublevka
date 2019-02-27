import React, { Component } from 'react';

import styled from 'styled-components';
import Downshift from 'downshift';

import media from 'site/styles/media';
import UI from 'site/ui/v2019';

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

const { RadioButton } = UI;

const kinds = [
  {
    value: 'house',
    name: 'Дом',
  },
  {
    value: 'townhouse',
    name: 'Таунхаус',
  },
  {
    value: 'flat',
    name: 'Квартира',
  },
];

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

export default class extends Component {
  state = { priceTo: null, priceFrom: null, currency: 'usd', bedrooms: '2', kind: kinds[0].value };

  formateData = () => {
    const { priceTo = {}, priceFrom = {}, currency, bedrooms, kind = {} } = this.state;

    return {
      rent: {
        min: (priceFrom || {}).value,
        max: (priceTo || {}).value,
        currency: `rentOffer.multiCurrencyPrice.${currency}`,
      },
      specification: {
        bedrooms: parseInt(bedrooms, 10),
      },
      kind: [kind],
    };
  };

  generateCostPhrase = () => {
    const { priceTo, priceFrom, currency } = this.state;
    const currencySymbol = currency === 'rub' ? '₽' : '$';

    if (priceFrom && !priceTo) {
      return `От ${priceFrom.label} ${currencySymbol}`;
    } else if (!priceFrom && priceTo) {
      return `До ${priceTo.label} ${currencySymbol}`;
    } else if (priceFrom && priceTo) {
      return `От ${priceFrom.label} до ${priceTo.label} ${currencySymbol}`;
    }

    return 'Любая';
  };

  render() {
    const { priceTo, priceFrom, bedrooms, currency } = this.state;
    const { navigate } = this.props;
    const priceResetButtonActive = priceTo || priceFrom || currency !== 'rub';

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
              <Dropdown isOpen={isOpen} {...getRootProps({ refKey: 'innerRef' })}>
                <Selector {...getToggleButtonProps({ refKey: 'innerRef' })}>
                  <SelectorName>тип объекта</SelectorName>
                  <SelectorValue>{selectedItem.name}</SelectorValue>
                </Selector>
                {isOpen && (
                  <Options getToggleButtonProps={getToggleButtonProps} getMenuProps={getMenuProps}>
                    {kinds.map((item, index) => (
                      <Option
                        isResetButtonActive={selectedItem !== kinds[0]}
                        resetButtonCallback={() => selectItem(kinds[0])}
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
              <Dropdown isOpen={isOpen} {...getRootProps({ refKey: 'innerRef' })}>
                <Selector {...getToggleButtonProps({ refKey: 'innerRef' })}>
                  <SelectorName>цена</SelectorName>
                  <SelectorValue>{this.generateCostPhrase()}</SelectorValue>
                </Selector>
                {isOpen && (
                  <Options
                    isResetButtonActive={priceResetButtonActive}
                    resetButtonCallback={() =>
                      this.setState({ priceFrom: null, priceTo: null, currency: 'rub' })
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
                          prefix="тыс"
                          onChange={value => this.setState({ priceFrom: value })}
                          bound={(priceTo || {}).value || 300}
                          type="from"
                        />
                      </SelectWrapper>
                      <Divider>–</Divider>
                      <SelectWrapper>
                        <Select
                          placeholder="ДО"
                          prefix="тыс"
                          onChange={value => this.setState({ priceTo: value })}
                          bound={(priceFrom || {}).value || 10}
                          type="to"
                        />
                      </SelectWrapper>
                    </InputsBlock>
                    <RadioButton
                      name="usd"
                      text="Доллары ($)"
                      value="usd"
                      checked={currency === 'usd'}
                      handleChange={e => this.setState({ currency: e.target.value })}
                    />
                    <RadioButton
                      name="rub"
                      text="Рубли (₽)"
                      value="rub"
                      checked={currency === 'rub'}
                      handleChange={e => this.setState({ currency: e.target.value })}
                    />
                  </Options>
                )}
              </Dropdown>
            )}
          </Downshift>
          <Downshift>
            {({ getToggleButtonProps, isOpen, getRootProps, getMenuProps }) => (
              <Dropdown isOpen={isOpen} {...getRootProps({ refKey: 'innerRef' })}>
                <Selector {...getToggleButtonProps({ refKey: 'innerRef' })}>
                  <SelectorName>спален</SelectorName>
                  <SelectorValue>{`${bedrooms} и более`}</SelectorValue>
                </Selector>
                {isOpen && (
                  <Options
                    isResetButtonActive={bedrooms !== '2'}
                    resetButtonCallback={() => this.setState({ bedrooms: '2' })}
                    withSaveButton
                    getToggleButtonProps={getToggleButtonProps}
                    getMenuProps={getMenuProps}
                  >
                    <RadioButton
                      name="two"
                      text="От 2"
                      value={2}
                      checked={bedrooms === '2'}
                      handleChange={e => this.setState({ bedrooms: e.target.value })}
                    />
                    <RadioButton
                      name="three"
                      text="От 3"
                      value={3}
                      checked={bedrooms === '3'}
                      handleChange={e => this.setState({ bedrooms: e.target.value })}
                    />
                    <RadioButton
                      name="four"
                      text="От 4"
                      value={4}
                      checked={bedrooms === '4'}
                      handleChange={e => this.setState({ bedrooms: e.target.value })}
                    />
                    <RadioButton
                      name="five"
                      text="5 и более"
                      value={5}
                      checked={bedrooms === '5'}
                      handleChange={e => this.setState({ bedrooms: e.target.value })}
                    />
                  </Options>
                )}
              </Dropdown>
            )}
          </Downshift>
        </Form>
        <Search
          onClick={() => navigate('/zagorodnaya/arenda', 'countryProperties.rent', this.formateData())}
        />
      </Wrapper>
    );
  }
}
