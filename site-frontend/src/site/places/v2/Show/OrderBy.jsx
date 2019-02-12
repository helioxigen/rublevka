import React, { Component, PropTypes } from 'react';
import { dictionary } from 'core/config/constants';

import UI from 'site/ui';

// components
import CurrencyToggle from 'site/components/CurrencyToggle';

import styled from 'styled-components';
import media from 'site/styles/media';

const { Dropdown, Button } = UI;

const StDropdown = styled(Dropdown)`
  display: none;

  ${media.sm`
    display: inline-block;
    width: auto;
    min-width: 17.5rem;
  `};
`;

const MobileWrapper = styled.div`
  display: inline-block;
  position: relative;
  width: 4.8rem;
  height: 4.8rem;

  &:after,
  &:before {
    content: '';
    background: url(${require('site/assets/images/arrow-down.svg')}) no-repeat;
    width: 1.25rem;
    height: 0.9rem;
    position: absolute;
    bottom: 1.4rem;
    right: 1.8rem;
    color: #232323;
  }

  &:before {
    position: absolute;
    bottom: inherit;
    top: 1.2rem;
    transform: rotate(180deg);
  }

  ${media.sm`
    display: none;
  `};
`;

const OrderBtnMobile = styled.select`
  display: inline-block;
  position: relative;
  width: auto;
  width: 4.8rem;
  height: 4.8rem;
  outline: none;
  background: transparent;
  border: 1px solid #f5f5f5;
  border-radius: 50%;
  font-size: 0;
  z-index: 5;
  /*for WebKit*/
  -webkit-appearance: none;
  /* for FF */
  -moz-appearance: none;
  text-indent: 0.01px;
  text-overflow: '';
  /* for IE */
  -ms-appearance: none;
  appearance: none !important;
`;

const StButton = styled(Button)`
  text-align: left;
  text-transform: none;
  border: none;
  border-radius: 0;

  &:hover,
  &:focus {
    color: ${p => p.theme.brandBlack};
    background: ${p => p.theme.bodyBg};
  }

  ${p =>
    p.isActive &&
    `
      color: ${p => p.theme.brandBlack};
      background: ${p => p.theme.bodyBg};
  `};

  &:last-child {
    border-bottom-right-radius: 0.4rem;
    border-bottom-left-radius: 0.4rem;
  }
`;

const CurrencyWrapper = styled.div`
  display: none;

  ${media.sm`
    display: inline-block;
`};
`;

class OrderBy extends Component {
  static propTypes = {
    orderBy: PropTypes.object,
    fields: PropTypes.array.isRequired,
    update: PropTypes.func,

    resourceName: PropTypes.string.isRequired,
    updatePagination: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.renderButton = this.renderButton.bind(this);
    this.reset = this.reset.bind(this);
  }

  reset() {
    this.props.actions.resetOrder(this.props.resourceName);
  }

  update(field) {
    const { resourceName, state = {} } = this.props;
    const predicate = state.predicate === 'asc' ? 'desc' : 'asc';

    this.props.actions.updatePagination(resourceName, { offset: 0 });
    this.props.actions.updateOrder(resourceName, field, predicate);
  }

  renderButton(field) {
    const { state = {} } = this.props;
    const isActive = state.field === field;

    return (
      <StButton
        block
        size="md"
        isActive={isActive}
        key={field}
        onClick={this.update.bind(this, field)}
      >
        {dictionary.orderBy[field]}
      </StButton>
    );
  }

  render() {
    const { state = {} } = this.props;
    const placeholder = state.field
      ? `Сортировать ${dictionary.orderBy[state.field]}`
      : 'Сортировать';

    return (
      <div>
        <CurrencyWrapper>
          <CurrencyToggle />
        </CurrencyWrapper>
        <StDropdown
          alwaysActive
          placeholder={placeholder}
          reset={this.reset}
          value={state.field}
        >
          {this.props.fields.map(this.renderButton)}
        </StDropdown>

        <MobileWrapper>
          <OrderBtnMobile onChange={e => this.update(e.target.value)}>
            <option value="saleOffer.multiCurrencyPrice.usd">По цене</option>
            <option value="location.mkadDistance">По удаленности</option>
          </OrderBtnMobile>
        </MobileWrapper>
      </div>
    );
  }
}

export default OrderBy;
