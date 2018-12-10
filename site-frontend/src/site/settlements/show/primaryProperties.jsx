import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// actions
import loadProperties from 'core/countryProperties/actions/list/load';
import * as PaginationActions from 'core/actions/pagination';
import * as FilterActions from 'core/actions/filters';
import * as OrderActions from 'core/actions/order';

// constants
import { resourceName } from 'core/countryProperties/constants/defaults';

import UI from 'site/ui';
const { Loading, Grid: { Container, Row, Col }, LoadMore } = UI;

import Card from 'site/countryProperties/primaryCard';
import Filter from 'site/settlements/show/filter';
import NotFound from 'site/settlements/show/filter/notFound';

// styles
import cn from 'classnames';
import st from 'site/styles/themes';
import s from 'site/styles/settlements/id/properties';
import sUtils from 'site/styles/utils';

// helpers
import isEqual from 'lodash/isEqual';

class List extends Component {
  constructor(props) {
    super(props);

    this.group = 'forSettlementOnlyPrimary';
    this.resource = `${resourceName}.${this.group}`;
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
    const { ids = [], isFetching } = this.props.state.countryProperties[this.group] || {};
    const pagination = this.props.state.pagination[this.resource] || {};

    const state = this.props.state.filters[this.resource];

    const hasItems = ids.length > 0;

    return (
      <Container fluid className={sUtils.bgWhite}>
        <Row xs="center" id="scroll" className={s.mainContainer}>
          <Col xs="12" sm="10">
            <h2 className={s.title}>Недвижимость от застройщика ({pagination.total})</h2>
          </Col>

          <Filter
            updateFilter={::this.updateFilter}
            resetFilter={::this.resetFilter}
            selected={state}
            dealType="sale"
          />
        </Row>

        {hasItems &&
        !isFetching && (
          <Row xs="center" className={s.cardsContainer}>
            <Col xs="12" sm="10">
              {ids.map(id => <Card dealType="sale" key={id} id={id} />)}
            </Col>
          </Row>
        )}

        {isFetching && (
          <Row xs="center" className={s.cardsContainer}>
            <Col xs="12" sm="10">
              <div className={sUtils.pushedBottom3}>
                <Loading />
              </div>
            </Col>
          </Row>
        )}

        {!hasItems && !isFetching && <NotFound resetFilter={::this.resetFilter} />}

        <Row xs="center" className={sUtils.bgWhite}>
          <Col xs="12">
            <LoadMore
              size="lg"
              total={pagination.total}
              offset={pagination.offset}
              limit={pagination.limit}
              resource={this.resource}
              updatePagination={::this.props.actions.updatePagination}
              className={cn(sUtils.pushedBottom4, st.settlement.btnLoad)}
            >
              Показать ещё
            </LoadMore>
          </Col>
        </Row>
      </Container>
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
  };

  return {
    actions: bindActionCreators(actions, dispatch),
  };
};

export default connect(pickState, pickActions)(List);
