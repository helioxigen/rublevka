import React, { Component } from 'react';
import styled from 'styled-components';
import Card from './Card';

import { remove, update, addToHistory } from './requests';

const Section = styled.section`
  background-color: #fff;
  padding: 24px 24px 0;
  margin-bottom: 32px;
  box-shadow: 0px 0px 8px #eaeaea;
  border: 1px solid #eaeaea;
  border-radius: 4px;
  min-height: 100px;
`;

const Heading = styled.h2`
  font-family: PT Sans;
  font-weight: bold;
  border-bottom: 1px solid #edeff5;
  margin: 0;
  padding-bottom: 10px;
`;

class List extends Component {
  onSave = (docID, data) => {
    const { user } = this.props;

    return update(docID, { ...data, user }).then(() =>
      addToHistory({ ...data, user }),
    );
  };

  onDelete = (docID, { id, offerKind }) => {
    const { user } = this.props;

    remove(docID).then(() =>
      addToHistory({
        id,
        offerKind,
        kind: 'remove',
        user,
      }),
    );
  };

  render() {
    const { itemsOnRent, itemsOnSale, itemsError, itemsLoading } = this.props;

    const loaded = !itemsLoading && !itemsError;

    return (
      <section>
        <Section>
          <Heading>Продажа</Heading>
          {loaded &&
            itemsOnSale.map(item => (
              <Card
                key={item.id}
                data={item.data}
                premium={item.premium}
                docID={item.docID}
                offerKind={item.offerKind}
                top3={item.top3}
                id={item.id}
                onSave={this.onSave}
                onDelete={this.onDelete}
              />
            ))}
        </Section>

        <Section>
          <Heading>Аренда</Heading>
          {loaded &&
            itemsOnRent.map(item => (
              <Card
                key={item.id}
                data={item.data}
                premium={item.premium}
                docID={item.docID}
                offerKind={item.offerKind}
                top3={item.top3}
                id={item.id}
                onSave={this.onSave}
                onDelete={this.onDelete}
              />
            ))}
        </Section>
      </section>
    );
  }
}

export default List;
