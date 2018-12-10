import React, { Component, PropTypes } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// actions
import loadProperties from 'core/countryProperties/actions/list/load';
import * as PaginationActions from 'core/actions/pagination';
import * as FilterActions from 'core/actions/filters';
import * as OrderActions from 'core/actions/order';

// constants
import { resourceName } from 'core/countryProperties/constants/defaults';

// UI
import UI from 'site/ui';

// components
import Pagination from 'site/components/pagination';

import Card from 'site/countryProperties/card';
import ResultForm from 'site/request/propertiesForm';

import NotFound from 'site/properties/notFound';

// styles
import s from 'site/styles/list';
import sList from 'site/styles/list';
import sTypography from 'site/styles/typography';

// helpers
import isEqual from 'lodash/isEqual';
import capitalize from 'lodash/capitalize';
import { isPaginationOrFiltersOrOrderByUpdated as isUpdated } from 'core/helpers/shouldLoad';
import { dealTypes } from 'site/constants/properties/dictionaries';

// UI
const { Loading, Visibility, Grid: { Container, Row, Col } } = UI;

// component
class PropertiesList extends Component {
  static propTypes = {
    state: PropTypes.shape({
      countryProperties: PropTypes.object.isRequired,

      filters: PropTypes.object.isRequired,
      pagination: PropTypes.object.isRequired,
      order: PropTypes.object.isRequired,
    }),
    actions: PropTypes.shape({
      loadProperties: PropTypes.func.isRequired,

      updatePagination: PropTypes.func.isRequired,

      setFilter: PropTypes.func.isRequired,
      updateFilter: PropTypes.func.isRequired,
      resetFilter: PropTypes.func.isRequired,
    }),
  };

  constructor(props) {
    super(props);

    this.group = `forPlace${capitalize(dealTypes[this.props.dealType])}`;
    this.resource = `${resourceName}.${this.group}`;

    this.resetFilter = this.resetFilter.bind(this);
  }

  componentWillMount() {
    const params = {
      pagination: {
        offset: 31 * (this.props.location.query.page - 1), // TODO: 31 → normal value
      },
    };

    this.load(this.props, params);
  }

  componentWillReceiveProps(nextProps) {
    const isGroupUpdated = !isEqual(this.props.dealType, nextProps.dealType);
    const isIdUpdated = !isEqual(this.props.placeId, nextProps.placeId);
    const pagination = this.props.state.pagination[this.resource] || {};
    const isPaginationHasOffset = pagination.offset !== 0;

    if (isGroupUpdated) {
      this.group = `forPlace${capitalize(dealTypes[nextProps.dealType])}`;
      this.resource = `${resourceName}.${this.group}`;
    }

    if (isIdUpdated && isPaginationHasOffset) {
      this.props.actions.updatePagination(this.resource, { offset: 0 });
    }

    if (isIdUpdated && !isPaginationHasOffset) {
      this.load(nextProps);
    }

    if (isUpdated(this.resource, this.props, nextProps)) {
      const params = {
        pagination: {
          offset: 31 * (nextProps.location.query.page - 1), // TODO: 31 → normal value
        },
      };

      this.load(nextProps, params);
    }
  }

  componentWillUnmount() {
    this.props.actions.updatePagination(this.resource, { offset: 0 });
  }

  load(props, params = {}) {
    const { state, dispatch, placeId, placeKind } = props;
    const dealType = dealTypes[props.dealType];

    const options = {
      pagination: { ...state.pagination[this.resource], ...params.pagination },
      filter: { ...state.filters[this.resource], ...params.filter },
      orderBy: { ...state.order[this.resource], ...params.orderBy },
    };

    dispatch(loadProperties(options, this.group, { placeId, placeKind, dealType }));
  }

  // static loadServer(dispatch, params) {
  //   const actions = bindActionCreators({ loadProperties }, dispatch);

  //   this.group = params.dealType;

  //   return Promise.all([
  //     actions.loadProperties({}, this.group),
  //   ]);
  // }

  resetFilter() {
    this.props.actions.resetFilter(this.resource, null, null);
  }

  renderCards() {
    const { state, dealType } = this.props;
    const { ids = [] } = state.countryProperties[this.group] || {};
    const pagination = state.pagination[this.resource] || {};

    const formOffset = pagination.offset / pagination.limit % 4;
    const isPageEven = pagination.offset / pagination.limit % 2 === 0;

    return ids.map((id) => {
      if (ids.indexOf(id) === 7 + formOffset) {
        return [
          <ResultForm propertyCategory="country" type="private" />,
          <Card dealType={dealType} key={id} id={id} showLocation />,
        ];
      }

      if (ids.indexOf(id) === 20 + formOffset && isPageEven) {
        return [
          <ResultForm propertyCategory="country" type="help" />,
          <Card dealType={dealType} key={id} id={id} showLocation />,
        ];
      }

      if (ids.indexOf(id) === 29 && !isPageEven) {
        return [
          <Card dealType={dealType} key={id} id={id} showLocation />,
          <ResultForm propertyCategory="country" type="common" />,
        ];
      }

      return <Card dealType={dealType} key={id} id={id} showLocation />;
    });
  }

  render() {
    const { state, location } = this.props;
    const { ids = [], isFetching } = state.countryProperties[this.group] || {};
    const pagination = state.pagination[this.resource] || {};

    const hasItems = !!ids.length;

    return (
      <section>
        {/* <Filter
          resourceName={this.resource}
          group={this.group}
          count={pagination.total}
          updatePagination={this.props.actions.updatePagination}
          actions={actions} // TODO: use FilterHelper instead of passing actions
          state={state.filters[this.resource]} // TODO: refactor this because FilterHelper provides
          dealType={dealType} // TODO: check it's ok?
        /> */}

        {isFetching &&
          <div className={s.pushed10_0}>
            <Loading />
          </div>}

        {hasItems &&
          <Container>
            <Row className={sList.orderByContainer}>
              <Col sm="4">
                <Visibility xs="hidden" sm="hidden">
                  <h2 className={sTypography.heading}>
                    Найдено {pagination && pagination.total}
                  </h2>
                </Visibility>
              </Col>
            </Row>
          </Container>}

        <Container fluid>
          <Row>
            {this.renderCards()}
          </Row>
        </Container>

        {!isFetching && !ids.length && <NotFound resetFilter={this.resetFilter} />}

        {hasItems &&
          <Container fluid>
            <Row sm="center">
              <Col sm="6" className={s.paginationWrapper}>
                <section>
                  <Pagination
                    total={pagination.total}
                    offset={pagination.offset}
                    limit={pagination.limit}
                    resource={this.resource}
                    baseUrl={location.pathname}
                    updatePagination={this.props.actions.updatePagination}
                    isScrollToTop
                  />
                </section>
              </Col>
            </Row>
          </Container>}
      </section>
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
    dispatch,
  };
};

export default connect(pickState, pickActions)(PropertiesList);
