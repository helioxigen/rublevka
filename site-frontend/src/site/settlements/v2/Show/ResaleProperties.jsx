import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// actions
import loadProperties from 'core/countryProperties/actions/list/load';
import * as PaginationActions from 'core/actions/pagination';
import * as FilterActions from 'core/actions/filters';
import * as OrderActions from 'core/actions/order';
import { push } from 'react-router-redux';

// constants
import { resourceName } from 'core/countryProperties/constants/defaults';

import UI from 'site/ui';

// components
import Card from 'site/countryProperties/v2/Card';
import ResultForm from 'site/request/PropertiesFormTisa';
import Filter from './Filter';
import NotFound from './Filter/NotFound';
import OrderBy from './OrderBy';

// helpers
import capitalize from 'lodash/capitalize';
import isEqual from 'lodash/isEqual';

import { kinds, dealTypesTranslit } from 'site/constants/properties/dictionaries';

import { Wrapper, StLoading, StLoadMore, OrderWrapper, Relative, ListWrapper } from './styled';

const { Grid: { Container, Row, Col } } = UI;

class List extends Component {
  constructor(props) {
    super(props);

    this.group = `forSettlement${capitalize(props.dealType)}`;
    this.resource = `${resourceName}.${this.group}`;

    this.updateFilter = this.updateFilter.bind(this);
    this.resetFilter = this.resetFilter.bind(this);
  }

  componentWillMount() {
    const { location } = this.props;
    const { query } = location;

    this.props.actions.resetFilter(this.resource, null, null);
    this.props.actions.updatePagination(this.resource, { offset: 0 });

    this.load(this.props, false);

    if (query.kind) {
      this.props.actions.updateFilter(this.resource, {
        kind: [kinds[query.kind]],
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    const pagination = this.props.state.pagination[this.resource] || {};
    const nextPagination = nextProps.state.pagination[this.resource] || {};
    const offset = pagination.offset || 0;
    const nextOffset = nextPagination.offset || 0;

    const filters = this.props.state.filters[this.resource] || {};
    const nextFilters = nextProps.state.filters[this.resource] || {};
    const order = this.props.state.order[this.resource] || {};
    const nextOrder = nextProps.state.order[this.resource] || {};

    const isPaginationUpdated = !isEqual(offset, nextOffset);
    const isFiltersUpdated = !isEqual(filters, nextFilters);
    const isOrderUpdated = !isEqual(order, nextOrder);

    const isGroupUpdated = !isEqual(this.props.dealType, nextProps.dealType);

    if (isGroupUpdated) {
      // TODO: move that check to isUpdated
      this.group = `forSettlement${capitalize(nextProps.dealType)}`;
      this.resource = `${resourceName}.${this.group}`;
    }

    if (isPaginationUpdated || isGroupUpdated) {
      this.load(nextProps, true);
    }

    if (isFiltersUpdated || isOrderUpdated) {
      this.load(nextProps, false);
    }
  }

  updateFilter(key, value) {
    const values = {
      [key]: value,
    };

    this.props.actions.updatePagination(this.resource, { offset: 0 });
    this.props.actions.updateFilter(this.resource, values);
  }

  resetFilter() {
    this.props.actions.resetFilter(this.resource, null, null);
    this.props.actions.push(this.props.location.pathname);
  }

  load({ state, actions, settlementId }, append) {
    const options = {
      pagination: state.pagination[this.resource],
      filter: state.filters[this.resource],
      orderBy: state.order[this.resource],
    };

    actions.loadProperties(options, this.group, { settlementId, append });
  }

  render() {
    const {
      dealType,
      settlementId,
      toggleProperty,
      primaryTotal,
      propertyType,
      state,
      kind,
    } = this.props;
    const { ids = [], isFetching } = this.props.state.countryProperties[this.group] || {};

    const pagination = this.props.state.pagination[this.resource] || {};

    const { saleProperties = {}, rentProperties = {} } = this.props.statistics || {};
    const resaleTotal = saleProperties.resale;
    const rentTotal = rentProperties.total;

    const filtersState = this.props.state.filters[this.resource] || {};
    filtersState.kind = [kind];

    const hasItems = ids.length > 0;

    if (resaleTotal > 0 || rentTotal > 0) {
      return (
        <Wrapper>
          <Container fluid>
            <Relative>
              <Filter
                updateFilter={this.updateFilter}
                resetFilter={this.resetFilter}
                toggleDealType={this.props.toggleDealType}
                toggleProperty={toggleProperty}
                primaryTotal={primaryTotal}
                selected={filtersState}
                dealType={dealType}
                isResaleProperty
                id={settlementId}
                propertyType={propertyType}
                count={pagination.total}
              />

              <OrderWrapper>
                <OrderBy
                  resourceName={this.resource}
                  group={this.group}
                  actions={this.props.actions}
                  state={state.order[this.resource]}
                  updatePagination={this.props.actions.updatePagination}
                  fields={[`${dealType}Offer.multiCurrencyPrice.usd`, 'location.mkadDistance']}
                />
              </OrderWrapper>
            </Relative>

            <ListWrapper>
              <Row>
                <Col xs="12">
                  {hasItems &&
                    !isFetching && (
                      <Row>
                        {ids.map(id => (
                          <Card dealType={dealTypesTranslit[dealType]} id={id} showLocation />
                        ))}
                        {ids.length > 19 && <ResultForm propertyCategory="country" type="common" />}
                      </Row>
                    )}

                  {isFetching && <StLoading />}

                  {!hasItems && <NotFound resetFilter={this.resetFilter} />}
                </Col>

                <Container fluid>
                  <Row xs="center">
                    <Col xs="12">
                      <StLoadMore
                        size="lg"
                        total={pagination.total}
                        offset={pagination.offset}
                        limit={pagination.limit}
                        resource={this.resource}
                        updatePagination={this.props.actions.updatePagination}
                      >
                        Показать ещё
                      </StLoadMore>
                    </Col>
                  </Row>
                </Container>
              </Row>
            </ListWrapper>
          </Container>
        </Wrapper>
      );
    }

    return null;
  }
}

// redux connectors
const pickState = (state) => {
  const { countryProperties, filters, pagination, order } = state;

  return {
    state: {
      countryProperties,
      filters,
      pagination,
      order,
    },
  };
};

const pickActions = (dispatch) => {
  const actions = {
    loadProperties,
    ...FilterActions,
    ...PaginationActions,
    ...OrderActions,
    push,
  };

  return {
    actions: bindActionCreators(actions, dispatch),
  };
};

export default connect(pickState, pickActions)(List);
