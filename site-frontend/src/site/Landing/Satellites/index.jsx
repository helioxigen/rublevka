import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// actions
import loadProperties from 'core/countryProperties/actions/list/load';
import * as FilterActions from 'core/actions/filters';
import * as PaginationActions from 'core/actions/pagination';
import { push } from 'react-router-redux';

// constants
import { resourceName } from 'core/countryProperties/constants/defaults';

// components
import Helmet from 'react-helmet';
import Header from './Header';
import Filter from './Filter';
import Description from './Description';
import Settlements from './Settlements';
import Subscribe from 'site/request/SubscribeTisa';

import s from 'site/styles/landing/satellites/list';

// helpers
import { isPaginationOrFiltersOrOrderByUpdated as isUpdated } from 'core/helpers/shouldLoad';
import { dealTypes } from 'site/constants/properties/dictionaries';

// UI
import UI from 'site/ui';

const { Grid: { Container } } = UI;

const groupForTotal = 'total';
const totalResource = `${resourceName}.${groupForTotal}`;

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
    const { actions, state, location } = this.props;
    const { isFetching } = state.countryProperties[this.group] || {};
    const pagination = state.pagination[this.resource] || {};

    const totalProperties = (state.pagination[totalResource] || {}).total;

    return (
      <section>
        <Helmet
          title={global.config.seo.title}
          meta={[
            { name: 'description', content: global.config.seo.description },
            { name: 'keywords', content: global.config.seo.keywords },
          ]}
        />

        <Container fluid className={s.bannerContainer}>
          <Header totalProperties={totalProperties} />
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
        </Container>

        <Description totalProperties={totalProperties} />

        <Settlements location={location} />

        <Subscribe />
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
    push,
    ...FilterActions,
    ...PaginationActions,
  };

  return {
    actions: bindActionCreators(actions, dispatch),
  };
};

export default connect(pickState, pickActions)(Landing);
