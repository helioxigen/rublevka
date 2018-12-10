import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// components
import Filter from 'landing/properties/filter';
import Card from 'landing/properties/card';
import NotFound from 'landing/properties/notFound';

// actions
import loadProperties from 'core/countryProperties/actions/list/load';
import * as PaginationActions from 'core/actions/pagination';
import * as FilterActions from 'core/actions/filters';
import * as OrderActions from 'core/actions/order';

// constants
import { resourceName } from 'core/countryProperties/constants/defaults';

import isEqual from 'lodash/isEqual';

import cn from 'classnames';
import s from 'landing/styles/properties/list';

import UI from 'site/ui';
const {
  Button, BtnGroup,
  LoadMore,
  Visibility,
  Grid: { Container, Row, Col },
} = UI;

class List extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tab: `all`,
    };

    this.group = `forSettlementLanding`;
    this.resource = `${resourceName}.${this.group}`;
  }

  componentWillMount() {
    this.resetFilter();
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

  toggle(tab) {
    this.setState({ tab: tab });
  }

  load({ state, actions, settlementId }, append) {
    const options = {
      pagination: state.pagination[this.resource],
      filter: state.filters[this.resource],
      orderBy: state.order[this.resource],
    };

    actions.loadProperties(options, this.group, { settlementId, append });
  }

  updateFilter(key, value) {
    const values = {
      [key]: value,
    };

    this.props.actions.updatePagination(this.resource, { offset: 0 });
    this.props.actions.updateFilter(this.resource, values);
  }

  removeFilter(key) {
    this.props.actions.removeFilter(this.resource, key);
  }

  resetFilter(key) {
    this.props.actions.resetFilter(this.resource, key, null);
  }

  render() {
    const { state, data = {} } = this.props;
    const pagination = this.props.state.pagination[this.resource] || {};

    const { countryProperties = {} } = state;
    const { ids = [] } = countryProperties[this.group] || {};

    const hasItems = ids.length > 0;

    const selected = state.filters[this.resource];

    return (
      <div className={s.container}>
        <h1 className={s.title}>Предложения</h1>

        {/* <Visibility md="hidden" lg="hidden">
          <Container className={s.tabsContainer}>
            <Row>
              <Col xs="6">
                <Button className={cn(s.tabBtn, this.state.tab === `all` && s.tabBtnActive)} onClick={() => this.toggle(`all`)}>Все предложения</Button>
              </Col>
              <Col xs="6">
                <Button className={cn(s.tabBtn, this.state.tab === `special` && s.tabBtnActive)} onClick={() => this.toggle(`special`)}>Спецпредложения</Button>
              </Col>
            </Row>
          </Container>
        </Visibility>

        <Visibility xs="hidden" sm="hidden">
          <BtnGroup className={s.btnContainer}>
            <Button size="lg" className={cn(s.btn, this.state.tab === `all` && s.btnActive)} onClick={() => this.toggle(`all`)}>Все предложения</Button>
            <Button size="lg" className={cn(s.btn, this.state.tab === `special` && s.btnActive)} onClick={() => this.toggle(`special`)}>Спецпредложения</Button>
          </BtnGroup>
        </Visibility> */}

        <Container fluid>
          <Row xs="center">
            <Filter
              updateFilter={::this.updateFilter}
              resetFilter={::this.resetFilter}
              removeFilter={::this.removeFilter}
              selected={selected}
              dealType="sale"
              isResaleProperty
              isPrimary={this.state.isPrimary}
              id={data.id}
             />
          </Row>

          {hasItems && (
            <Row>
              {ids.map(id => (
                <Card id={id} key={id} />
              ))}
            </Row>
          )}

          {!hasItems && (
            <NotFound
              resetFilter={::this.resetFilter}
            />
          )}

          <Row xs="center">
            <Col>
              <LoadMore
                size="lg"
                total={pagination.total}
                offset={pagination.offset}
                limit={pagination.limit}
                resource={this.resource}
                updatePagination={::this.props.actions.updatePagination}
                className={s.loadMoreBtn}
              >
                Показать ещё
              </LoadMore>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

// redux connectors
const pickState = (state) => {
  const {
    countryProperties,
    filters,
    pagination,
    order,
  } = state;

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
