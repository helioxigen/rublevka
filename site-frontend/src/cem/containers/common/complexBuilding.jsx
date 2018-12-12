import React, { Component } from 'react';

import { Link } from 'react-router';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import loadComplexBuilding from 'cem/actions/complexBuildings/id/load';

import UI from 'cem/components/ui';
const {
  ParamList, Icon, Media, Image, Heading,
  Grid: { Container, Row, Col },
} = UI;

import cn from 'classnames';
import s from 'cem/styles/id/content';
import sUtils from 'cem/styles/utils';

import * as dict from 'cem/constants/complexBuildings/dictionaries';

const BuildingImage = ({ src }) => (
  src ? <Image src={`${src}-128`} kind="circle" width="114" height="114" /> : <Icon icon="placeholder" className={s.placeholder} />
);

class BuildingDescription extends Component {
  render() {
    const { data: { details = {} } } = this.props;

    return (
      <Container fluid className={sUtils.pushedBottom6}>
        <Row>
          <Col sm="7" md="5" lg="4">
            <ParamList big label="Тип дома">
              <span className={cn(dict.houseKinds[details.houseKind] && s[dict.houseKinds[details.houseKind].style])}>{dict.houseKinds[details.houseKind] && dict.houseKinds[details.houseKind].title || '—'}</span>
            </ParamList>
          </Col>
        </Row>
        <Row className={sUtils.pushedTop2}>
          <Col sm="7" md="5" lg="4">
            <ParamList big label="Год постройки">
              {details.builtYear || '—'}
            </ParamList>
          </Col>
        </Row>
      </Container>
    );
  }
}

class ComplexBuilding extends Component {
  componentWillMount() {
    const { actions, id } = this.props;

    if (id) actions.loadComplexBuilding(id);
  }

  componentWillReceiveProps(nextProps) {
    const { actions, id } = this.props;

    if (id !== nextProps.id) {
      actions.loadComplexBuilding(nextProps.id);
    }
  }

  render() {
    const { state, id, alternativeName } = this.props;
    const { data = {} } = state.complexBuildings[id] || {};

    return (
      <section>
        <Heading size="sm">
          {`ЖК ${data.complexName || alternativeName || 'без названия'}, корпус ${(data.location && data.location.building) || 'не задан'} (ID: ${id})`}
          <Link className={s.linkIcon} to={`/places/complexes/buildings/${id}`}>
            <Icon className={s.icon} icon="arrow" />
          </Link>
        </Heading>
        <Row>
          <Col xs="20">
            <Media
              left={<BuildingImage src={data.images && data.images[0] && data.images[0].url} />}
              body={<BuildingDescription data={data} />}
            />
          </Col>
        </Row>
      </section>
    );
  }
}

const pickState = ({ complexBuildings }) => ({
  state: { complexBuildings },
});

const pickActions = dispatch => ({
  actions: bindActionCreators({ loadComplexBuilding }, dispatch),
});

export default connect(pickState, pickActions)(ComplexBuilding);
