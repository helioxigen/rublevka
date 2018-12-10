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

import Card from 'site/countryProperties/primaryCard';
import Filter from './Filter';
import NotFound from './Filter/NotFound';

// helpers
import isEqual from 'lodash/isEqual';

import { Wrapper, Relative, CardWrapper, StLoading, StLoadMore, ListWrapper } from './styled';

const { Grid: { Container, Row, Col } } = UI;

class List extends Component {
  constructor(props) {
    super(props);

    this.group = 'forSettlementOnlyPrimary';
    this.resource = `${resourceName}.${this.group}`;

    this.updateFilter = this.updateFilter.bind(this);
    this.resetFilter = this.resetFilter.bind(this);
    this.props.actions.updatePagination = this.props.actions.updatePagination.bind(this);
  }

  componentWillMount() {
    this.props.actions.resetFilter(this.resource, null, null);
    this.props.actions.updatePagination(this.resource, { offset: 0 });

    this.load(this.props, false);
  }

  componentWillReceiveProps(nextProps) {
    const pagination = this.props.state.pagination[this.resource] || {};
    const nextPagination = nextProps.state.pagination[this.resource] || {};
    const offset = pagination.offset || 0;
    const nextOffset = nextPagination.offset || 0;

    const filters = this.props.state.filters[this.resource] || {};
    const nextFilters = nextProps.state.filters[this.resource] || {};

    const isPaginationUpdated = !isEqual(offset, nextOffset);
    const isFiltersUpdated = !isEqual(filters, nextFilters);

    if (isPaginationUpdated) {
      this.load(nextProps, true);
    }

    if (isFiltersUpdated) {
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
    const { toggleProperty, primaryTotal, propertyType, noResaleProperty } = this.props;
    const { ids = [], isFetching } = this.props.state.countryProperties[this.group] || {};
    const pagination = this.props.state.pagination[this.resource] || {};

    const state = this.props.state.filters[this.resource];

    const hasItems = ids.length > 0;

    return (
      <Wrapper>
        <Container fluid>
          <Relative>
            <div id="scroll">
              <Filter
                updateFilter={this.updateFilter}
                resetFilter={this.resetFilter}
                selected={state}
                dealType="sale"
                toggleProperty={toggleProperty}
                primaryTotal={primaryTotal}
                propertyType={propertyType}
                count={pagination.total}
                noResaleProperty={noResaleProperty}
              />
            </div>
          </Relative>

          <ListWrapper>
            {hasItems &&
              !isFetching && (
                <CardWrapper>
                  <Row xs="center">
                    <Col xs="12" sm="10">
                      {ids.map(id => <Card dealType="sale" key={id} id={id} />)}
                    </Col>
                  </Row>
                </CardWrapper>
              )}

            {isFetching && (
              <CardWrapper>
                <Row xs="center">
                  <Col xs="12" sm="10">
                    <StLoading />
                  </Col>
                </Row>
              </CardWrapper>
            )}

            {!hasItems && !isFetching && <NotFound resetFilter={this.resetFilter} />}

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
          </ListWrapper>
        </Container>
      </Wrapper>
    );
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
