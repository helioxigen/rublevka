import React, { Component, PropTypes } from 'react';
import cn from 'classnames';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// seo
import { helmet } from 'config/seo';

// actions
import loadComplexes from 'core/complexes/actions/list/load';
import * as FilterActions from 'core/actions/filters';
import * as PaginationActions from 'core/actions/pagination';

import { searchComplexes } from 'core/actions/complexes/search';
import { searchSubLocalities } from 'core/actions/subLocalities/search';

// constants
import { resourceName } from 'core/complexes/constants/defaults';

// ui
import UI from 'ui';

// components
import Card from 'complexes/card';
import Filter from './filter';
import FilterBtn from './filter/filterBtn';
import Selected from './filter/selected';
import Pagination from 'components/pagination';
import Helmet from './Helmet';

// helpers
import { isPaginationOrFiltersOrOrderByUpdated as isUpdated } from 'core/helpers/shouldLoad';

// styles
import s from 'styles/complexes/list';
import sUtils from 'styles/utils';

const {
  Visibility,
  CountIndicator,
  Grid: { Container, Row, Col },
} = UI;

const group = 'list';

class Complexes extends Component {
  static loadServer(dispatch, _, props) {
    const params = {
      pagination: {
        offset: 5 * (props.location.query.page - 1), // TODO: 31 → normal value
      },
    };

    return Promise.all([dispatch(loadComplexes(params, group))]);
  }

  static propTypes = {
    state: PropTypes.shape({
      complexes: PropTypes.object.isRequired,

      filters: PropTypes.object.isRequired,
      pagination: PropTypes.object.isRequired,
      order: PropTypes.object.isRequired,
    }),
    actions: PropTypes.shape({
      loadComplexes: PropTypes.func.isRequired,

      updatePagination: PropTypes.func.isRequired,

      setFilter: PropTypes.func.isRequired,
      updateFilter: PropTypes.func.isRequired,
      resetFilter: PropTypes.func.isRequired,
    }),
  };

  constructor(props) {
    super(props);

    this.resource = `${resourceName}.${group}`;
    this.state = {
      isOpened: false,
      isChanged: false,
    };

    this.removeFilter = this.removeFilter.bind(this);
  }

  componentWillMount() {
    const params = {
      pagination: {
        offset: 5 * (this.props.location.query.page - 1), // TODO: 31 → normal value
      },
    };

    this.load(this.props, params);
  }

  componentWillReceiveProps(nextProps) {
    if (isUpdated(this.resource, this.props, nextProps)) {
      const params = {
        pagination: {
          offset: 5 * (nextProps.location.query.page - 1), // TODO: 31 → normal value
        },
      };

      this.load(nextProps, params);
    }

    // if (isUpdated(this.resource, this.props, nextProps)) {
    //   this.setState({ isChanged: true });
    //   setTimeout(() => this.setState({ isChanged: false }), 800);
    // }
  }

  load({ state, actions }, params = {}) {
    const options = {
      pagination: { ...state.pagination[this.resource], ...params.pagination },
      filter: { ...state.filters[this.resource], totalProperties: { min: 1 } },
      orderBy: { ...state.order[this.resource], ...params.orderBy },
    };

    actions.loadComplexes(options, group);
  }

  removeFilter(key, value) {
    this.props.actions.removeFilter(this.resource, key, value);
  }

  render() {
    const { state, location } = this.props;
    const { ids = [], isFetching /* , errors = [] */ } =
      state.complexes[group] || {};
    const pagination = state.pagination[this.resource] || {};

    // const hasErrors = !isFetching && !!errors.length;
    const hasItems = !!ids.length;

    const seo = helmet.places.complexes.list;

    const { query } = location;

    return (
      <section>
        {seo && <Helmet pagination={pagination} query={query} />}

        <div className={s.container}>
          <Container>
            <Row sm="center">
              <Col xs="12">
                <h1 className={s.title}>Жилые комплексы</h1>

                <Visibility xs="hidden">
                  <h2 className={s.subTitle}>
                    <CountIndicator
                      count={pagination.total}
                      declensionForms={[
                        'жилой комплекс',
                        'жилых комплекса',
                        'жилых комплексов',
                      ]}
                    />{' '}
                    Москвы
                  </h2>
                </Visibility>
              </Col>
            </Row>

            <FilterBtn
              resource={this.resource}
              isOpened={this.state.isOpened}
              count={pagination.total}
              toggle={() => this.setState({ isOpened: !this.state.isOpened })}
            />
          </Container>

          {this.state.isOpened && (
            <Filter
              resource={this.resource}
              group={this.group}
              count={pagination.total}
              updatePagination={this.props.actions.updatePagination}
              isOpened={this.state.isOpened}
              isFetching={isFetching}
              toggle={() => this.setState({ isOpened: !this.state.isOpened })}
            />
          )}
        </div>

        <Selected
          className={cn(sUtils.hideXs, sUtils.pushedTop4)}
          isOpened={this.state.isOpened}
          state={state.filters[this.resource]}
          removeFilter={this.removeFilter}
        />

        <Container className={sUtils.pushedTopSm4}>
          <Row>
            {ids.map(id => (
              <Card key={id} id={id} />
            ))}
          </Row>
        </Container>

        {!isFetching && !hasItems && (
          <Container className={s.pushed13_0}>
            <Row xs="center">
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

        {hasItems && (
          <Container>
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

// const mapState = ({ complexes, pagination, filters, order, complexesSearch, subLocalitiesSearch }) => ({
//   state: { complexes, pagination, filters, order, complexesSearch, subLocalitiesSearch },
// });
//
// const mapDispatch = (dispatch) => ({
//   actions: bindActionCreators({ loadComplexes, ...PaginationActions, ...FilterActions, searchComplexes, searchSubLocalities }, dispatch),
// });

// export default connect(mapState, mapDispatch)(Complexes);

// redux connectors
const pickState = state => {
  const {
    complexes,
    filters,
    pagination,
    order,
    complexesSearch,
    subLocalitiesSearch,
  } = state;

  return {
    state: {
      complexes,
      filters,
      pagination,
      order,
      complexesSearch,
      subLocalitiesSearch,
    },
  };
};

const pickActions = dispatch => {
  const actions = {
    loadComplexes,
    ...FilterActions,
    ...PaginationActions,
    searchComplexes,
    searchSubLocalities,
    // ...OrderActions,
  };

  return {
    actions: bindActionCreators(actions, dispatch),
    dispatch,
  };
};

export default connect(
  pickState,
  pickActions,
)(Complexes);
