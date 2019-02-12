import React, { Component } from 'react';
import cn from 'classnames';

import global from 'window-or-global';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Link } from 'react-router';

// actions
import loadProperties from 'core/countryProperties/actions/list/load';
import loadSettlement from 'core/settlements/actions/id/load';
import * as FilterActions from 'core/actions/filters';

// constants
import { resourceName } from 'core/countryProperties/constants/defaults';

// components
import Card from 'site/countryProperties/card';
import PromoCard from 'site/Landing/Satellites/PromoCard';
import UI from 'site/ui';

// styles
import s from 'site/styles/landing/satellites/properties';
import st from 'site/styles/themes';
import sUtils from 'site/styles/utils';

// helpers
import { isPaginationOrFiltersOrOrderByUpdated as isUpdated } from 'core/helpers/shouldLoad';
import { nameToSlug } from 'core/helpers/nameToSlug';

const settlementsData = ((global.config.landing || {}).settlements || {}).tabs;
const group = 'forLandingBySettlements';
const resource = `${resourceName}.${group}`;

const {
  Button,
  Loading,
  CardVisibility,
  Grid: { Row, Col, Container },
} = UI;

class Properties extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedSettlementId: settlementsData[0].id,
      selectedSettlementName: settlementsData[0].title,
      selectedSettlementIndex: 0,
    };
  }

  componentWillMount() {
    const firstSettlement = settlementsData[0];
    const { id, name } = firstSettlement;

    this.props.actions.updateFilter(resource, {
      settlements: [{ id, name }],
    });

    this.load(this.props);
    this.loadSettlement(id);
  }

  componentWillReceiveProps(nextProps) {
    if (isUpdated(resource, this.props, nextProps)) {
      this.load(nextProps);
    }
  }

  load({ state, actions }) {
    const options = {
      pagination: state.pagination[resource],
      filter: state.filters[resource],
      orderBy: state.order[resource],
    };

    actions.loadProperties(options, group);
  }

  toggleTab(settlement, selectedSettlementIndex) {
    const { id, title } = settlement;

    this.loadSettlement(id);

    this.setState(
      {
        selectedSettlementId: id,
        selectedSettlementName: title,
        selectedSettlementIndex,
      },
      () => {
        this.props.actions.updateFilter(resource, {
          settlements: [{ id, name }],
        });
      },
    );
  }

  loadSettlement(settlementId) {
    this.props.actions.loadSettlement(settlementId);
  }

  render() {
    const { state } = this.props;
    const { settlements = {} } = state;
    const { ids = [], isFetching } = state.countryProperties[group] || {};

    const description =
      settlementsData[this.state.selectedSettlementIndex].description;

    const settlement = settlements[this.state.selectedSettlementId] || {};
    const { data = {} } = settlement;
    const { statistics = {} } = data;
    const totalPropertiesCount = statistics.totalProperties - 3;
    const isTotalProperties = totalPropertiesCount > 0;

    const idsForMd = ids.slice(0, 2);

    return (
      <Container fluid className={s.mainContainer}>
        <Row>
          <Col xs="12">
            <Container>
              <Row xs="center">
                <Col sm="12" className={sUtils.pushedBottomXs2Sm5}>
                  <h2 className={s.titleLg}>Лучшие посёлки</h2>
                </Col>
              </Row>
            </Container>
          </Col>

          <Col xs="12">
            <Container>
              <Row>
                <Col xs="12" className={cn(sUtils.pushedTop1, s.scroll)}>
                  <ul className={s.tabList}>
                    {settlementsData.map((item, i) => {
                      const isActive =
                        this.state.selectedSettlementId === item.id;
                      const { id, title } = item;
                      return (
                        <li
                          key={id}
                          className={cn(
                            st.landing.tab,
                            isActive && st.landing.tabActive,
                          )}
                          onClick={() => ::this.toggleTab(item, i)}
                        >
                          {title}
                        </li>
                      );
                    })}

                    <Link
                      to="/zagorodnaya/kottedzhnye-poselki"
                      className={st.landing.tab}
                    >
                      <li className={sUtils.hideXsSmMd}>Все поселки</li>
                    </Link>
                  </ul>
                </Col>
              </Row>
            </Container>
          </Col>

          {isFetching && <Loading />}

          <Container className={sUtils.fullWidth} fluid>
            <CardVisibility md="hidden">
              <Row>
                {!isFetching &&
                  ids.map(id => (
                    <Card key={id} id={id} dealType="prodaja" showLocation />
                  ))}

                {!isFetching && isTotalProperties && (
                  <PromoCard
                    count={totalPropertiesCount}
                    id={this.state.selectedSettlementId}
                  />
                )}
              </Row>
            </CardVisibility>

            <CardVisibility xs="hidden" sm="hidden" lg="hidden">
              <Row>
                {!isFetching &&
                  idsForMd.map(id => (
                    <Card key={id} id={id} dealType="prodaja" showLocation />
                  ))}

                {!isFetching && isTotalProperties && (
                  <PromoCard
                    count={totalPropertiesCount}
                    id={this.state.selectedSettlementId}
                    name={this.state.selectedSettlementName}
                  />
                )}
              </Row>
            </CardVisibility>
          </Container>

          <Container
            className={cn(sUtils.pushedTopXs3Md4, sUtils.pushedBottom6)}
          >
            <Row sm="center">
              <Col xs="12">
                <p className={s.text}>{description}</p>
              </Col>
            </Row>

            <Row sm="center" className={sUtils.hideXs}>
              <Col>
                <Button
                  to={`/zagorodnaya/kottedzhnye-poselki/${nameToSlug(
                    this.state.selectedSettlementName,
                  )}_${this.state.selectedSettlementId}`}
                  className={cn(s.btnPrimary, sUtils.pushedTop4)}
                  kind="primary"
                  size="lg"
                >
                  Перейти на страницу посёлка
                </Button>
              </Col>
            </Row>

            <Row sm="center" className={sUtils.pushedTopSm1}>
              <Col>
                <Link to={'/zagorodnaya/kottedzhnye-poselki'}>
                  <p
                    className={cn(
                      st.landing.linkPrimaryUnderline,
                      sUtils.hideFromLg,
                    )}
                  >
                    Показать все поселки
                  </p>
                </Link>
              </Col>
            </Row>
          </Container>
        </Row>
      </Container>
    );
  }
}

// redux connectors
const pickState = ({
  countryProperties,
  settlements,
  filters,
  pagination,
  order,
}) => ({
  state: {
    countryProperties,
    settlements,
    filters,
    pagination,
    order,
  },
});

const pickActions = dispatch => {
  const actions = {
    loadProperties,
    loadSettlement,
    ...FilterActions,
  };

  return {
    actions: bindActionCreators(actions, dispatch),
  };
};

export default connect(
  pickState,
  pickActions,
)(Properties);
