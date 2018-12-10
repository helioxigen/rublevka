import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FormattedCurrency, FormattedDate } from 'react-formatted';

import * as dictionary from 'cem/constants/properties/dictionaries';
import Pagination from 'core/components/pagination';
import loadProperties from 'cem/_contacts/actions/properties/load';

import UI from 'cem/components/ui';

// styles
import s from 'cem/styles/id/content';
import sButton from 'cem/styles/buttons';
import sUtils from 'cem/styles/utils';
import sTypography from 'cem/styles/typography';

const {
  Heading,
  Table,
  Icon,
  Button,
  Loading,
  Grid: { Container, Row, Col },
  } = UI;

class ItemsTable extends Component {

  componentWillMount() {
    this.props.actions.loadProperties(this.props.id, this.props.propertyCategory);
  }

  handlePaginationUpdate(propertyCategory, offset) {
    window.scrollTo(0, 0);
    this.props.actions.loadProperties(this.props.id, propertyCategory, offset);
  }

  render() {
    const propertyCategory = this.props.propertyCategory;
    const { isFetching } = this.props.state.propertiesForContacts[propertyCategory] || false;
    const { items = [], pagination } = this.props.state.propertiesForContacts[propertyCategory] || {};
    const hasItems = items.length > 0;

    return (
      <div>
        <Heading size="md">
          {propertyCategory === 'country' ? 'Загородные' : 'Городские'} oбъекты
        </Heading>

        {isFetching && (
          <Loading />
        )}

        {hasItems && !isFetching && (
          <div>
            <UI.Table.Container responsive bordered>
              <UI.Table.Row>
                <UI.Table.Heading width="10%">ID</UI.Table.Heading>
                <UI.Table.Heading width="10%">Тип</UI.Table.Heading>
                <UI.Table.Heading width="20%">Статус</UI.Table.Heading>
                <UI.Table.Heading width="25%">Цена продажи / аренды</UI.Table.Heading>
                <UI.Table.Heading width="25%">Обновлен</UI.Table.Heading>
                <UI.Table.Heading width="10%">Действия</UI.Table.Heading>
              </UI.Table.Row>
              {items.map((item) => {
                const states = dictionary.states[item.state];
                const kinds = dictionary.kinds[item.kind];

                return (
                  <UI.Table.Row key={item.id}>
                    <UI.Table.Cell>{item.id}</UI.Table.Cell>
                    <UI.Table.Cell>{kinds}</UI.Table.Cell>
                    <UI.Table.Cell className={sTypography[states.style]}>
                      {states.title}
                    </UI.Table.Cell>
                    <UI.Table.Cell>
                      {item.saleOffer && (
                        <FormattedCurrency
                          symbol={item.saleOffer.currency}
                          value={item.saleOffer.price}
                        />
                      )}
                      {item.saleOffer && item.rentOffer && (' / ')}
                      {item.rentOffer && (
                        <FormattedCurrency
                          symbol={item.rentOffer.currency}
                          value={item.rentOffer.price}
                        />
                      )}
                    </UI.Table.Cell>
                    <UI.Table.Cell>
                      <FormattedDate value={item.updatedAt} mask="dd.mm.yyyy" />
                    </UI.Table.Cell>
                    <UI.Table.Cell>
                      <Button
                        to={`/properties/${propertyCategory}/${item.id}/about`}
                        className={sButton.btnTableAction}
                        size="xs"
                      >
                        <Icon className={s.btnIcon} icon="arrow-left" />
                      </Button>
                    </UI.Table.Cell>
                  </UI.Table.Row>
                );
              })}
            </UI.Table.Container>
          </div>
        )}

        {!hasItems && !isFetching && (
          <Heading notFound>Объектов нет</Heading>
        )}

        {hasItems && !isFetching && (
          <Container fluid>
            <Row xs="center">
              <Col sm="10" className={sUtils.pushed6_0}>
                <Pagination
                  total={pagination.total}
                  limit={pagination.limit}
                  offset={pagination.offset}
                  onUpdate={offset => this.handlePaginationUpdate(propertyCategory, offset)}
                />
              </Col>
            </Row>
          </Container>
        )}
      </div>
    );
  }
}

// redux connectors
const pickState = (state) => {
  const { propertiesForContacts } = state;

  return {
    state: {
      propertiesForContacts,
    },
  };
};

const pickActions = (dispatch) => {
  const actions = {
    loadProperties,
  };

  return {
    actions: bindActionCreators(actions, dispatch),
  };
};

export default connect(pickState, pickActions)(ItemsTable);
