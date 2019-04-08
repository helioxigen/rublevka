import React, { Component } from 'react';
import styled from 'styled-components';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Element, Link } from 'react-scroll';

// actions
import { loadSettlementsByLetter } from '../../../../core/settlements/actions/list/load';
import * as PaginationActions from '../../../../core/actions/pagination';

import Helmet from './Helmet';
import Hero from './Hero';
import Section from './Section';

// helpers
import { isPaginationOrFiltersOrOrderByUpdated as isUpdated } from '../../../../core/helpers/shouldLoad';

// constants
import { resourceName } from '../../../../core/settlements/constants/defaults';

import media from '../../../styles/media';
import UI from '../../../ui';

const {
  Grid: { Container, Col },
} = UI;

const group = 'byLetter';
const resource = `${resourceName}.${group}`;

const NavWrapper = styled.nav`
  display: none;
  position: absolute;
  visibility: hidden;
  top: 0;
  bottom: 0;
  right: -13px;

  ${media.xs`
    display: block;
  `}
`;

const NavContainer = styled.ul`
  position: sticky;
  visibility: visible;
  top: 0;
  margin: 0;
  padding: 48px 0px;
  list-style: none;

  ${media.md`
    top: 30px;
    padding: 56px 0px;
  `}
`;

const Letter = styled.li`
  line-height: 16px;
  font-size: 13px;
  text-align: center;
  font-weight: bold;

  color: rgba(35, 35, 35, 0.3);

  &:hover {
    color: #232323;
    cursor: pointer;
  }

  &::after {
    display: block;
    content: '•';
    line-height: 16px;
    font-size: 13px;
    text-align: center;
    font-weight: bold;

    color: rgba(35, 35, 35, 0.3);
  }

  &:last-child {
    &::after {
      content: '';
    }
  }
`;

const load = ({ state, dispatch, location = {} }, params = {}) => {
  const options = {
    pagination: {
      ...state.pagination[resource],
      offset: 32 * (location.query.page - 1),
      ...params.pagination,
    },
    filter: {
      state: 'public',
      ...state.filters[resource],
      ...params.filters,
    },
    orderBy: { ...state.order[resource], ...params.order },
  };

  return Promise.all([dispatch(loadSettlementsByLetter(options, group))]);
};

class SettlementsContainer extends Component {
  componentWillMount() {
    load(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (isUpdated(resource, this.props, nextProps)) {
      load(nextProps);
    }
  }

  letterRefs = {};

  render() {
    const { state, location } = this.props;
    const pagination = state.pagination[resource] || {};
    const { idsByLetter = {} } = state.settlements[group] || {};

    const hasItems = !!Object.keys(idsByLetter).length;

    return (
      <section>
        <Helmet pagination={pagination} location={location} />

        <Hero />
        <Container>
          <Col mdOffset="1" xs="12" md="10" style={{ position: 'relative' }}>
            {hasItems &&
              Object.entries(idsByLetter).map(([letter, ids]) => (
                <Element name={`anchor-${letter}`}>
                  <Section letter={letter} ids={ids} />
                </Element>
              ))}
            <NavWrapper>
              <NavContainer>
                {hasItems &&
                  Object.keys(idsByLetter).map(
                    (letter, index) =>
                      index % 2 === 0 && (
                        <Letter>
                          <Link to={`anchor-${letter}`} smooth offset={-20}>
                            {letter}
                          </Link>
                        </Letter>
                      ),
                  )}
              </NavContainer>
            </NavWrapper>
          </Col>
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
