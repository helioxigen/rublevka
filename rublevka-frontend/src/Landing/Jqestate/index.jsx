import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// components
import Helmet from 'react-helmet';
import Banner from 'Landing/Jqestate/Banner';
import Filter from 'Landing/Jqestate/Filter';
import Routes from 'Landing/Jqestate/Routes';
import Subscribe from 'request/subscribe';
import Selections from 'Landing/Jqestate/Selections';

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

// UI
import UI from 'ui';
const {
  Icon,
  Grid: { Container, Row, Col },
} = UI;

const groupForTotal = 'total';

// styles
import s from 'styles/landing/jqestate/list';

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
            { name: 'keywords', content: global.config.seo.keywords },
          ]}
          link={[{ rel: 'canonical', href: `https://${global.config.domain}` }]}
        />

        <Banner />

        <Container fluid className={s.bannerContainer}>
          <Row xs="center">
            <Col xs="12" className={s.headerContainer}>
              <Icon className={s.icon} icon="jqestate" />
              <p className={s.textMd}>Начните поиск элитной недвижимости</p>
            </Col>
          </Row>

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
        </Container>

        <Selections />

        <Routes />

        <Subscribe />
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
