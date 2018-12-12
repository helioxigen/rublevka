import React, { Component, PropTypes } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// seo
import Helmet from 'react-helmet';
import { helmet } from 'site/config/seo';

// actions
import loadSelection from 'core/selections/actions/id/load';
import loadCountryProperties from 'core/countryProperties/actions/list/load';
import * as PaginationActions from 'core/actions/pagination';
import * as FilterActions from 'core/actions/filters';
import * as OrderActions from 'core/actions/order';

// UI
import UI from 'site/ui';

// components
import Header from './Header';
import Card from 'site/countryProperties/v2/Card';
import Pagination from 'site/components/pagination';
import OrderBy from 'site/properties/v2/OrderBy';
import NotFound from 'site/properties/notFound';

// helpers
import { isPaginationOrFiltersOrOrderByUpdated as isUpdated } from 'core/helpers/shouldLoad';
import { dealTypes } from 'site/constants/properties/dictionaries';

import { Wrapper, ListWrapper, OrderWrapper, PaginationWrapper } from './styled';

// UI
const { Grid: { Container, Row, Col } } = UI;

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

  render() {
    const { actions, state, params } = this.props;
    const seo = helmet.properties.list.country;
    const parsedSelection = params.selection.split('_');
    const [selectionName, selectionId] = parsedSelection;

    const { selections = {} } = state;
    const { data = {} } = selections[selectionId] || {};

    const { forSelections = {} } = state[`${data.propertyCategory}Properties`] || {};
    const { ids = [], isFetching } = forSelections;

    const hasItems = !!ids.length;
    const pagination = state.pagination[`${data.propertyCategory}Properties.${this.group}`] || {};
    const dealType = data.offerKind === 'rent' ? 'arenda' : 'prodaja';

    return (
      <Wrapper>
        {seo && (
          <Helmet
            title={seo.title(dealTypes[dealType], params.kind)}
            meta={[
              { name: 'description', content: seo.description(dealTypes[dealType], params.kind) },
              { name: 'keywords', content: seo.keywords(dealTypes[dealType], params.kind) },
            ]}
          />
        )}

        <Header data={data} />

        {hasItems && (
          <Container>
            <Row>
              <Col sm="12">
                <OrderWrapper>
                  <OrderBy
                    resourceName={`${data.propertyCategory}Properties.${this.group}`}
                    group={this.group}
                    actions={actions}
                    state={state.order[`${data.propertyCategory}Properties.${this.group}`]}
                    updatePagination={this.props.actions.updatePagination}
                    fields={[
                      `${dealTypes[dealType]}Offer.multiCurrencyPrice.usd`,
                      'location.mkadDistance',
                    ]}
                  />
                </OrderWrapper>
              </Col>
            </Row>
          </Container>
        )}
        {hasItems && (
          <ListWrapper>
            <Container fluid>
              <Row>
                {ids.map(item => <Card dealType={dealType} key={item} id={item} showLocation />)}
              </Row>
            </Container>
          </ListWrapper>
        )}

        {!isFetching && !ids.length && <NotFound />}

        {hasItems &&
          pagination.total > 36 && (
            <PaginationWrapper>
              <section>
                <Pagination
                  total={pagination.total}
                  offset={pagination.offset}
                  limit={pagination.limit}
                  resource={`${data.propertyCategory}Properties.${this.group}`}
                  updatePagination={this.props.actions.updatePagination}
                  isScrollToTop
                />
              </section>
            </PaginationWrapper>
          )}
      </Wrapper>
    );
  }
}

// redux connectors
const pickState = (state) => {
  const { countryProperties, selections, filters, pagination, order } = state;

  return {
    state: {
      countryProperties,
      selections,
      filters,
      pagination,
      order,
    },
  };
};

const pickActions = (dispatch) => {
  const actions = {
    loadSelection,
    loadCountryProperties,
    ...FilterActions,
    ...PaginationActions,
    ...OrderActions,
  };

  return {
    actions: bindActionCreators(actions, dispatch),
  };
};

export default connect(pickState, pickActions)(List);
