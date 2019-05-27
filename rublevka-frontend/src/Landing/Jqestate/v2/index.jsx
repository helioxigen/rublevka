import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// components
import Helmet from 'react-helmet';
import Banner from 'Landing/Jqestate/v2/Banner';
import Filter from 'Landing/Jqestate/v2/Filter';
import Content from 'Landing/Jqestate/v2/Content';
import Description from 'Landing/Jqestate/v2/Description';
import Subscribe from 'request/SubscribeTisa';

// actions
import loadSelections from 'core/selections/actions/list/load';
import loadCountryProperties from 'core/countryProperties/actions/list/load';
import loadCityProperties from 'core/cityProperties/actions/list/load';
import * as FilterActions from 'core/actions/filters';
import * as PaginationActions from 'core/actions/pagination';
import { push } from 'react-router-redux';

// constants
import { resourceName } from 'core/countryProperties/constants/defaults';

// helpers
import { isPaginationOrFiltersOrOrderByUpdated as isUpdated } from 'core/helpers/shouldLoad';
import { dealTypes } from 'constants/properties/dictionaries';

import { ShowXsSmMd } from 'styles/mediaUtils';

// styles
import { MobileContainer, Title } from './styled';

const groupForTotal = 'total';

class Landing extends Component {
  static loadServer(dispatch) {
    return Promise.all[dispatch(loadSelections({}, 'forIndex'))];
  }

  constructor(props) {
    super(props);

    this.state = {
      resource: 'country',
      dealType: 'prodaja',
    };

    this.group = dealTypes[this.state.dealType];
    this.resource = `${resourceName}.${this.group}`;

    this.toggleResourceName = this.toggleResourceName.bind(this);
  }

  componentWillMount() {
    this.load(this.props);

    this.props.actions.resetFilter('countryProperties.sale', null, null);
    this.props.actions.resetFilter('countryProperties.rent', null, null);
    this.props.actions.resetFilter('cityProperties.sale', null, null);
    this.props.actions.resetFilter('cityProperties.rent', null, null);

    this.props.actions.loadCountryProperties({}, groupForTotal);
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

    if (this.state.resource === 'country') {
      actions.loadCountryProperties(options, this.group);
    }

    if (this.state.resource === 'city') {
      actions.loadCityProperties(options, this.group);
    }
  }

  toggleResourceName(key, value) {
    this.setState({ [key]: value }, () => {
      this.group = dealTypes[this.state.dealType];
      this.resource = `${this.state.resource}Properties.${this.group}`;

      this.load(this.props);
    });
  }

  render() {
    const { actions, state } = this.props;
    const { isFetching } = state.countryProperties[this.group] || {};
    const pagination = state.pagination[this.resource] || {};

    return (
      <section>
        <Helmet
          title={global.config.seo.title}
          meta={[
            { name: 'description', content: global.config.seo.description },
          ]}
        />

        <Banner />
        <ShowXsSmMd>
          <MobileContainer>
            <Title>Агентство загородной недвижимости JQ&nbsp;Estate</Title>

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
              toggleResourceName={this.toggleResourceName}
            />
          </MobileContainer>
        </ShowXsSmMd>
        <Content />
        <Subscribe />
        <Description />
      </section>
    );
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
    loadCountryProperties,
    loadCityProperties,
    push,
    ...FilterActions,
    ...PaginationActions,
  };

  return {
    actions: bindActionCreators(actions, dispatch),
    dispatch,
  };
};

export default connect(
  pickState,
  pickActions,
)(Landing);
