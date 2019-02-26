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
import UI from 'site/ui/v2019';

// component
import Helmet from './Helmet';
import { FormattedNumber } from 'react-formatted';

import Breadcrumbs from './Breadcrumbs';
import { Title, HeaderContainer, HeaderWrapper } from 'site/countryProperties/v2019/list/styled';
import Card from 'site/countryProperties/v2019/Card';
import Pagination from 'site/components/v2019/pagination';
import Filter from 'site/countryProperties/v2019/list/filter';
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
  dealTypesTranslateOther,
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

  renderOrderBy() {
    const { actions, params, state } = this.props;
    const dealType = dealTypes[params.dealType];

    return (
      <OrderBy
        resourceName={this.resource}
        group={this.group}
        actions={actions}
        state={state.order[this.resource]}
        updatePagination={this.props.actions.updatePagination}
        fields={[
          `${dealType}Offer.multiCurrencyPrice.usd`,
          'location.mkadDistance',
        ]}
      />
    );
  }

  renderFilter() {
    const { actions, state } = this.props;
    const pagination = state.pagination[this.resource] || {};

    return (
      <Filter
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
    );
  }

  renderCards() {
    const {
      state,
      params: { dealType },
    } = this.props;
    const { ids = [] } = state.countryProperties[this.group] || {};

    return ids.map(id => (
      <Col xs="12" sm="6" md="6" lg="4">
        <Card dealType={dealType} key={id} id={id} showLocation />
      </Col>
      ));
  }

  render() {
    const { actions, state, params = {}, location } = this.props;
    const dealType = dealTypes[params.dealType];
    const properties = state[`${categories[params.category]}Properties`] || {};
    const { ids = [], data = {}, isFetching } = properties[this.group] || {};
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


        {hasItems && (
          <Container>
            <HeaderWrapper>
              <Breadcrumbs data={data} dealType={dealType} />
              <HeaderContainer>
                <Title>{dealTypesTranslateOther[dealType]} недвижимость на Рублёвке</Title>
                <Visibility xs="hidden" sm="hidden" md="hidden" lg="block">
                  {this.renderOrderBy()}
                </Visibility>
              </HeaderContainer>
            </HeaderWrapper>
            <Visibility xs="block" sm="block" md="block" lg="hidden">
              <HeaderContainer>
                {this.renderFilter()}
                {this.renderOrderBy()}
              </HeaderContainer>
            </Visibility>
          </Container>
        )}

        {this.state.resource === 'country' && (
          <div>
            <Visibility xs="hidden" sm="hidden" md="hidden" lg="block">
              <Container >
                <Row>
                  <Col md="4" lg="3">
                    {this.renderFilter()}
                  </Col>
                  <Col md="8" lg="9">
                    <Row>
                      {this.renderCards()}
                    </Row>
                  </Col>
                </Row>
              </Container>
            </Visibility>
            <Visibility xs="block" sm="block" md="block" lg="hidden">
              <Container>
                <Row>
                  {this.renderCards()}
                </Row>
              </Container>
            </Visibility>
          </div>
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
const pickState = (state) => {
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

const pickActions = (dispatch) => {
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
