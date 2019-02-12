import React from 'react';
import { Grid } from 'react-flexbox-grid';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

import isEqual from 'lodash/isEqual';

import { Layout } from '../../UI';
import { Separator } from './styled';

import load from '../actions/load';
import { initialElementScheme } from '../constants/defaults';
import { kinds } from '../constants/dictionaries';

import Photos from './Photos';
import Offers from './Offers';
import House from './House';
import Condition from './Condition';
import Specification from './Specification';
import Communications from './Communications';
import Layouts from './Layouts';
import Land from './Land';
import Parking from './Parking';
import Location from './Location';
import Header from './Header';

const infoMode = {
  isEditPhoto: false,
  isEditConditions: false,
  isEditHouse: false,
  isEditCondition: false,
  isEditConstructive: false,
  isEditCommunications: false,
  isEditLayout: false,
  isEditPlot: false,
  isEditParking: false,
  isEditLocation: false,
};

class PropertyDetailsPage extends React.PureComponent {
  state = {
    ...infoMode,
  };

  componentDidMount() {
    this.loadData();

    document.addEventListener('keydown', this.handleEscKey, false);
  }

  componentDidUpdate(prevProps) {
    const { match } = this.props;
    const { match: prevMatch } = prevProps;

    if (!isEqual(match, prevMatch)) {
      this.loadData();
    }
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleEscKey, false);
  }

  loadData = () => {
    const { match, dispatch } = this.props;
    const { id: propertyId } = match.params;

    dispatch(load(propertyId));
  };

  handleEscKey = event => {
    if (event.keyCode === 27) {
      this.setState({
        ...infoMode,
      });
    }
  };

  render() {
    const {
      isEditPhoto,
      isEditConditions,
      isEditHouse,
      isEditCondition,
      isEditConstructive,
      isEditCommunications,
      isEditLayout,
      isEditPlot,
      isEditParking,
      isEditLocation,
    } = this.state;

    const { data: property = {}, match } = this.props;
    const { id: propertyId } = match.params;

    // return <pre>{JSON.stringify(this.props, null, 2)}</pre>;

    return (
      <Grid fluid>
        <Helmet>
          <title>
            {`${kinds[property.kind]} в посёлке ${
              property.location.settlementName
            }`}
          </title>
        </Helmet>

        <Layout>
          <Header isEditMode={isEditPhoto} property={property} />
          <Photos
            data={property}
            enableEditMode={() => this.setState({ isEditPhoto: true })}
            isEditMode={isEditPhoto}
          />
          <Offers
            isEditMode={isEditConditions}
            enableEditMode={() => this.setState({ isEditConditions: true })}
            // currentPrice={currentPrice}
            property={property}
            id={propertyId}
          />
          <Separator big />
          <House
            isEditMode={isEditHouse}
            property={property}
            enableHouseEditMode={() => this.setState({ isEditHouse: true })}
          />
          <Separator big />
          <Condition
            isEditMode={isEditCondition}
            property={property}
            enableEditMode={() => this.setState({ isEditCondition: true })}
          />
          <Separator big />
          <Specification
            isEditMode={isEditConstructive}
            property={property}
            enableEditMode={() => this.setState({ isEditConstructive: true })}
          />
          <Separator big />
          <Communications
            isEditMode={isEditCommunications}
            property={property}
            enableEditMode={() => this.setState({ isEditCommunications: true })}
          />
          <Separator big />
          <Layouts
            isEditMode={isEditLayout}
            property={property}
            enableEditMode={() => this.setState({ isEditLayout: true })}
          />
          <Separator big />
          <Land
            isEditMode={isEditPlot}
            property={property}
            enableEditMode={() => this.setState({ isEditPlot: true })}
          />
          <Separator big />
          <Parking
            isEditMode={isEditParking}
            property={property}
            enableEditMode={() => this.setState({ isEditParking: true })}
          />
          <Separator big />
          <Location
            isEditMode={isEditLocation}
            property={property}
            enableEditMode={() => this.setState({ isEditLocation: true })}
          />
        </Layout>
      </Grid>
    );
  }
}

const mapStateToProps = ({ countryProperties }, { match }) =>
  countryProperties[match.params.id] || { data: initialElementScheme };

export default connect(mapStateToProps)(PropertyDetailsPage);
