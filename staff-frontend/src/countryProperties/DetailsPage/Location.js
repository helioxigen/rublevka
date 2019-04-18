import React from 'react';
import { Col, Row } from 'react-flexbox-grid';
import { Map as YandexMap, Marker } from 'yandex-map-react';
import {
  EditButton,
  EditPropertyRow,
  MapWrapper,
  PlotInput,
  PlotInputContainer,
  PlotLocationInfo,
  PlotLocationInput,
  Property,
  PropertyBigValue,
  PropertyTitle,
  PropertyValue,
  SearchIcon,
  SubTitle,
} from './styled';
import { Body, BodyBig, BodyBold } from '../../UI';
import searchIcon from './img/search-icon.svg';

const LocationSection = ({ enableEditMode, isEditMode, property }) => {
  const { location } = property;
  const {
    localityName,
    settlementName,
    mkadDistance,
    routeName,
    street,
    house,
    cadastralNumber,
    latitude,
    longitude,
  } = location;

  if (!isEditMode) {
    return (
      <>
        <Row>
          <Col xs={12}>
            <SubTitle>Расположение</SubTitle>
          </Col>
        </Row>
        <Row>
          <Property xs={4}>
            <PropertyTitle>Населенный пункт</PropertyTitle>
            <PropertyBigValue>{localityName || '—'}</PropertyBigValue>
          </Property>
          <Property xs={5}>
            <PropertyTitle>Поселок</PropertyTitle>
            <PropertyBigValue>{settlementName || '—'}</PropertyBigValue>
            <PropertyValue>
              <BodyBold>От МКАД:&nbsp;</BodyBold>
              <Body>{mkadDistance ? `${mkadDistance} км` : '—'}</Body>
            </PropertyValue>
          </Property>
          <Property xs={3}>
            <PropertyTitle>Шоссе</PropertyTitle>
            <PropertyBigValue>{routeName || '—'}</PropertyBigValue>
          </Property>
        </Row>
        <Row>
          <Property xs={4}>
            <PropertyTitle>Улица</PropertyTitle>
            <BodyBig>{street || '—'}</BodyBig>
          </Property>
          <Property xs={5}>
            <PropertyTitle>Номер участка</PropertyTitle>
            <BodyBig>{house || '—'}</BodyBig>
          </Property>
          {cadastralNumber && (
            <Property xs={3}>
              <PropertyTitle>Кадастровый номер</PropertyTitle>
              <BodyBig>{cadastralNumber || '—'}</BodyBig>
            </Property>
          )}
        </Row>
        <MapWrapper>
          <YandexMap
            width="100%"
            height="325px"
            center={[55.754734, 37.583314]}
            zoom={10}
          >
            <Marker lat={+latitude} lon={+longitude} />
          </YandexMap>
        </MapWrapper>
        <EditButton onClick={enableEditMode}>Редактировать</EditButton>
      </>
    );
  }
  return (
    <EditPropertyRow>
      <Col xs={2}>
        <SubTitle>Участок</SubTitle>
      </Col>
      <Col xsOffset={1} xs={9}>
        <Row>
          <PlotInputContainer xs={12}>
            <SearchIcon src={searchIcon} />
            <PlotInput placeholder="Поиск поселка" />
          </PlotInputContainer>
          <Col xs={3}>
            <PropertyTitle>Населенный пункт</PropertyTitle>
            <PlotLocationInfo>{localityName || '—'}</PlotLocationInfo>
            <PlotLocationInput defaultValue={street} placeholder="Улица" />
          </Col>
          <Col xsOffset={1} xs={3}>
            <PropertyTitle>Поселок</PropertyTitle>
            <PlotLocationInfo>{settlementName || '—'}</PlotLocationInfo>
            <PlotLocationInput
              defaultValue={`${latitude}, ${longitude}`}
              placeholder="Номер участка"
            />
          </Col>
          <Col xsOffset={1} xs={4}>
            <PropertyTitle>Шоссе</PropertyTitle>
            <PlotLocationInfo>{routeName || '—'}</PlotLocationInfo>
            {cadastralNumber && (
              <PlotLocationInput
                defaultValue={cadastralNumber}
                placeholder="Кадастровый номер"
              />
            )}
          </Col>
        </Row>
      </Col>
    </EditPropertyRow>
  );
};

export default LocationSection;
