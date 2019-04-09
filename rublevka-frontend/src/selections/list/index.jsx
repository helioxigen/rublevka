import React, { Component, PropTypes } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// seo
import Helmet from 'react-helmet';
import { helmet } from 'config/seo';

import { cloudfront } from 'core/config/resources';

// actions
import loadSelection from 'core/selections/actions/id/load';
import loadCountryProperties from 'core/countryProperties/actions/list/load';
import loadCityProperties from 'core/cityProperties/actions/list/load';
import * as PaginationActions from 'core/actions/pagination';
import * as FilterActions from 'core/actions/filters';
import * as OrderActions from 'core/actions/order';

// UI
import UI from 'ui';

// components
import { FormattedNumber } from 'react-formatted';

import CountryCard from 'countryProperties/card';
import CityCard from 'cityProperties/card';

import Pagination from 'components/pagination';
import OrderBy from 'properties/orderBy';
import NotFound from 'properties/notFound';

// styles
import s from 'styles/pages/selections';
import sTypography from 'styles/typography';
import sUtils from 'cem/styles/utils';

// helpers
import { isPaginationOrFiltersOrOrderByUpdated as isUpdated } from 'core/helpers/shouldLoad';
import { dealTypes } from 'constants/properties/dictionaries';

// UI
const {
  Visibility,
  Grid: { Container, Row, Col },
} = UI;

function getImgUrl(data) {
  const { photo = {} } = data;
  if (photo.id) {
    return `url(${global.config.cloudfront || cloudfront}/${photo.id}-256)`;
  } else if (typeof window !== 'undefined') {
    return 'url(https://s3.eu-central-1.amazonaws.com/dt-marketing/assets/placeholder.jpg)';
  }
}

// component
class List extends Component {
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
    }),
  };

  constructor(props) {
    super(props);

    this.group = 'forSelections';
    this.resourceCountry = `countryProperties.${this.group}`;
    this.resourceCity = `cityProperties.${this.group}`;
  }

  componentWillMount() {
    const { params = {} } = this.props;
    const parsedSelection = params.selection.split('_');
    const [selectionName, selectionId] = parsedSelection;

    this.props.actions.loadSelection(selectionId).then(() => {
      this.load(this.props);
    });
  }

  componentWillReceiveProps(nextProps) {
    if (
      isUpdated(this.resourceCountry, this.props, nextProps) ||
      isUpdated(this.resourceCity, this.props, nextProps)
    ) {
      this.load(nextProps);
    }
  }

  load({ state, actions, params }) {
    const { selections = {} } = state;
    const parsedSelection = params.selection.split('_');
    const [selectionName, selectionId] = parsedSelection;
    const { data = {} } = selections[selectionId] || {};

    if (data.propertyCategory === 'country') {
      const options = {
        pagination: state.pagination[this.resourceCountry],
        filter: {
          ...state.filters[this.resourceCountry],
          id: data.propertyIds,
        },
        orderBy: state.order[this.resourceCountry],
      };

      actions.loadCountryProperties(options, this.group);
    }

    if (data.propertyCategory === 'city') {
      const options = {
        pagination: state.pagination[this.resourceCity],
        filter: {
          ...state.filters[this.resourceCity],
          id: data.propertyIds,
        },
        orderBy: state.order[this.resourceCity],
      };

      actions.loadCityProperties(options, this.group);
    }
  }

  render() {
    const { actions, state, params } = this.props;
    const seo = helmet.properties.list.country;
    const parsedSelection = params.selection.split('_');
    const [selectionName, selectionId] = parsedSelection;

    const { selections = {} } = state;
    const { data = {} } = selections[selectionId] || {};

    const { forSelections = {} } =
      state[`${data.propertyCategory}Properties`] || {};
    const { ids = [], isFetching } = forSelections;

    const hasItems = !!ids.length;
    const pagination =
      state.pagination[`${data.propertyCategory}Properties.${this.group}`] ||
      {};
    const dealType = data.offerKind === 'rent' ? 'arenda' : 'prodaja';

    const imgUrl = getImgUrl(data);

    return (
      <section>
        {seo && (
          <Helmet
            title={seo.title(dealTypes[dealType], params.kind)}
            meta={[
              {
                name: 'description',
                content: seo.description(dealTypes[dealType], params.kind),
              },
              {
                name: 'keywords',
                content: seo.keywords(dealTypes[dealType], params.kind),
              },
            ]}
          />
        )}

        {hasItems && (
          <Container className={sUtils.pushedTop3}>
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
                  resourceName={`${data.propertyCategory}Properties.${
                    this.group
                  }`}
                  group={this.group}
                  actions={actions}
                  state={
                    state.order[
                      `${data.propertyCategory}Properties.${this.group}`
                    ]
                  }
                  updatePagination={this.props.actions.updatePagination}
                  fields={[
                    `${dealTypes[dealType]}Offer.multiCurrencyPrice.usd`,
                    'location.mkadDistance',
                    'landDetails.area',
                    'specification.area',
                  ]}
                />
              </Col>
            </Row>
          </Container>
        )}
        {hasItems && (
          <Container fluid>
            <Row>
              <Col xs="12" sm="6" md="4">
                <div className={s.collectionCard}>
                  <div
                    className={s.background}
                    style={{ backgroundImage: imgUrl }}
                  />
                  <div className={s.content}>
                    <h2>{data.name}</h2>
                    <p className={s.text}>{data.description}</p>
                  </div>
                </div>
              </Col>

              {data.propertyCategory === 'country' &&
                ids.map(item => (
                  <CountryCard
                    dealType={dealType}
                    key={item}
                    id={item}
                    showLocation
                  />
                ))}

              {data.propertyCategory === 'city' &&
                ids.map(item => (
                  <CityCard
                    dealType={dealType}
                    key={item}
                    id={item}
                    showLocation
                  />
                ))}
            </Row>
          </Container>
        )}

        {!isFetching && !ids.length && <NotFound />}

        {hasItems && pagination.total > 31 && (
          <Container fluid>
            <Row sm="center">
              <Col sm="6" className={s.paginationWrapper}>
                <section>
                  <Pagination
                    total={pagination.total}
                    offset={pagination.offset}
                    limit={pagination.limit}
                    resource={`${data.propertyCategory}Properties.${
                      this.group
                    }`}
                    updatePagination={this.props.actions.updatePagination}
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
    selections,
    filters,
    pagination,
    order,
  } = state;

  return {
    state: {
      countryProperties,
      cityProperties,
      selections,
      filters,
      pagination,
      order,
    },
  };
};

const pickActions = dispatch => {
  const actions = {
    loadSelection,
    loadCountryProperties,
    loadCityProperties,
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
