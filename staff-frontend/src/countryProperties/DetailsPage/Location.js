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
  Separator,
  SubTitle,
} from './styled';
import { Body, BodyBig, BodyBold } from '../../UI';
import searchIcon from './img/search-icon.svg';

const LocationSection = ({ enableEditMode, isEditMode, property }) => {
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
            <PropertyBigValue>
              {property.location.localityName}
            </PropertyBigValue>
          </Property>
          <Property xs={5}>
            <PropertyTitle>Поселок</PropertyTitle>
            <PropertyBigValue>
              {property.location.settlementName}
            </PropertyBigValue>
            <PropertyValue>
              <BodyBold>От МКАД:&nbsp;</BodyBold>
              <Body>
                {property.location.mkadDistance}
                {' '}
км
              </Body>
            </PropertyValue>
          </Property>
          <Property xs={3}>
            <PropertyTitle>Шоссе</PropertyTitle>
            <PropertyBigValue>{property.location.routeName}</PropertyBigValue>
          </Property>
        </Row>
        <Separator big />
        <Row>
          <Property xs={4}>
            <PropertyTitle>Улица</PropertyTitle>
            <BodyBig>{property.location.street || 'Не указано'}</BodyBig>
          </Property>
          <Property xs={5}>
            <PropertyTitle>Номер участка</PropertyTitle>
            <BodyBig>{property.location.house}</BodyBig>
          </Property>
          {property.location.cadastralNumber && (
            <Property xs={3}>
              <PropertyTitle>Кадастровый номер</PropertyTitle>
              <BodyBig>{property.location.cadastralNumber}</BodyBig>
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
            <Marker
              lat={+property.location.latitude}
              lon={+property.location.longitude}
            />
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
            <PlotLocationInfo>&mdash;</PlotLocationInfo>
            <PlotLocationInput
              defaultValue={property.location.street}
              placeholder="Улица"
            />
          </Col>
          <Col xsOffset={1} xs={3}>
            <PropertyTitle>Поселок</PropertyTitle>
            <PlotLocationInfo>&mdash;</PlotLocationInfo>
            <PlotLocationInput
              defaultValue={`${property.location.latitude}, ${
                property.location.longitude
              }`}
              placeholder="Номер участка"
            />
          </Col>
          <Col xsOffset={1} xs={4}>
            <PropertyTitle>Шоссе</PropertyTitle>
            <PlotLocationInfo>&mdash;</PlotLocationInfo>
            {property.location.cadastralNumber && (
              <PlotLocationInput
                defaultValue={property.location.cadastralNumber}
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
