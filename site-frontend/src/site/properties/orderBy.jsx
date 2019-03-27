import React, { Component } from 'react';
import styled from 'styled-components';
import { dictionary } from '../../core/config/constants';
import Select from './Select';

import UI from '../ui';

const { Button, Visibility } = UI;

const BtnContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Placeholder = styled.span`
  font-size: 16px;
  margin-right: 10px;
`;

const StBtn = styled(Button)`
  &&& {
    padding: 11px 17px;
    font-size: 16px;
    border-radius: 6px;
    border: none;
    color: ${p => (p.isActive ? '#373737' : '#6E6E6E')};
    background: ${p => (p.isActive ? '#EEEEEE' : 'transparent')};

    &:hover,
    &:active {
      color: #373737;
    }
    &::first-letter {
      text-transform: capitalize;
    }
  }
`;

class OrderBy extends Component {
  reset = () => {
    this.props.actions.resetOrder(this.props.resourceName);
  };

  update = (field) => {
    const { resourceName, state = {} } = this.props;
    const predicate = state.predicate === 'asc' ? 'desc' : 'asc';

    this.props.actions.updatePagination(resourceName, { offset: 0 });
    this.props.actions.updateOrder(resourceName, field, predicate);
  };

  renderButton = (field) => {
    const { state = {} } = this.props;
    const isActive = state.field === field;

    return (
      <StBtn
        isActive={isActive}
        block
        size="sm"
        key={field}
        onClick={() => this.update(field)}
      >
        {dictionary.orderBy[field]}
      </StBtn>
    );
  };

  render() {
    const { state = {} } = this.props;

    const newFields = this.props.fields.map(field => ({
      value: field,
      label: dictionary.orderBy[field],
    }));

    return (
      <div>
        {/* <CurrencyToggle /> */}
        <Visibility xs="block" sm="block" md="hidden">
          <Select
            options={newFields}
            onChange={this.update}
            placeholder="▾ Сортировать"
            selected={state.field}
          />
        </Visibility>
        <Visibility xs="hidden" sm="hidden" md="block" lg="block">
          <BtnContainer>
            <Placeholder>Сортировать: </Placeholder>
            {this.props.fields.map(this.renderButton)}
          </BtnContainer>
        </Visibility>
      </div>
    );
  }
}

export default OrderBy;
