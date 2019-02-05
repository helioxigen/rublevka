import React, { Component } from 'react';
import styled from 'styled-components';
import Card from './Card';
// import { Text } from '../UI/Typography';
// import { Input } from '../UI';

const Section = styled.section`
  background-color: #fff;
  padding: 24px 24px 0;
  margin-bottom: 32px;
  box-shadow: 0px 0px 8px #eaeaea;
  border: 1px solid #eaeaea;
  border-radius: 4px;
`;

const Heading = styled.h2`
  font-family: PT Sans;
  font-weight: bold;
  border-bottom: 1px solid #edeff5;
  margin: 0;
  padding-bottom: 10px;
`;

const renderItem = item => (
  <Card
    data={item.data}
    premium={item.premium}
    docID={item.docID}
    offerKind={item.offerKind}
    top3={item.top3}
    key={item.id}
    id={item.id}
  />
);

class List extends Component {
  state = {
    filterOnSale: '',
    filterOnRent: '',
  };

  handleChangeFilterOnSale = (e) => {
    this.setState({ filterOnSale: e.target.value });
  };

  handleChangeFilterOnRent = (e) => {
    this.setState({ filterOnRent: e.target.value });
  };

  render() {
    const {
      itemsOnRent, itemsOnSale, itemsError, itemsLoading,
    } = this.props;

    const { filterOnRent, filterOnSale } = this.state;

    const loaded = !itemsLoading && !itemsError;

    return (
      <section>
        <Section>
          <Heading>Продажа</Heading>
          {loaded
            && itemsOnSale
              .filter(
                item => !filterOnSale || `${item.id}`.startsWith(filterOnSale),
              )
              .map(renderItem)}
        </Section>

        <Section>
          <Heading>Аренда</Heading>
          {loaded
            && itemsOnRent
              .filter(
                item => !filterOnRent || `${item.id}`.startsWith(filterOnRent),
              )
              .map(renderItem)}
        </Section>
      </section>
    );
  }
}

export default List;
