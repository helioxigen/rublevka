import React, { Component } from 'react';

import { FormattedCurrency } from 'react-formatted';

import * as dict from 'cem/constants/deals/dictionaries';

import UI from 'cem/components/ui';
const { Grid, Loading, Button, Icon, Table, Heading } = UI;

import s from 'cem/styles/id/content';
import sButton from 'cem/styles/buttons';

class Requests extends Component {
  componentWillMount() {
    const {
      actions,
      type = 'property',
      params: { id },
    } = this.props;
    const loadActions = {
      property: actions.loadDealsByPropertyId,
      contact: actions.loadDealsByContactId,
    };

    loadActions[type](id);
  }

  renderAgentFee({ expectedAgentFee, expectedAgentFixedPrice }) {
    if (expectedAgentFee) {
      return <span>{expectedAgentFee}%</span>;
    } else if (
      expectedAgentFixedPrice &&
      !!Object.keys(expectedAgentFixedPrice).length
    ) {
      return (
        <span>
          <FormattedCurrency
            symbol={expectedAgentFixedPrice.currency}
            value={expectedAgentFixedPrice.price}
          />
        </span>
      );
    }
    return <span />;
  }

  render() {
    const {
      state,
      type = 'property',
      params: { id },
    } = this.props;
    const stateKeys = {
      property: 'dealsByPropertyId',
      contact: 'dealsByContactId',
    };
    const { isFetching, items = [] } = state[stateKeys[type]][id] || {};

    if (isFetching) return <Loading />;

    return (
      <Grid.Row>
        <section className={s.section}>
          {!items.length && <Heading notFound>Нет сделок</Heading>}
          {!!items.length && (
            <Table.Container width="100%">
              <Table.Row>
                <Table.Heading>ID</Table.Heading>
                <Table.Heading>Тип</Table.Heading>
                <Table.Heading>Статус</Table.Heading>
                <Table.Heading>Коммиссия</Table.Heading>
                <Table.Heading>Бюджет</Table.Heading>
                <Table.Heading>Действия</Table.Heading>
              </Table.Row>
              {items.map(item => (
                <Table.Row key={item.id}>
                  <Table.Cell>{item.id}</Table.Cell>
                  <Table.Cell>
                    {dict.offerKinds[item.details.offerKind]}
                  </Table.Cell>
                  <Table.Cell>{dict.states[item.state].title}</Table.Cell>
                  <Table.Cell>{this.renderAgentFee(item.details)}</Table.Cell>
                  <Table.Cell>
                    <FormattedCurrency
                      symbol={item.details.currency}
                      value={item.details.budget}
                    />
                  </Table.Cell>
                  <Table.Cell>
                    <Button
                      to={`/deals/${item.id}`}
                      className={sButton.btnTableAction}
                      size="xs"
                    >
                      <Icon className={s.btnIcon} icon="arrow-left" />
                    </Button>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Container>
          )}
        </section>
      </Grid.Row>
    );
  }
}

export default Requests;
