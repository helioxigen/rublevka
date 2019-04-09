import React, { Component } from 'react';

import cn from 'classnames';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// actions
import loadProperties from 'core/cityProperties/actions/list/load';
import * as PaginationActions from 'core/actions/pagination';
import * as FilterActions from 'core/actions/filters';
import * as OrderActions from 'core/actions/order';

// constants
import { resourceName } from 'core/cityProperties/constants/defaults';

// components
import Card from 'cityProperties/primaryCard';

// ui
import UI from 'ui';
const {
  // Button,
  CountIndicator,
  // Dropdown,
  // Visibility,
  Loading,
  Grid: { Container, Row, Col },
  LoadMore,
} = UI;

// styles
import s from 'styles/complexes/id/offers';
import sUtils from 'styles/utils';
// import sBtn from 'styles/button';

// helpers
import { isPaginationOrFiltersOrOrderByUpdated as isUpdated } from 'core/helpers/shouldLoad';

// const sortingFields = [`saleOffer.multiCurrencyPrice.usd`, `specification.totalArea`, `specification.floor`, `specification.rooms`];

class List extends Component {
  constructor(props) {
    super(props);

    this.group = `forComplexOnlyPrimary`;
    this.resource = `${resourceName}.${this.group}`;
  }

  componentWillMount() {
    this.props.actions.updatePagination(this.resource, { offset: 0 });

    this.load(this.props, false);
  }

  componentWillReceiveProps(nextProps) {
    if (isUpdated(this.resource, this.props, nextProps)) {
      this.load(nextProps, true);
    }
  }

  load({ state, actions, complexId }, append) {
    const options = {
      pagination: state.pagination[this.resource],
      filter: state.filters[this.resource],
      orderBy: state.order[this.resource],
    };

    actions.loadProperties(options, this.group, { complexId, append });
  }

  render() {
    const { state } = this.props;
    const { ids = [], isFetching /* , errors = [] */ } =
      state.cityProperties[this.group] || {};
    const pagination = state.pagination[this.resource] || {};

    return (
      <Row>
        <Container className={s.container}>
          <Row sm="middle" className={sUtils.pushedBottomXs2Sm4}>
            <Col sm="4">
              <h1 className={s.title}>
                <CountIndicator
                  count={pagination.total}
                  declensionForms={[
                    `предложение`,
                    `предложения`,
                    `предложений`,
                  ]}
                />
              </h1>
            </Col>
            {/* <Col sm="8" className={cn(sUtils.textRight, sUtils.hideXs)}>
              <span className={s.btnGroupTitle}>Комнат</span>
              <RoomSelect buttonClassName={s.btn} buttonActiveClassName={s.active} lastButtonClassName={s.resetRightBorderRadius} value={rooms || []} onChange={(val) => ::this.handleRoomsUpdate(`specification.rooms`, val)} />

              <Dropdown className={cn(sUtils.btnWideXs, sUtils.pushedLeft2)} alwaysActive isOpen={false} placeholder={orderByValue.field ? `Сортировать ${dictionary.orderBy[orderByValue.field]}` : `Сортировать`} reset={() => ::this.resetOrderBy()} value={orderByValue.field}>
                <div>
                  {sortingFields.map(::this.renderButton)}
                </div>
              </Dropdown>
            </Col> */}
          </Row>

          {/* <Row>
            <Col xs="12" className={sUtils.pushedBottomXs2_5}>
              <Visibility sm="hidden" md="hidden" lg="hidden">
                <Dropdown className={cn(sUtils.btnWideXs, sUtils.pushedLeftSm2)} alwaysActive isOpen={false} placeholder={orderByValue.field ? `Сортировать ${dictionary.orderBy[orderByValue.field]}` : `Сортировать`} reset={() => ::this.resetOrderBy()} value={orderByValue.field}>
                  <div>
                    {sortingFields.map(::this.renderButton)}
                  </div>
                </Dropdown>
              </Visibility>
            </Col>
          </Row> */}

          <Row>
            <Col xs="12">
              {ids.map(id => (
                <Card dealType="sale" key={id} id={id} />
              ))}

              {isFetching && (
                <div className={sUtils.pushedBottom3}>
                  <Loading />
                </div>
              )}
            </Col>
          </Row>

          <Row
            sm="center"
            className={cn(sUtils.pushedTop2, sUtils.pushedBottom3)}
          >
            <Col xs="12">
              <LoadMore
                size="lg"
                total={pagination.total}
                offset={pagination.offset}
                limit={pagination.limit}
                resource={this.resource}
                updatePagination={::this.props.actions.updatePagination}
              >
                Загрузить ещё
              </LoadMore>
            </Col>
          </Row>
        </Container>
      </Row>
    );
  }
}

// redux connectors
const pickState = state => {
  const { cityProperties, filters, pagination, order } = state;

  return {
    state: {
      cityProperties,
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
