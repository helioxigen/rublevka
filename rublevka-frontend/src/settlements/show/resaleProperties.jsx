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

import UI from 'ui';
const {
  Loading,
  Grid: { Container, Row, Col },
  LoadMore,
} = UI;

// components
import Card from 'countryProperties/card';
import ResultForm from 'request/PropertiesFormSatTisa';
import Filter from 'settlements/show/filter';
import NotFound from 'settlements/show/filter/notFound';

// styles
import cn from 'classnames';
import s from 'styles/settlements/id/properties';
import st from 'styles/themes';
import sUtils from 'styles/utils';

// helpers
import capitalize from 'lodash/capitalize';
import isEqual from 'lodash/isEqual';

import { dealTypesTranslit } from 'constants/properties/dictionaries';

class List extends Component {
  constructor(props) {
    super(props);

    this.group = `forSettlement${capitalize(props.dealType)}`;
    this.resource = `${resourceName}.${this.group}`;

    this.updateFilter = this.updateFilter.bind(this);
    this.resetFilter = this.resetFilter.bind(this);
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

    const isGroupUpdated = !isEqual(this.props.dealType, nextProps.dealType);

    if (isGroupUpdated) {
      // TODO: move that check to isUpdated
      this.group = `forSettlement${capitalize(nextProps.dealType)}`;
      this.resource = `${resourceName}.${this.group}`;
    }

    if (isPaginationUpdated || isGroupUpdated) {
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
    const { dealType, settlementId, kind } = this.props;
    const { ids = [], isFetching } =
      this.props.state.countryProperties[this.group] || {};

    const pagination = this.props.state.pagination[this.resource] || {};

    const { saleProperties = {}, rentProperties = {} } =
      this.props.statistics || {};
    const resaleTotal = saleProperties.resale;
    const rentTotal = rentProperties.total;

    const state = this.props.state.filters[this.resource];

    const hasItems = ids.length > 0;

    if (resaleTotal > 0 || rentTotal > 0) {
      return (
        <Container fluid>
          <Row xs="center" className={s.mainContainer}>
            <Col xs="10">
              <h2 className={s.title}>
                Недвижимость от собственников ({pagination.total})
              </h2>
            </Col>

            <Filter
              updateFilter={this.updateFilter}
              resetFilter={this.resetFilter}
              toggleDealType={this.props.toggleDealType}
              selected={state}
              dealType={dealType}
              isResaleProperty
              id={settlementId}
            />
          </Row>

          <Row className={sUtils.bgWhite}>
            <Col xs="12">
              {hasItems && !isFetching && (
                <Row>
                  {ids.map(id => (
                    <Card dealType={dealTypesTranslit[dealType]} id={id} />
                  ))}
                  <ResultForm propertyCategory="country" type="common" />
                </Row>
              )}

              {isFetching && (
                <div className={sUtils.pushedBottom3}>
                  <Loading />
                </div>
              )}

              {!hasItems && <NotFound resetFilter={this.resetFilter} />}
            </Col>

            <Container fluid>
              <Row xs="center">
                <Col xs="12">
                  <LoadMore
                    size="lg"
                    total={pagination.total}
                    offset={pagination.offset}
                    limit={pagination.limit}
                    resource={this.resource}
                    updatePagination={this.props.actions.updatePagination}
                    className={cn(sUtils.pushedBottom4, st.settlement.btnLoad)}
                  >
                    Показать ещё
                  </LoadMore>
                </Col>
              </Row>
            </Container>
          </Row>
        </Container>
      );
    }

    return null;
  }
}

// redux connectors
const pickState = state => {
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

const pickActions = dispatch => {
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

export default connect(
  pickState,
  pickActions,
)(List);
