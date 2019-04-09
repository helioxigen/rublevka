import React, { Component } from 'react';
import cn from 'classnames';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// actions
import loadSettlements from 'core/settlements/actions/list/load';
import * as PaginationActions from 'core/actions/pagination';

// ui
import UI from 'ui';

// components
import Pagination from 'components/pagination';
import Card from 'settlements/card';
import Filter from './filter';
import Helmet from './Helmet';

// styles
import s from 'styles/settlements/list';
import sUtils from 'styles/utils';

// helpers
import { isPaginationOrFiltersOrOrderByUpdated as isUpdated } from 'core/helpers/shouldLoad';

// constants
import { resourceName } from 'core/settlements/constants/defaults';

const {
  CountIndicator,
  Grid: { Container, Row, Col },
} = UI;

const group = 'all';
const resource = `${resourceName}.${group}`;

const load = ({ state, dispatch, location = {} }, params = {}) => {
  const options = {
    pagination: {
      ...state.pagination[resource],
      offset: 32 * (location.query.page - 1),
      ...params.pagination,
    },
    filter: {
      ...state.filters[resource],
      totalProperties: { min: 1 },
      ...params.filters,
    },
    orderBy: { ...state.order[resource], ...params.order },
  };

  return Promise.all([dispatch(loadSettlements(options, group))]);
};

class SettlementsContainer extends Component {
  static loadServer(dispatch, _, props, state) {
    return load({ dispatch, ...props, state });
  }

  state = { isOpened: false };

  componentWillMount() {
    load(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (isUpdated(resource, this.props, nextProps)) {
      load(nextProps);
    }
  }

  render() {
    const { state, location } = this.props;

    const { ids = [], isFetching } = state.settlements[group] || {};
    const pagination = state.pagination[resource] || {};

    const hasItems = !!ids.length;

    return (
      <section>
        <Helmet pagination={pagination} location={location} />

        <div className={s.container}>
          <Container>
            <Row sm="center">
              <Col xs="12">
                <h1 className={s.title}>
                  Найдено{' '}
                  <CountIndicator
                    count={pagination.total}
                    declensionForms={['посёлок', 'посёлка', 'посёлков']}
                  />
                </h1>
              </Col>
            </Row>
          </Container>

          <Filter
            count={pagination.total}
            updatePagination={this.props.actions.updatePagination}
            isOpened={this.state.isOpened}
            isFetching={isFetching}
          />
        </div>

        <Container fluid>
          <Row>
            {ids.map(id => (
              <Card key={id} id={id} />
            ))}
          </Row>

          <Row>
            {hasItems && (
              <Container
                fluid
                className={cn(sUtils.pushedBottom3, sUtils.pushedTop3)}
              >
                <Row sm="center">
                  <Col xs="12">
                    <Pagination
                      total={pagination.total}
                      offset={pagination.offset}
                      limit={pagination.limit}
                      resource={resource}
                      updatePagination={this.props.actions.updatePagination}
                      baseUrl={location.pathname}
                      isScrollToTop
                    />
                  </Col>
                </Row>
              </Container>
            )}

            {!isFetching && !hasItems && (
              <Container fluid>
                <Row xs="center" className={s.pushed18_5_0_8}>
                  <Col xs="11">
                    <h1 className={s.titleNotFound}>
                      К сожалению, ничего не найдено
                    </h1>
                    <p className={s.textNotFound}>
                      Попробуйте другие параметры поиска
                    </p>
                  </Col>
                </Row>
              </Container>
            )}
          </Row>
        </Container>
      </section>
    );
  }
}

const mapState = ({ settlements, filters, pagination, order }) => ({
  state: {
    settlements,
    filters,
    pagination,
    order,
  },
});

const mapDispatch = dispatch => ({
  actions: bindActionCreators(
    {
      ...PaginationActions,
    },
    dispatch,
  ),
  dispatch,
});

export default connect(
  mapState,
  mapDispatch,
)(SettlementsContainer);
