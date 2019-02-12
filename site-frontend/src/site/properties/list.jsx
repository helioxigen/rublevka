import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// seo
import { helmet } from 'site/config/seo';

// actions
import loadCountryProperties from 'core/countryProperties/actions/list/load';
import loadCityProperties from 'core/cityProperties/actions/list/load';
import * as PaginationActions from 'core/actions/pagination';
import * as FilterActions from 'core/actions/filters';
import * as OrderActions from 'core/actions/order';
import { updateDisplayOption } from 'site/displayOptions/actions';

import { track } from 'core/analytics';
import * as analyticsEvents from 'core/analytics/constants';

// UI
import UI from 'site/ui';

// components
import Helmet from './Helmet';
import { FormattedNumber } from 'react-formatted';

import CardCountry from 'site/countryProperties/card';
import CardCity from 'site/cityProperties/card';
import ResultForm from 'site/request/PropertiesFormSatTisa';

import Pagination from 'site/components/pagination';
import FilterCountry from 'site/countryProperties/list/filter';
import FilterCity from 'site/cityProperties/list/filter';
import OrderBy from 'site/properties/orderBy';
import NotFound from 'site/properties/notFound';

// styles
import s from 'site/styles/list';
import sTypography from 'site/styles/typography';

// helpers
import isEqual from 'lodash/isEqual';
import { isPaginationOrFiltersOrOrderByUpdated as isUpdated } from 'core/helpers/shouldLoad';
import {
  categories,
  dealTypes,
  kinds,
} from 'site/constants/properties/dictionaries';

// UI
const {
  Visibility,
  Grid: { Container, Row, Col },
} = UI;

// component
class List extends Component {
  static loadServer(dispatch, _, props) {
    this.group = dealTypes[props.params.dealType];

    const params = {
      pagination: {
        offset: 22 * (props.location.query.page - 1),
      },
    };

    if (categories[props.params.category] === 'country') {
      return Promise.all([dispatch(loadCountryProperties(params, this.group))]);
    } else if (categories[props.params.category] === 'city') {
      return Promise.all([dispatch(loadCityProperties(params, this.group))]);
    }
  }

  constructor(props) {
    super(props);

    this.state = {
      resource: categories[props.params.category],
      dealType: props.params.dealType,
    };

    this.group = dealTypes[props.params.dealType];
    this.resource = `${this.state.resource}Properties.${this.group}`;

    this.toggleResourceName = this.toggleResourceName.bind(this);
    this.toggleView = this.toggleView.bind(this);
    this.onClose = this.onClose.bind(this);
    this.toggleResourceName = this.toggleResourceName.bind(this);
    this.toggleView = this.toggleView.bind(this);
    this.onClose = this.onClose.bind(this);
    this.resetFilter = this.resetFilter.bind(this);
  }

  componentWillMount() {
    const { params = {} } = this.props;

    const paginationParams = {
      pagination: {
        offset: 22 * (this.props.location.query.page - 1),
      },
    };

    this.load(this.props, paginationParams);

    if (params.kind) {
      this.props.actions.updateFilter(this.resource, {
        kind: [kinds[params.kind]],
      });
    }

    track(
      analyticsEvents.propertiesListOpened({
        dealType: dealTypes[this.props.params.dealType],
      }),
    );
  }

  componentWillReceiveProps(nextProps) {
    const isGroupUpdated = !isEqual(
      this.props.params.dealType,
      nextProps.params.dealType,
    );
    const isCategoryUpdated = !isEqual(
      this.props.params.category,
      nextProps.params.category,
    );
    const isKindUpdated = !isEqual(
      this.props.params.kind,
      nextProps.params.kind,
    );

    if (isGroupUpdated || isCategoryUpdated) {
      this.group = dealTypes[nextProps.params.dealType];
      this.setState({
        resource: categories[nextProps.params.category],
        dealType: nextProps.params.dealType,
      });
      this.resource = `${categories[nextProps.params.category]}Properties.${
        this.group
      }`;

      track(
        analyticsEvents.propertiesListOpened({
          dealType: dealTypes[nextProps.params.dealType],
        }),
      );
    }

    if (isKindUpdated) {
      this.props.actions.updateFilter(this.resource, {
        kind: [kinds[nextProps.params.kind]],
      });
    }

    if (
      isUpdated(this.resource, this.props, nextProps) ||
      isGroupUpdated ||
      isCategoryUpdated
    ) {
      const params = {
        pagination: {
          offset: 22 * (nextProps.location.query.page - 1),
        },
      };

      this.load(nextProps, params);
    }
  }

  onClose() {
    this.toggleResourceName('resource', categories[this.props.params.category]);

    this.setState({ isViewOpen: false });
  }

  toggleView() {
    const isViewOpen = !this.state.isViewOpen;

    this.setState({ isViewOpen });
  }

  toggleResourceName(key, value) {
    this.setState({ [key]: value, isViewOpen: true }, () => {
      this.group = dealTypes[this.state.dealType];
      this.resource = `${this.state.resource}Properties.${this.group}`;

      this.load(this.props);
    });
  }

  load({ state, dispatch }, params = {}) {
    const options = {
      pagination: { ...state.pagination[this.resource], ...params.pagination },
      filter: { ...state.filters[this.resource], ...params.filter },
      orderBy: { ...state.order[this.resource], ...params.orderBy },
    };

    if (this.state.resource === 'country') {
      dispatch(loadCountryProperties(options, this.group));
    }

    if (this.state.resource === 'city') {
      dispatch(loadCityProperties(options, this.group));
    }
  }

  resetFilter() {
    this.props.actions.resetFilter(this.resource, null, null);
  }

  renderCards() {
    const {
      state,
      params: { dealType },
    } = this.props;
    const { ids = [] } = state.countryProperties[this.group] || {};
    const pagination = state.pagination[this.resource] || {};

    const formOffset = (pagination.offset / pagination.limit) % 4;
    const isPageEven = (pagination.offset / pagination.limit) % 2 === 0;

    return ids.map(id => {
      if (ids.indexOf(id) === 7 + formOffset) {
        return [
          <ResultForm propertyCategory="country" type="private" />,
          <CardCountry dealType={dealType} key={id} id={id} showLocation />,
        ];
      }

      if (ids.indexOf(id) === 20 + formOffset && isPageEven) {
        return [
          <ResultForm propertyCategory="country" type="help" />,
          <CardCountry dealType={dealType} key={id} id={id} showLocation />,
        ];
      }

      if (ids.indexOf(id) === 29 && !isPageEven) {
        return [
          <CardCountry dealType={dealType} key={id} id={id} showLocation />,
          <ResultForm propertyCategory="country" type="common" />,
        ];
      }

      return <CardCountry dealType={dealType} key={id} id={id} showLocation />;
    });
  }

  render() {
    const { actions, state, params = {}, location } = this.props;
    const dealType = dealTypes[params.dealType];
    const properties = state[`${categories[params.category]}Properties`] || {};
    const { ids = [], isFetching } = properties[this.group] || {};
    const pagination = state.pagination[this.resource] || {};

    const { query } = location;

    const hasItems = !!ids.length;
    const seo = helmet.properties.list.country;

    return (
      <section>
        {seo && (
          <Helmet
            kind={kinds[params.kind]}
            dealType={dealType}
            pagination={pagination}
            query={query}
          />
        )}

        <div>
          {this.state.resource === 'country' && (
            <FilterCountry
              resourceName={this.resource}
              resource={this.state.resource}
              group={this.group}
              count={pagination.total}
              updatePagination={this.props.actions.updatePagination}
              actions={actions} // TODO: use FilterHelper instead of passing actions
              state={state.filters[this.resource]} // TODO: refactor this because FilterHelper provides
              dealType={this.state.dealType} // TODO: check it's ok?
              toggleResourceName={this.toggleResourceName}
              isViewOpen={this.state.isViewOpen}
              toggle={this.toggleView}
              onClose={this.onClose}
            />
          )}

          {this.state.resource === 'city' && (
            <FilterCity
              resourceName={this.resource}
              resource={this.state.resource}
              group={this.group}
              count={pagination.total}
              updatePagination={this.props.actions.updatePagination}
              actions={actions} // TODO: use FilterHelper instead of passing actions
              state={state.filters[this.resource]} // TODO: refactor this because FilterHelper provides
              dealType={this.state.dealType} // TODO: check it's ok?
              toggleResourceName={this.toggleResourceName}
              isViewOpen={this.state.isViewOpen}
              toggle={this.toggleView}
              onClose={this.onClose}
            />
          )}
        </div>

        {hasItems && (
          <Container>
            <Row className={s.orderBySatellites}>
              <Col sm="4">
                <Visibility xs="hidden" sm="hidden">
                  <h2 className={sTypography.heading}>
                    Найдено <FormattedNumber value={pagination.total} />
                  </h2>
                </Visibility>
              </Col>
              <Col sm="8" className={sTypography.alignRight}>
                <OrderBy
                  resourceName={this.resource}
                  group={this.group}
                  actions={actions}
                  state={state.order[this.resource]}
                  updatePagination={this.props.actions.updatePagination}
                  fields={[
                    `${dealType}Offer.multiCurrencyPrice.usd`,
                    'location.mkadDistance',
                    'landDetails.area',
                    'specification.area',
                  ]}
                />
              </Col>
            </Row>
          </Container>
        )}

        {this.state.resource === 'country' && (
          <Container fluid>
            <Row>{this.renderCards()}</Row>
          </Container>
        )}

        {this.state.resource === 'city' && (
          <Container fluid>
            <Row>
              {ids.map(id => (
                <CardCity
                  dealType={params.dealType}
                  key={id}
                  id={id}
                  showLocation
                />
              ))}
            </Row>
          </Container>
        )}

        {!isFetching && !ids.length && (
          <NotFound resetFilter={this.resetFilter} />
        )}

        {hasItems && (
          <Container fluid>
            <Row sm="center">
              <Col sm="6" className={s.paginationWrapper}>
                <section>
                  <Pagination
                    total={pagination.total}
                    offset={pagination.offset}
                    limit={pagination.limit}
                    resource={this.resource}
                    updatePagination={this.props.actions.updatePagination}
                    baseUrl={location.pathname}
                    isScrollToTop
                  />
                </section>
              </Col>
            </Row>
          </Container>
        )}
      </section>
    );
  }
}

// redux connectors
const pickState = state => {
  const {
    countryProperties,
    cityProperties,
    filters,
    pagination,
    order,
  } = state;

  return {
    state: {
      countryProperties,
      cityProperties,
      filters,
      pagination,
      order,
    },
  };
};

const pickActions = dispatch => {
  const actions = {
    loadCountryProperties,
    loadCityProperties,
    ...FilterActions,
    ...PaginationActions,
    ...OrderActions,
    updateDisplayOption,
  };

  return {
    actions: bindActionCreators(actions, dispatch),
    dispatch,
  };
};

export default connect(
  pickState,
  pickActions,
)(List);
