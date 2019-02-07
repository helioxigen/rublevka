import React from 'react';
import { Grid } from 'react-flexbox-grid';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Layout } from '../../UI';
import { Separator } from './style';
import actions from '../actions';
import PhotoSection from './photoSection';
import ConditionsSection from './conditionsSection';
import HouseSection from './houseSection';
import ConditionSection from './conditionSection';
import ConstructiveSection from './constructiveSection';
import CommunicationSection from './communicationsSection';
import LayoutSection from './layoutSection';
import PlotSection from './plotSection';
import ParkingSection from './parkingSection';
import LocationSection from './locationSection';
import TitleSection from './titleSection';

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
    const { propertyId } = this.props;
    const { propertyId: prevPropertyId } = prevProps;

    if (propertyId !== prevPropertyId) {
      this.loadData();
    }
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleEscKey, false);
  }

  loadData = () => {
    const { match, getProperty } = this.props;
    const { id: propertyId } = match.params;
    getProperty(propertyId);
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

    const { property } = this.props;

    const currentPrice =
      property.saleOffer.multiCurrencyPrice &&
      property.saleOffer.multiCurrencyPrice[
        property.saleOffer.currency.toLowerCase()
      ];

    const propertyOptions = Object.keys(property.specification.layouts);

    return (
      <React.Fragment>
        <Grid>
          <Helmet>
            <title>Дом &quot;{property.location.settlementName}&quot;</title>
          </Helmet>
          <Layout>
            <TitleSection isEditMode={isEditPhoto} property={property} />
            <PhotoSection
              enablePhotoEditMode={isEditPhoto}
              isEditMode={isEditPhoto}
            />
            <ConditionsSection
              isEditMode={isEditConditions}
              property={property}
              enableEditMode={() => this.setState({ isEditConditions: true })}
              currentPrice={currentPrice}
            />
            <Separator big />
            <HouseSection
              isEditMode={isEditHouse}
              property={property}
              enableHouseEditMode={() => this.setState({ isEditHouse: true })}
            />
            <Separator big />
            <ConditionSection
              isEditMode={isEditCondition}
              property={property}
              enableEditMode={() => this.setState({ isEditCondition: true })}
            />
            <Separator big />
            <ConstructiveSection
              isEditMode={isEditConstructive}
              property={property}
              enableEditMode={() => this.setState({ isEditConstructive: true })}
            />
            <Separator big />
            <CommunicationSection
              isEditMode={isEditCommunications}
              property={property}
              enableEditMode={() =>
                this.setState({ isEditCommunications: true })
              }
            />
            <Separator big />
            <LayoutSection
              isEditMode={isEditLayout}
              property={property}
              enableEditMode={() => this.setState({ isEditLayout: true })}
              propertyOptions={propertyOptions}
            />
            <Separator big />
            <PlotSection
              isEditMode={isEditPlot}
              property={property}
              enableEditMode={() => this.setState({ isEditPlot: true })}
            />
            <Separator big />
            <ParkingSection
              isEditMode={isEditParking}
              property={property}
              enableEditMode={() => this.setState({ isEditParking: true })}
            />
            <Separator big />
            <LocationSection
              isEditMode={isEditLocation}
              property={property}
              enableEditMode={() => this.setState({ isEditLocation: true })}
            />
          </Layout>
        </Grid>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  property: state.properties,
});

const mapDispatchToProps = dispatch => ({
  getProperty: id => dispatch(actions.getProperty(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PropertyDetailsPage);
