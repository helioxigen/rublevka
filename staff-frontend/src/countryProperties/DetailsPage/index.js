import React from 'react';
import { Grid } from 'react-flexbox-grid';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { BrowserRouter } from 'react-router-dom';

import isEqual from 'lodash/isEqual';

import { withToastManager } from 'react-toast-notifications';
import { Layout } from '../../UI';
import { Separator } from './styled';

import load from '../actions/load';
import { initialElementScheme } from '../constants/defaults';
import { kinds } from '../constants/dictionaries';
import { kindType } from '../constants/types';

import Header from './Header';
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
import Comments from './Comments';
import LinkedContacts from './LinkedContacts';
import MetaInfo from './MetaInfo';
import update from '../actions/update';
import create from '../actions/create';
import waitImagesUpdate from '../actions/waitImagesUpdate';
import { isContainsInvalidPrice } from '../helpers';
import { post } from '../../jq-redux-api/api'; // TODO use action
import MainHeader from '../../Header';

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

const editMode = {
  isEditPhoto: true,
  isEditConditions: true,
  isEditHouse: true,
  isEditCondition: true,
  isEditConstructive: true,
  isEditCommunications: true,
  isEditLayout: true,
  isEditPlot: true,
  isEditParking: true,
  isEditLocation: true,
};

const escCode = 27;

const postPhoto = async (id, url, isLayouts = false) => {
  const resource = isLayouts ? 'layouts' : 'imagess';
  try {
    await post(`/v1/properties/country/${id}/${resource}`, {
      src: url,
    });
    return Promise.resolve();
  } catch (error) {
    return Promise.reject(error);
  }
};

class PropertyDetailsPage extends React.PureComponent {
  static contextTypes = {
    router: BrowserRouter,
  };

  state = {
    ...infoMode,
  };

  componentDidMount() {
    if (this.getIsFill()) {
      this.loadData();
      this.toggleEditMode(true);
    } else if (this.getIsCreate()) {
      this.toggleEditMode(true);
    } else {
      this.loadData();
    }
    document.addEventListener('keydown', this.handleEscKey, false);
  }

  componentDidUpdate(prevProps) {
    const { match } = this.props;
    const { match: prevMatch } = prevProps;
    const isCreateOpen = this.getIsCreate() && !this.getIsCreate(prevProps);
    const isFillOpen = this.getIsFill() && !this.getIsFill(prevProps);

    if (isFillOpen) {
      this.loadData();
      this.toggleEditMode(true);
    } else if (isCreateOpen) {
      this.toggleEditMode(true);
    } else if (!isEqual(match, prevMatch)) {
      this.loadData();
    }
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleEscKey, false);
  }

  openPropertyFill = (id) => {
    const {
      router: { history },
    } = this.context;
    history.push(`/country-properties/${id}/fill`);
  };

  openListPage = () => {
    const {
      router: { history },
    } = this.context;
    history.push('/country-properties/');
  };

  loadData = (isRefresh) => {
    const { match, dispatch, data } = this.props;
    const { id: propertyId } = match.params;
    return dispatch(load(propertyId, isRefresh ? data : null));
  };

  showErrorToast = (message) => {
    const { toastManager } = this.props;
    toastManager.add(message, {
      appearance: 'error',
      autoDismiss: true,
    });
  };

  showSuccToast = (message) => {
    const { toastManager } = this.props;
    toastManager.add(message, {
      appearance: 'success',
      autoDismiss: true,
    });
  };

  getPropertyId = (customProps) => {
    const { match } = customProps || this.props;
    const { id } = match.params;
    return id;
  };

  getIsCreate = props => this.getPropertyId(props) === 'create';

  getIsFill = (customProps) => {
    const { match } = customProps || this.props;
    const { action } = match.params;
    return action === 'fill';
  };

  createProperty = async () => {};

  saveData = async (data) => {
    const { dispatch } = this.props;
    const propertyId = this.getPropertyId();

    // TODO перенести в экшен проверки
    // TODO получать список ошибок
    // TODO перенести тексты в словарь
    try {
      if (this.getIsCreate()) {
        const newData = {
          ...data,
          saleOffer: null,
          rentOffer: null,
          state: 'draft',
        };
        const { location } = newData;

        if (!location.house) {
          this.showErrorToast('Не введён номер участка');
          return;
        }

        const { id: newId } = await dispatch(create(newData));
        this.showSuccToast(`Объект id:${newId} создан`);
        this.openPropertyFill(newId);
      } else {
        if (isContainsInvalidPrice(data.saleOffer)) {
          this.showErrorToast('Не заполнена цена и валюта для оффера продажи');
          return;
        }
        if (isContainsInvalidPrice(data.rentOffer)) {
          this.showErrorToast('Не заполнена цена и валюта для оффера аренды');
          return;
        }
        await dispatch(update(propertyId, data));
        this.loadData(true);
        this.showSuccToast('Объект обновлён');
      }
    } catch (errors) {
      const messages = errors.map(el => el.message).join(';');
      this.showErrorToast(`Возникла ошибка:\n${messages}`);
    }
  };

  uploadPhoto = async (images, isLayouts = false) => {
    const { data } = this.props;
    const { id } = data;

    try {
      await postPhoto(id, images, isLayouts);
      await waitImagesUpdate(data);
      this.showSuccToast('Фотография загружена');
      this.loadData(true);
    } catch (error) {
      this.showErrorToast(`Ошибка загрузки фотографии:${error}`);
    }
  };

  toggleEditMode = (value) => {
    const props = value ? editMode : infoMode;
    this.setState({ ...props });
  };

  handleEscKey = (event) => {
    if (event.keyCode === escCode) {
      this.toggleEditMode(false);
    }
  };

  getTitle = () => {
    if (this.getIsCreate()) {
      return 'Создание объекта';
    }
    const { data: property = {} } = this.props;
    const propertyId = this.getPropertyId();
    const { location = {} } = property;
    const objectLabel = kinds[property.kind] || `Объект ${propertyId}`;
    const settlementLabel = location.settlementName;

    if (objectLabel && settlementLabel) {
      return `${objectLabel} в посёлке ${settlementLabel}`;
    }

    return objectLabel;
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
    const { kind } = property;

    return (
      <Grid>
        <MainHeader
          showBackButton
          backLabel="К списку объектов"
          onBackClick={this.openListPage}
        />
        <Helmet>
          <title>{this.getTitle()}</title>
        </Helmet>
        <Layout>
          <Header
            isEditMode={isEditPhoto}
            property={property}
            onUpdate={value => this.saveData(value)}
          />
          {!this.getIsCreate() && (
            <Photos
              property={property}
              enableEditMode={() => this.setState({ isEditPhoto: true })}
              onUpdate={value => this.saveData(value)}
              uploadPhoto={images => this.uploadPhoto(images)}
              isEditMode={isEditPhoto}
            />
          )}
          <Offers
            isEditMode={isEditConditions}
            enableEditMode={() => this.setState({ isEditConditions: true })}
            property={property}
            onUpdate={value => this.saveData(value)}
            id={propertyId}
          />
          {kind !== kindType.land && (
            <>
              <Separator big />
              <House
                isEditMode={isEditHouse}
                property={property}
                onUpdate={value => this.saveData(value)}
                enableHouseEditMode={() => this.setState({ isEditHouse: true })}
              />
            </>
          )}
          {kind !== kindType.land && (
            <>
              <Separator big />
              <Condition
                isEditMode={isEditCondition}
                property={property}
                onUpdate={value => this.saveData(value)}
                enableEditMode={() => this.setState({ isEditCondition: true })}
              />
            </>
          )}
          {kind !== kindType.land && (
            <>
              <Separator big />
              <Specification
                isEditMode={isEditConstructive}
                property={property}
                onUpdate={value => this.saveData(value)}
                enableEditMode={() =>
                  this.setState({ isEditConstructive: true })
                }
              />
            </>
          )}
          <Separator big />
          <Communications
            isEditMode={isEditCommunications}
            property={property}
            onUpdate={value => this.saveData(value)}
            enableEditMode={() => this.setState({ isEditCommunications: true })}
          />
          {kind !== kindType.land && (
            <>
              <Separator big />
              <Layouts
                isEditMode={isEditLayout}
                property={property}
                onUpdate={value => this.saveData(value)}
                enableEditMode={() => this.setState({ isEditLayout: true })}
                uploadPhoto={images => this.uploadPhoto(images, true)}
              />
            </>
          )}
          <Separator big />
          <Land
            isEditMode={isEditPlot}
            property={property}
            onUpdate={value => this.saveData(value)}
            enableEditMode={() => this.setState({ isEditPlot: true })}
          />
          {kind !== kindType.land && (
            <>
              <Separator big />
              <Parking
                isEditMode={isEditParking}
                property={property}
                onUpdate={value => this.saveData(value)}
                enableEditMode={() => this.setState({ isEditParking: true })}
              />
            </>
          )}
          <Separator big />
          <Location
            isEditMode={isEditLocation}
            property={property}
            onUpdate={value => this.saveData(value)}
            enableEditMode={() => this.setState({ isEditLocation: true })}
          />
          <LinkedContacts property={property} />
          <Comments property={property} />
          <Separator big />
          <MetaInfo property={property} />
        </Layout>
      </Grid>
    );
  }
}

const mapStateToProps = ({ countryProperties }, { match }) =>
  countryProperties[match.params.id] || { data: initialElementScheme };

export default withToastManager(connect(mapStateToProps)(PropertyDetailsPage));
