import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Helmet from 'react-helmet';
import { helmet } from 'config/seo';

// actions
import loadComplex from 'core/complexes/actions/id/load';
import loadComplexBuildings from 'core/complexBuildings/actions/list/load';
import loadProperties from 'core/cityProperties/actions/list/load'; // for ssr
// import { setSharedRetargetingKey } from 'actions/retargeting';

// constants
// import { resourceName } from 'core/complexes/constants/defaults';
// import Content from 'components/complexes/id';

// const group = `complexBuilding.properties`;

// components
import RequestForm from 'request/selectionForm';
import Banner from './banner';
import Info from './info';
import PrimaryProperties from './primaryProperties';
import MapComponent from 'ui/map';

// styles
import s from 'styles/complexes/id/content';
import sUtils from 'styles/utils';

import isEqual from 'lodash/isEqual';

// ui
import UI from 'ui';
import { ogMeta } from '../../helpers';
const {
  Loading,
  Grid: { Container, Row, Col },
} = UI;

const complexBuildingsGroup = 'forComplex';

class Show extends Component {
  componentWillMount() {
    // const { actions, params: { id } } = this.props;
    if (typeof window !== 'undefined') window.scrollTo(0, 0);

    // actions.loadComplex(id);
    // actions.loadComplexBuildings(id, { filter: { complexId: id } });
    // actions.loadCurrentBroker(`city`);
    this.load(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(this.props.params, nextProps.params)) {
      this.load(nextProps);
    }
  }

  load({ actions, params }) {
    const parsedComplex = params.complex.split('_');
    const [complexName, complexId] = parsedComplex;

    actions.loadComplex(complexId).then(() => {
      const options = {
        filter: {
          complexId,
        },
      };

      actions.loadComplexBuildings(options, complexBuildingsGroup);
    });
  }

  static loadServer(dispatch, params) {
    const actions = bindActionCreators(
      { loadComplex, loadComplexBuildings, loadProperties },
      dispatch,
    );

    const { complexId } = params;

    return Promise.all([
      actions.loadComplex(complexId),
      actions.loadComplexBuildings(
        { filter: { complexId } },
        complexBuildingsGroup,
      ),
      actions.loadProperties({}, 'forComplexOnlyPrimary', { complexId }),
    ]);
  }

  render() {
    const { state, params } = this.props;
    const parsedComplex = params.complex.split('_');
    const [complexName, complexId] = parsedComplex;

    const { isFetching, data = {} } = state.complexes[complexId] || {};
    const { ids: cbIds } = state.complexBuildings[complexBuildingsGroup] || {};
    const { location = {} } = data;

    const seo = helmet.places.complexes.show;

    const isPositionAvailable = location.latitude && location.longitude;
    const marker = {
      lat: location.latitude,
      lng: location.longitude,
    };

    const title = seo.title(data.name, location.street);
    const description = seo.description(data.name, location.street);

    return (
      <Container fluid>
        {seo && (
          <Helmet
            title={title}
            meta={[
              {
                name: 'description',
                content: seo.description(data.name, location.street),
              },
              ...ogMeta({
                title,
                description,
              }),
            ]}
          />
        )}

        <Banner data={data} complexBuildingsIds={cbIds} />

        <section className={s.content}>
          <Container>
            {!isFetching && <Info data={data} complexBuildingsIds={cbIds} />}
            {isFetching && <Loading />}
          </Container>

          {isPositionAvailable && (
            <Col xs="12" className={sUtils.pushedBottomXs5Sm6}>
              <Row className={sUtils.positionRelative10}>
                <MapComponent
                  center={[marker.lng, marker.lat]}
                  markers={[marker]}
                  container={<div className={sUtils.mapContainer} />}
                />
              </Row>
            </Col>
          )}

          <Container>
            <PrimaryProperties complexId={complexId} />
          </Container>

          <Container>
            <Row sm="center">
              <Col sm="8" md="6" lg="4">
                <RequestForm
                  propertyCategory="city"
                  className={sUtils.paddingBottom6}
                />
              </Col>
            </Row>
          </Container>
        </section>
      </Container>
    );
  }
}

const pickState = ({ complexes, complexBuildings }) => ({
  state: { complexes, complexBuildings },
});

const pickActions = dispatch => {
  const actions = {
    loadComplex,
    loadComplexBuildings,
  };

  return {
    actions: bindActionCreators(actions, dispatch),
  };
};

export default connect(
  pickState,
  pickActions,
)(Show);
