import React, { Component } from 'react';

import Helmet from 'react-helmet';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import styled from 'styled-components';

// actions
import loadProperties from '../../../core/countryProperties/actions/list/load';
import * as FilterActions from '../../../core/actions/filters';
import * as PaginationActions from '../../../core/actions/pagination';

// constants
import { resourceName } from '../../../core/countryProperties/constants/defaults';

// components

// import OldHeader from './OldHeader';
// import Filter from './Filter';

import Header from './Header';
import Form from './Form';
import Call from './Call';
import Find from './Find';
import Location from './Location';

// helpers
import { isPaginationOrFiltersOrOrderByUpdated as isUpdated } from '../../../core/helpers/shouldLoad';
import { dealTypes } from '../../constants/properties/dictionaries';

// UI
import UI from '../../ui';
import media from '../../styles/media';

// import s from '../../styles/landing/satellites/list';

import bgImage from './bg.jpg';

const {
  Grid: { Container },
} = UI;

const groupForTotal = 'total';
// const totalResource = `${resourceName}.${groupForTotal}`;

const Wrapper = styled.section`
  background-color: #fff;

  ${media.md`
    margin-top: -60px;
  `}
`;

const SearchSection = styled.section`
  background: radial-gradient(247.49px at 51.29% 50%, #fafafa 0%, #f5f5f5 100%);
  padding-top: 90px;

  ${media.xs`
    display: flex;
    justify-content: center;
    flex-direction: column;
    background: url(${bgImage}) no-repeat;
    background-size: cover;
    min-height: 100vh;
  `}

  ${media.md`
    padding-top: 0;
  `}
`;

class Landing extends Component {
  constructor(props) {
    super(props);

    this.state = {
      resource: 'country',
      dealType: 'prodaja',
    };

    this.group = dealTypes[this.state.dealType];
    this.resource = `${resourceName}.${this.group}`;

    this.toggleDealType = this.toggleDealType.bind(this);
    this.toggleResourceName = this.toggleResourceName.bind(this);
  }

  componentWillMount() {
    this.load(this.props);

    this.props.actions.loadProperties({}, groupForTotal);
  }

  componentWillReceiveProps(nextProps) {
    if (isUpdated(this.resource, this.props, nextProps)) {
      this.load(nextProps);
    }
  }

  load({ state, actions }) {
    const options = {
      pagination: state.pagination[this.resource],
      filter: state.filters[this.resource],
      orderBy: state.order[this.resource],
    };

    actions.loadProperties(options, this.group);
  }

  toggleDealType(dealType) {
    this.setState({ dealType }, () => {
      this.group = dealTypes[dealType];
      this.resource = `${resourceName}.${this.group}`;

      this.load(this.props);
    });
  }

  toggleResourceName(key, value) {
    this.setState({ [key]: value }, () => {
      this.group = dealTypes[this.state.dealType];
      this.resource = `${this.state.resource}Properties.${this.group}`;

      this.load(this.props);
    });
  }

  render() {
    const { actions, history } = this.props;
    // const { isFetching } = state.countryProperties[this.group] || {};
    // const pagination = state.pagination[this.resource] || {};

    // const totalProperties = (state.pagination[totalResource] || {}).total;

    return (
      <Wrapper>
        <Helmet
          title={global.config.seo.title}
          meta={[
            { name: 'description', content: global.config.seo.description },
            { name: 'keywords', content: global.config.seo.keywords },
          ]}
        />

        {/* <Container fluid className={s.bannerContainer}>
          <OldHeader totalProperties={totalProperties} />
          <Filter
            resourceName={this.resource}
            resource={this.state.resource}
            group={this.group}
            count={pagination.total}
            updatePagination={this.props.actions.updatePagination}
            actions={actions} // TODO: use FilterHelper instead of passing actions
            state={state.filters[this.resource]} // TODO: refactor this because FilterHelper provides
            dealType={this.state.dealType}
            isFetching={isFetching}
            toggleDealType={this.toggleDealType}
            toggleResourceName={this.toggleResourceName}
          />
        </Container> */}

        <SearchSection>
          <Container>
            <Header />
            <Form actions={actions} history={history} />
          </Container>
        </SearchSection>

        <Call />

        <Find />

        <Location />
      </Wrapper>
    );
  }
}

// redux connectors
const pickState = (state) => {
  const {
    countryProperties, filters, pagination, order,
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
    push,
    ...FilterActions,
    ...PaginationActions,
  };

  return {
    actions: bindActionCreators(actions, dispatch),
  };
};

export default connect(
  pickState,
  pickActions,
)(Landing);
