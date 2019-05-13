import React from 'react';
import { Col, Row } from 'react-flexbox-grid';
import { Map as YandexMap, Marker } from 'yandex-map-react';
import {
  EditButton,
  EditPropertyRow,
  MapWrapper,
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
import LocationDropdown from './LocationDropdown';

const moscowCenter = [55.754734, 37.583314];

const LocationSection = ({
  enableEditMode,
  isEditMode,
  property,
  onUpdate,
}) => {
  const { location } = property;
  const {
    localityName,
    districtName,
    settlementName,
    mkadDistance,
    routeName,
    street,
    house,
    cadastralNumber,
    latitude,
    longitude,
  } = location;
  const update = (key, value) =>
    onUpdate({
      ...property,
      location: { ...location, [key]: value },
    });

  const updateSettlement = (value) => {
    onUpdate({
      ...property,
      location: {
        ...location,
        settlementId: value.id,
      },
    });
  };

  // house: "10"
  // street: "Улица"

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
            <PropertyTitle>Шоссе</PropertyTitle>
            <PropertyBigValue>{routeName || '—'}</PropertyBigValue>
          </Property>
          <Property xs={4}>
            <PropertyTitle>Район</PropertyTitle>
            <PropertyBigValue>{districtName || '—'}</PropertyBigValue>
          </Property>
          <Property xs={3}>
            <PropertyTitle>Населенный пункт, поселок</PropertyTitle>
            <PropertyBigValue>
              {localityName || settlementName
                ? [localityName, settlementName].join(', ')
                : '—'}
            </PropertyBigValue>
            <PropertyValue>
              <BodyBold>От МКАД:&nbsp;</BodyBold>
              <Body>{mkadDistance ? `${mkadDistance} км` : '—'}</Body>
            </PropertyValue>
          </Property>
        </Row>
        <Row>
          <Property xs={4}>
            <PropertyTitle>Улица</PropertyTitle>
            <BodyBig>{street || '—'}</BodyBig>
          </Property>
          <Property xs={4}>
            <PropertyTitle>Номер участка</PropertyTitle>
            <BodyBig>{house || '—'}</BodyBig>
          </Property>
          {/* {cadastralNumber && ( */}
          <Property xs={3}>
            <PropertyTitle>Кадастровый номер</PropertyTitle>
            <BodyBig>{cadastralNumber || '—'}</BodyBig>
          </Property>
          {/* )} */}
        </Row>
        <MapWrapper>
          <YandexMap
            width="100%"
            height="325px"
            center={moscowCenter}
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
    <>
      <EditPropertyRow>
        <Col xs={2}>
          <SubTitle>Участок</SubTitle>
        </Col>
        <Col xsOffset={1} xs={9}>
          <Row>
            <PlotInputContainer xs={12}>
              <SearchIcon src={searchIcon} />
              <LocationDropdown
                onChange={(settlement) => {
                  updateSettlement(settlement);
                }}
              />
            </PlotInputContainer>
            <Col xs={3}>
              <PropertyTitle>Шоссе</PropertyTitle>
              <PlotLocationInfo>{routeName || '—'}</PlotLocationInfo>
              <PlotLocationInput
                defaultValue={street}
                placeholder="Улица"
                onSubmit={value => update('street', value)}
              />
            </Col>
            <Col xsOffset={1} xs={3}>
              <PropertyTitle>Район</PropertyTitle>
              <PlotLocationInfo>{districtName || '—'}</PlotLocationInfo>
              <PlotLocationInput
                defaultValue={house}
                placeholder="Номер участка"
                onSubmit={value => update('house', value)}
              />
            </Col>
            <Col xsOffset={1} xs={4}>
              <PropertyTitle>Населённый пункт, поселок</PropertyTitle>
              <PlotLocationInfo>
                {localityName || settlementName
                  ? [localityName, settlementName].join(', ')
                  : '—'}
              </PlotLocationInfo>
              {/* {cadastralNumber && ( */}
              <PlotLocationInput
                defaultValue={cadastralNumber}
                placeholder="Кадастровый номер"
                onSubmit={value => update('cadastralNumber', value)}
              />
              {/* )} */}
            </Col>
          </Row>
        </Col>
      </EditPropertyRow>
      <MapWrapper>
        <YandexMap width="100%" height="325px" center={moscowCenter} zoom={10}>
          <Marker lat={+latitude} lon={+longitude} />
        </YandexMap>
      </MapWrapper>
    </>
  );
};

export default LocationSection;
