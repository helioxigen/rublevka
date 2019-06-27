/* eslint-disable max-len */
import React, { Component } from 'react';
import styled from 'styled-components';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// helpers
import capitalize from 'lodash/capitalize';
import isEqual from 'lodash/isEqual';

// actions
import loadProperties from '../../../core/countryProperties/actions/list/load';
import * as PaginationActions from '../../../core/actions/pagination';
import * as FilterActions from '../../../core/actions/filters';
import * as OrderActions from '../../../core/actions/order';
import { updateDisplayOption } from '../../../displayOptions/actions';

// constants
import { resourceName } from '../../../core/countryProperties/constants/defaults';

import UI from '../../../ui/v2019';

// components
import {
  HeaderContainer,
  HeaderWrapper as HeaderWrapperBase,
} from '../../../countryProperties/v2019/list/styled';
import Card from '../../../countryProperties/v2019/Card';
import Filter from './Filter';
import NotFound from '../../../properties/notFound';
import OrderBy from '../../../properties/orderBy';
// import ResultForm from '../../../request/PropertiesFormSatTisa';

import media from '../../../styles/media';

import {
  dealTypesTranslit,
  dealTypesTranslateOther,
} from '../../../constants/properties/dictionaries';

const {
  Visibility,
  Grid: { Container, Row, Col },
  LoadMore,
} = UI;

const FilterContainer = styled.div`
  padding-left: 10px;
  padding-right: 15px;
  flex-basis: 20%;

  ${media.md`
    max-width: 20%;
  `}
`;

const CardsContainer = styled.div`
  padding-left: 15px;
  padding-right: 10px;
  flex-basis: 80%;
`;

const HeaderWrapper = HeaderWrapperBase.extend`
  margin-bottom: 24px;

  ${media.md`
    margin-top: 32px;
    margin-bottom: 34px;
  `}
`;

const Title = styled.h2`
  margin: 0;
  margin-top: 8px;
  margin-bottom: 16px;
  line-height: 28px;
  font-size: 21px;

  color: #232323;

  ${media.sm`
    margin: 0;
    font-size: 28px;
    margin-top: 8px;
  `}

  ${media.md`
    margin-top: 0px;
    font-size: 32px;
  `}
`;

class List extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isViewOpen: false,
    };

    this.group = `forSettlement${capitalize(props.dealType)}`;
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

    if (isGroupUpdated || isFiltersUpdated || isOrderUpdated) {
      this.load(nextProps, false);
    }

    if (isPaginationUpdated && !isGroupUpdated) {
      this.load(nextProps, true);
    }
  }

  onClose = () => {
    this.setState({ isViewOpen: false });
  };

  toggleView = () => {
    this.setState(prevState => ({ isViewOpen: !prevState.isViewOpen }));
  };

  resetFilter = () => {
    const { actions } = this.props;

    actions.resetFilter(this.resource, null, null);
  };

  load({ state, actions, settlementId }, append) {
    const options = {
      pagination: state.pagination[this.resource],
      filter: state.filters[this.resource],
      orderBy: state.order[this.resource],
    };

    actions.loadProperties(options, this.group, { settlementId, append });
  }

  renderOrderBy() {
    const { actions, dealType, state } = this.props;
    const { kind = [] } = state.filters[this.resource] || {};

    const landField = kind.includes('land')
      ? 'landDetails.area'
      : 'specification.area';

    return (
      <OrderBy
        resourceName={this.resource}
        group={this.group}
        actions={actions}
        state={state.order[this.resource]}
        updatePagination={this.props.actions.updatePagination}
        fields={[`${dealType}Offer.multiCurrencyPrice.usd`, landField]}
      />
    );
  }

  renderFilter() {
    const { actions, dealType, state, onTypeChange } = this.props;
    const pagination = state.pagination[this.resource] || {};

    return (
      <Filter
        resourceName={this.resource}
        resource="country"
        count={pagination.total}
        actions={actions}
        state={state.filters[this.resource]}
        dealType={dealTypesTranslit[dealType]}
        isViewOpen={this.state.isViewOpen}
        toggle={this.toggleView}
        onClose={this.onClose}
        onTypeChange={onTypeChange}
      />
    );
  }

  renderCards() {
    const { dealType, state } = this.props;
    const { ids = [] } = state.countryProperties[this.group] || {};

    return ids.map(id => (
      <Col xs="12" sm="6" md="6" lg="4">
        <Card
          dealType={dealTypesTranslit[dealType]}
          key={id}
          id={id}
          showLocation
        />
      </Col>
    ));
  }

  render() {
    const { data, dealType } = this.props;
    const { ids = [], isFetching } =
      this.props.state.countryProperties[this.group] || {};

    const pagination = this.props.state.pagination[this.resource] || {};

    const { saleProperties = {}, rentProperties = {} } =
      this.props.statistics || {};
    const resaleTotal = saleProperties.resale;
    const rentTotal = rentProperties.total;

    const hasItems = ids.length > 0;

    if (resaleTotal > 0 || rentTotal > 0) {
      return (
        <section>
          <Container>
            <HeaderWrapper>
              <HeaderContainer>
                <Visibility xs="hidden" sm="hidden" md="hidden" lg="block">
                  <Title>
                    {dealTypesTranslateOther[dealType]} недвижимость в пос.{' '}
                    {data.name}
                  </Title>
                </Visibility>
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

          <div>
            <Visibility xs="hidden" sm="hidden" md="hidden" lg="block">
              <Container>
                <Row>
                  <FilterContainer>{this.renderFilter()}</FilterContainer>
                  <CardsContainer>
                    <Row>
                      {!isFetching && !ids.length ? (
                        <NotFound resetFilter={this.resetFilter} />
                      ) : (
                        this.renderCards()
                      )}
                      {hasItems && (
                        <Col xs="12">
                          <LoadMore
                            size="lg"
                            total={pagination.total}
                            offset={pagination.offset}
                            limit={pagination.limit}
                            resource={this.resource}
                            updatePagination={
                              this.props.actions.updatePagination
                            }
                          >
                            Загрузить ещё
                          </LoadMore>
                        </Col>
                      )}
                    </Row>
                  </CardsContainer>
                </Row>
              </Container>
            </Visibility>
            <Visibility xs="block" sm="block" md="block" lg="hidden">
              <Container>
                <Row>
                  {this.renderCards()}
                  {hasItems && (
                    <Col xs="12">
                      <LoadMore
                        size="lg"
                        total={pagination.total}
                        offset={pagination.offset}
                        limit={pagination.limit}
                        resource={this.resource}
                        updatePagination={this.props.actions.updatePagination}
                      >
                        Загрузить ещё
                      </LoadMore>
                    </Col>
                  )}
                </Row>
              </Container>
            </Visibility>
          </div>

          {!isFetching && !ids.length && (
            <Visibility xs="block" sm="block" md="block" lg="hidden">
              <NotFound resetFilter={this.resetFilter} />
            </Visibility>
          )}
        </section>
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
    updateDisplayOption,
  };

  return {
    actions: bindActionCreators(actions, dispatch),
  };
};

export default connect(
  pickState,
  pickActions,
)(List);
