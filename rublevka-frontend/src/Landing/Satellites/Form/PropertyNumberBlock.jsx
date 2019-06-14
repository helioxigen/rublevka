import React, { Component } from 'react';

import { Wrapper, Input, Form, Search, SearchContainer } from './styled';
import styled from 'styled-components';

const FormB = styled.form`
  display: flex;
  width: 100%;

  ${Input}, ${SearchContainer} {
    border: 1px solid #d9d9d9;
    box-sizing: border-box;
  }

  ${SearchContainer} {
    border-left: none;
  }

  ${Input} {
    border-right: none;

    margin: 0;

    &:focus, &:focus ~ ${SearchContainer} {
      border: 1px solid #f44336;
    }
  }
`;

export default class extends Component {
  state = { id: '' };

  handleSubmit = e => {
    e.preventDefault();

    const { navigate } = this.props;
    const { id } = this.state;

    navigate(
      `/zagorodnaya/prodaja?filter=${encodeURIComponent(
        JSON.stringify({ id }),
      )}`,
    );
  };

  render() {
    const { placeholder = 'Введите номер объекта', label } = this.props;

    return (
      <Wrapper>
        <FormB onSubmit={this.handleSubmit}>
          <Input
            type="text"
            name="number"
            placeholder={placeholder}
            onChange={e => this.setState({ id: e.target.value })}
          />
          <Search label={label} type="submit" />
        </FormB>
      </Wrapper>
    );
  }
}
