import React, { Component } from 'react';
import cn from 'classnames';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// actions
import loadSettlements from 'core/settlements/actions/list/load';
import * as PaginationActions from 'core/actions/pagination';

import { ShowXsSm } from 'site/styles/mediaUtils';

// ui
import UI from 'site/ui';

// components
import Pagination from 'site/components/pagination';
import Card from 'site/settlements/v2/Card';
import Filter from './Filter';
import Helmet from './Helmet';
import Breadcrumbs from './Breadcrumbs';

// styles
import s from 'site/styles/settlements/list';
import sUtils from 'site/styles/utils';

import styled from 'styled-components';
import media from 'site/styles/media';

const Wrapper = styled.div`
  padding-top: 2.5rem;
  background: ${p => p.theme.brandWhite};

  ${media.md`
    padding-top: 7rem;
  `};
`;

const Title = styled.h1`
  margin-top: 1rem;
  margin-bottom: 0;
  font-size: 2.4rem;
  font-weight: 500;
  line-height: 3.2rem;
  display: none;

  ${media.sm`
    display: block;
  `} ${media.md`
    font-size: 2.7rem;
  `};
`;

const MobileTitle = styled.div`
  font-size: 2.2rem;
`;

const ListWrapper = styled.div`
  max-width: 1600px;
  margin: 0 auto;

  ${media.sm`
    padding: 0 1.5rem;
  `};
`;

// helpers
import { isPaginationOrFiltersOrOrderByUpdated as isUpdated } from 'core/helpers/shouldLoad';

// constants
import { resourceName } from 'core/settlements/constants/defaults';

const {
  CountIndicator,
  Grid: { Container, Row, Col },
} = UI;

const group = 'forProperties';
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

        <Wrapper>
          <Container>
            <Row sm="center">
              <Col xs="12">
                <Breadcrumbs />
                <Title>Элитные посёлки Подмосковья</Title>
                <ShowXsSm>
                  {' '}
                  <MobileTitle>
                    Найдено{' '}
                    <CountIndicator
                      count={pagination.total}
                      declensionForms={['посёлок', 'посёлка', 'посёлков']}
                    />
                  </MobileTitle>
                </ShowXsSm>
              </Col>
            </Row>
          </Container>

          <Filter
            count={pagination.total}
            updatePagination={this.props.actions.updatePagination}
            isOpened={this.state.isOpened}
            isFetching={isFetching}
          />
        </Wrapper>

        <ListWrapper>
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
                        loadMore
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
        </ListWrapper>
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
