import React, { Component } from 'react';

import { Wrapper, Input, Form, Search } from './styled';

export default class extends Component {
  state = { id: '' };

  render() {
    const { navigate } = this.props;
    const { id } = this.state;

    return (
      <Wrapper>
        <Form>
          <Input
            type="text"
            name="number"
            placeholder="Введите номер объекта"
            onChange={e => this.setState({ id: e.target.value })}
          />
        </Form>
        <Search
          onClick={() =>
            navigate('/zagorodnaya/prodaja', 'countryProperties.sale', { id })
          }
        />
      </Wrapper>
    );
  }
}
