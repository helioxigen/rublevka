import React, { Component } from 'react';

import { Link } from 'react-router';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ComplexesActions from 'cem/actions/complexes';

import UI from 'cem/components/ui';
const {
  Icon,
  Media,
  Image,
  Heading,
  ParamList,
  Grid: { Container, Row, Col },
} = UI;

import s from 'cem/styles/id/content';
import sUtils from 'cem/styles/utils';

const ComplexImage = ({ src }) =>
  src ? (
    <Image src={`${src}-128`} kind="circle" width="114" height="114" />
  ) : (
    <Icon className={s.placeholder} icon="placeholder" />
  );

class ComplexDescription extends Component {
  render() {
    const {
      data,
      data: { location = {}, statistics = {} },
    } = this.props;

    return (
      <Container fluid>
        <Row>
          <Col sm="7" md="5" lg="4">
            <ParamList big label="Название">
              {data.name}
            </ParamList>
          </Col>
          <Col sm="6" md="5" lg="4">
            <ParamList big label="Предложений">
              {statistics.propertiesCount}
            </ParamList>
          </Col>
        </Row>
        <Row className={sUtils.pushedTop2}>
          <Col sm="20">
            <ParamList big label="Адрес">
              {location.street || '—'}
              {location.house && `, д. ${location.house}`}
            </ParamList>
          </Col>
          {/* NOTE Leaving it here for a while (just in case) */}
          {/* {!!statistics.price.from.usd && !!statistics.price.to.usd &&
            <Col sm="7" md="5" lg="4">
              <ParamList big label="Стоимость предложений">
                <FormattedCurrency symbol="USD" value={statistics.price.from.usd} />
                {statistics.price.from.usd !== statistics.price.to.usd && ` — `}
                {statistics.price.from.usd !== statistics.price.to.usd && <FormattedCurrency symbol="USD" value={statistics.price.to.usd} />}
              </ParamList>
            </Col>
          } */}
        </Row>
      </Container>
    );
  }
}

class Complex extends Component {
  componentWillMount() {
    const { actions, id } = this.props;

    if (id) actions.loadComplex(id);
  }

  componentWillReceiveProps(nextProps) {
    const { actions, id } = this.props;

    if (id !== nextProps.id) actions.loadComplex(nextProps.id);
  }

  render() {
    const { actions, state, id } = this.props;
    const { data = {} } = state.complexes[id] || {};

    return (
      <section>
        <Heading size="md">
          {`Жилой комплекс (ID: ${id})`}
          <Link className={s.linkIcon} to={`/places/complexes/${id}`}>
            <Icon className={s.icon} icon="arrow" />
          </Link>
        </Heading>
        <Row>
          <Col xs="20">
            <Media
              left={
                <ComplexImage
                  src={data.images && data.images[0] && data.images[0].url}
                />
              }
              body={
                <ComplexDescription
                  data={data}
                  state={state}
                  actions={actions}
                />
              }
            />
          </Col>
        </Row>
      </section>
    );
  }
}

const pickState = ({ auth, complexes }) => ({
  state: { auth, complexes },
});

const pickActions = dispatch => ({
  actions: bindActionCreators({ ...ComplexesActions }, dispatch),
});

export default connect(
  pickState,
  pickActions,
)(Complex);
