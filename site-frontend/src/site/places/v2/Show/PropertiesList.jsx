import React, { Component, PropTypes } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// actions
import loadProperties from 'core/countryProperties/actions/list/load';
import * as PaginationActions from 'core/actions/pagination';
import * as FilterActions from 'core/actions/filters';
import * as OrderActions from 'core/actions/order';
import { updateDisplayOption } from 'site/displayOptions/actions';

// constants
import { resourceName } from 'core/countryProperties/constants/defaults';

// UI
import UI from 'site/ui';

// components
import Pagination from 'site/components/pagination';

import Card from 'site/countryProperties/v2/Card';
import ResultForm from 'site/request/PropertiesFormTisa';
import Filter from './Filter';
import OrderBy from './OrderBy';

import NotFound from './NotFound';

// styles
import s from 'site/styles/list';

// helpers
import isEqual from 'lodash/isEqual';
import capitalize from 'lodash/capitalize';
import { isPaginationOrFiltersOrOrderByUpdated as isUpdated } from 'core/helpers/shouldLoad';
import { dealTypes, kinds } from 'site/constants/properties/dictionaries';

import styled from 'styled-components';
import media from 'site/styles/media';

// UI
const { Loading, Grid: { Container, Row, Col } } = UI;

export const ListWrapper = styled.div`
  max-width: 1600px;
  margin: 0 auto;
  background: #fff;
`;

const Wrapper = styled.div`background: #fff;`;
const Relative = styled(Container)`position: relative;`;
const FilterWrapper = styled.div`
  margin: 3rem 0;
  ${media.sm`
    margin: 3.5rem 0 0.5rem;
  `};
`;

const OrderWrapper = styled.div`
  position: absolute;
  top: 3rem;
  right: 1.5rem;

  ${media.sm`
    top: 3.5rem;
  `};
`;

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

  // static loadServer(dispatch, _, props) {
  //   this.group = `forPlace${capitalize(dealTypes[props.dealType])}`;

  //   const paginationParams = {
  //     pagination: {
  //       offset: 22 * (props.location.query.page - 1),
  //     },
  //   };
  //   return Promise.all([dispatch(loadProperties(paginationParams, this.group))]);
  // }

  constructor(props) {
    super(props);

    this.group = `forPlace${capitalize(dealTypes[this.props.dealType])}`;
    this.resource = `${resourceName}.${this.group}`;

    this.resetFilter = this.resetFilter.bind(this);
  }

  componentWillMount() {
    const { params = {} } = this.props;

    if (params.kind) {
      this.props.actions.updateFilter(this.resource, {
        kind: [kinds[params.kind]],
      });
    }
  }

  componentDidMount() {
    const paginationParams = {
      pagination: {
        offset: 22 * (this.props.location.query.page - 1),
      },
    };

    this.load(this.props, paginationParams);
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

    // if (isIdUpdated && isPaginationHasOffset) {
    //   this.props.actions.updatePagination(this.resource, { offset: 0 });
    // }

    if (isIdUpdated && !isPaginationHasOffset) {
      const paginationParams = {
        pagination: {
          offset: 22 * (nextProps.location.query.page - 1),
        },
      };

      this.load(nextProps, paginationParams);
    }

    if (isUpdated(this.resource, this.props, nextProps)) {
      const paginationParams = {
        pagination: {
          offset: 22 * (nextProps.location.query.page - 1),
        },
      };

      this.load(nextProps, paginationParams);
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

  resetFilter() {
    this.props.actions.resetFilter(this.resource, null, null);
  }

  renderCards() {
    const { state, dealType } = this.props;
    const { ids = [] } = state.countryProperties[this.group] || {};
    const pagination = state.pagination[this.resource] || {};

    const formOffset = (pagination.offset / pagination.limit) % 4;
    const isPageEven = (pagination.offset / pagination.limit) % 2 === 0;

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
    const { data, actions, state, location, params, translatedPlaceKind, dealType } = this.props;
    const { ids = [], isFetching } = state.countryProperties[this.group] || {};
    const pagination = state.pagination[this.resource] || {};

    const hasItems = !!ids.length;

    return (
      <section>
        {isFetching && (
          <div className={s.pushed10_0}>
            <Loading />
          </div>
        )}

        {hasItems && (
          <Wrapper>
            <Relative>
              <Row>
                <Col xs="12">
                  <FilterWrapper>
                    <Filter
                      resourceName={this.resource}
                      count={pagination.total}
                      data={data}
                      state={state.filters[this.resource]}
                      translatedPlaceKind={translatedPlaceKind}
                      dealType={dealType}
                      updatePagination={this.props.actions.updatePagination}
                      kind={params.kind}
                      place={params.place}
                      params={params}
                      location={location}
                    />
                  </FilterWrapper>

                  <OrderWrapper>
                    <OrderBy
                      resourceName={this.resource}
                      group={this.group}
                      actions={actions}
                      state={state.order[this.resource]}
                      updatePagination={this.props.actions.updatePagination}
                      fields={[
                        `${dealTypes[params.dealType]}Offer.multiCurrencyPrice.usd`,
                        'location.mkadDistance',
                      ]}
                    />
                  </OrderWrapper>
                </Col>
              </Row>
            </Relative>
          </Wrapper>
        )}

        <Wrapper>
          <ListWrapper>
            <Container fluid>
              <Row>{this.renderCards()}</Row>
            </Container>

            {hasItems && (
              <Container fluid>
                <Row sm="center">
                  <Col sm="6" className={s.paginationWrapper}>
                    <section>
                      <Pagination
                        loadMore
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
              </Container>
            )}
          </ListWrapper>
        </Wrapper>
        {!isFetching &&
          !ids.length && (
            <NotFound
              dealType={params.dealType}
              place={params.place}
              translatedPlaceKind={translatedPlaceKind}
              resetFilter={this.resetFilter}
            />
          )}
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
    updateDisplayOption,
  };

  return {
    actions: bindActionCreators(actions, dispatch),
    dispatch,
  };
};

export default connect(pickState, pickActions)(PropertiesList);
