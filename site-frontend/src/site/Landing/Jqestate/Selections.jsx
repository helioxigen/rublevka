import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import loadSelections from 'core/selections/actions/list/load';

import { resourceName } from 'core/selections/constants/defaults';

import Slider from 'react-slick';
import Card from 'site/selections/card';

import UI from 'site/ui';
const {
  Grid: { Row, Col, Container },
  Visibility,
} = UI;

import s from 'site/styles/landing/jqestate/selections';
import sUtils from 'site/styles/utils';

const settings = {
  infinite: false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  dots: true,
  dotsClass: s.dots,
  arrows: false,
};

class Selections extends Component {
  constructor(props) {
    super(props);

    this.group = 'forIndex';
    this.resource = `${resourceName}.${this.group}`;
  }

  componentWillMount() {
    this.load(this.props);
  }

  load({ state, actions }) {
    const options = {
      pagination: state.pagination[this.resource],
      filter: state.filters[this.resource],
      orderBy: state.order[this.resource],
    };

    actions.loadSelections(options, this.group);
  }

  render() {
    const { state } = this.props;
    const { selections = {} } = state;
    const { ids = [] } = selections[this.group] || {};

    const hasItems = !!ids.length;

    return (
      <Container fluid className={s.container}>
        <Row sm="center">
          <Col sm="12" className={sUtils.pushedBottom4_5}>
            <h2 className={s.heading}>Актуальные предложения</h2>
            <Visibility xs="hidden" sm="hidden">
              <p className={s.subtitle}>
                Готовые подборки по предпочтениям, образу жизни и расположению
              </p>
            </Visibility>
          </Col>
        </Row>

        {hasItems && (
          <Visibility xs="hidden" sm="hidden" className={sUtils.fullWidth}>
            <Row sm="center">
              <Col xs="12" lg="10">
                <Container fluid>
                  <Row sm="center">
                    {ids[0] && (
                      <Col sm="6" md="4">
                        <Card id={ids[0]} className={s.largeCard} />
                      </Col>
                    )}

                    {ids[1] && (
                      <Col sm="6" md="4">
                        <Card id={ids[1]} className={s.largeCard} />
                      </Col>
                    )}

                    {ids[2] && (
                      <Col sm="6" md="4">
                        <Card id={ids[2]} className={s.largeCard} />
                      </Col>
                    )}

                    {ids[3] && (
                      <Col sm="6" md="3">
                        <Card id={ids[3]} className={s.mediumCard} />
                      </Col>
                    )}

                    {ids[4] && (
                      <Col sm="4" md="3">
                        <Card id={ids[4]} className={s.smallCard} />
                      </Col>
                    )}

                    {ids[5] && (
                      <Col sm="4" md="3">
                        <Card id={ids[5]} className={s.smallCard} />
                      </Col>
                    )}

                    {ids[6] && (
                      <Col sm="4" md="3">
                        <Card id={ids[6]} className={s.smallCard} />
                      </Col>
                    )}
                  </Row>
                </Container>
              </Col>
            </Row>
          </Visibility>
        )}

        {hasItems && (
          <Visibility md="hidden" lg="hidden">
            <Row>
              <Slider {...settings}>
                {ids.map(id => (
                  <button className={s.slideContainer} key={id}>
                    <Card id={id} />
                  </button>
                ))}
              </Slider>
            </Row>
          </Visibility>
        )}
      </Container>
    );
  }
}

// redux connectors
const pickState = state => {
  const { selections, filters, pagination, order } = state;

  return {
    state: {
      selections,
      filters,
      pagination,
      order,
    },
  };
};

const pickActions = dispatch => {
  const actions = {
    loadSelections,
  };

  return {
    actions: bindActionCreators(actions, dispatch),
  };
};

export default connect(
  pickState,
  pickActions,
)(Selections);
