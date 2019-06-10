import React, { Component } from 'react';

import { Wrapper, Input, Form, Search } from './styled';

export default class extends Component {
  state = { id: '' };

  render() {
    const {
      navigate,
      placeholder = 'Введите номер объекта',
      label,
    } = this.props;
    const { id } = this.state;

    return (
      <Wrapper>
        <Form>
          <Input
            type="text"
            name="number"
            placeholder={placeholder}
            onChange={e => this.setState({ id: e.target.value })}
          />
        </Form>
        <Search
          label={label}
          onClick={() =>
            navigate('/zagorodnaya/prodaja', 'countryProperties.sale', { id })
          }
        />
      </Wrapper>
    );
  }
}
