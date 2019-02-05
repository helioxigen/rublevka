import { Col, Grid, Row } from 'react-flexbox-grid';
import { Map, Marker } from 'yandex-map-react';
import React from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import {
  saleKinds,
  resaleKinds,
  currencies,
  furnitureKinds,
  renovateKinds,
  states,
  roofMaterials,
  wallMaterials,
  conditions,
  landscapeKinds,
  waterSupply,
  gasSupply,
  sewerageSupply,
  mainLayouts,
} from '../dictionaries';
import actions from '../actions';
import { Body, BodyBig, BodyBold, Layout } from '../../UI';
import pointIcon from './img/point-icon.svg';
import example from './img/example1.png';
import addPhotoIcon from './img/add-photo-icon.svg';
import propertyOptionIcon from './img/property-option-icon.svg';
import {
  SubTitle,
  PropertyTitle,
  Separator,
  PropertyBigValue,
  TitleAddress,
  PointIcon,
  MainTitle,
  PhotoExampleContainer,
  PhotoExampleWrapper,
  PhotoExample,
  PhotoCloseButton,
  PhotoEditTool,
  Property,
  PhotoEditTools,
  AddPhotoIcon,
  PropertyValue,
  EditButton,
  PropertyOptionWrapper,
  PropertyOption,
  MapWrapper,
  PropertyOptionIcon,
} from './style';

class ObjectInfo extends React.PureComponent {
  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate(prevProps) {
    const { propertyId } = this.props;
    const { propertyId: prevPropertyId } = prevProps;

    if (propertyId !== prevPropertyId) {
      this.loadData();
    }
  }

  loadData = () => {
    const { getProperty, propertyId } = this.props;
    getProperty(propertyId);
  };

  render() {
    const { enableEditMode, properties } = this.props;

    const currentPrice =
      properties.saleOffer.multiCurrencyPrice &&
      properties.saleOffer.multiCurrencyPrice[
        properties.saleOffer.currency.toLowerCase()
      ];

    const propertyOptions = Object.keys(properties.specification.layouts);

    return (
      <>
        <Grid>
          <Helmet>
            <title>Дом &quot;{properties.location.settlementName}&quot;</title>
          </Helmet>
          <Layout>
            <Row>
              <Col xs={12}>
                <MainTitle>
                  Продажа дома в {properties.location.settlementName}
                </MainTitle>
              </Col>
            </Row>
            <Row>
              <TitleAddress xs={12}>
                <PointIcon src={pointIcon} />
                <BodyBig>
                  {properties.location.localityName},{' '}
                  {properties.location.mkadDistance}км от МКАД
                </BodyBig>
              </TitleAddress>
            </Row>
            <Row>
              <PhotoExampleContainer xs={12}>
                <PhotoExampleWrapper>
                  <PhotoExample src={example} />
                  <PhotoCloseButton />
                </PhotoExampleWrapper>
                <PhotoExampleWrapper>
                  <PhotoExample src={example} />
                  <PhotoCloseButton />
                </PhotoExampleWrapper>
                <PhotoExampleWrapper>
                  <PhotoExample src={example} />
                  <PhotoCloseButton />
                </PhotoExampleWrapper>
              </PhotoExampleContainer>
            </Row>
            <Row>
              <PhotoEditTools xs={12}>
                <PhotoEditTool>
                  Посмотреть все фотографии
                  <AddPhotoIcon src={addPhotoIcon} />
                </PhotoEditTool>
                <PhotoEditTool onClick={enableEditMode}>
                  Редактировать
                </PhotoEditTool>
              </PhotoEditTools>
            </Row>
            <Row>
              <Col xs={12}>
                <SubTitle>Условия</SubTitle>
              </Col>
            </Row>
            <Row>
              <Property xs={4}>
                <PropertyTitle>Стоимость</PropertyTitle>
                <PropertyBigValue>{currentPrice || '—'}</PropertyBigValue>
                <PropertyValue>
                  <BodyBold>Стоимость за м² :&nbsp;</BodyBold>
                  <Body>
                    {currentPrice
                      ? `${currencies[properties.saleOffer.currency]} + ' ' +
                      ${Math.round(
                        currentPrice / properties.specification.area,
                        -2,
                      )}`
                      : '—'}
                  </Body>
                </PropertyValue>
              </Property>
              <Property xs={4}>
                <PropertyTitle>Комиссия</PropertyTitle>
                <PropertyBigValue>
                  {properties.saleOffer.agentFee}%
                </PropertyBigValue>
                <PropertyValue>
                  <BodyBold>Полная комиссия:&nbsp;</BodyBold>
                  <Body>
                    {currentPrice
                      ? currentPrice * 0.01 * properties.saleOffer.agentFee
                      : '—'}
                  </Body>
                </PropertyValue>
              </Property>
              <Property xs={4}>
                <PropertyTitle>Текущий статус</PropertyTitle>
                <PropertyBigValue>
                  {properties.state
                    ? states[properties.state].title
                    : 'Нет информации'}
                </PropertyBigValue>
              </Property>
            </Row>
            <Separator big />
            <Row>
              <Property xs={4}>
                <PropertyTitle>Тип продажи</PropertyTitle>
                <PropertyValue>
                  <Body>{saleKinds[properties.saleOffer.kind]}</Body>
                </PropertyValue>
              </Property>
              <Property xs={4}>
                <PropertyTitle>Ипотека</PropertyTitle>
                <PropertyValue>
                  <Body>
                    {properties.saleOffer.isMortgage
                      ? 'Возможна'
                      : 'Невозможна'}
                  </Body>
                </PropertyValue>
              </Property>
              <Property xs={4}>
                <PropertyTitle>Закрытая продажа</PropertyTitle>
                <PropertyValue>
                  <Body>{properties.state === 'private' ? 'Да' : 'Нет'}</Body>
                </PropertyValue>
              </Property>
              <Property xs={4}>
                <PropertyTitle>Статус продажи</PropertyTitle>
                <PropertyValue>
                  <Body>{resaleKinds[properties.saleOffer.isResale]}</Body>
                </PropertyValue>
              </Property>
              <Property xs={4}>
                <PropertyTitle>Рассрочка</PropertyTitle>
                <PropertyValue>
                  <Body>
                    {properties.saleOffer.isInstallment
                      ? 'Возможна'
                      : 'Невозможна'}
                  </Body>
                </PropertyValue>
              </Property>
              <Property xs={4}>
                <PropertyTitle>Показывать на сайте</PropertyTitle>
                <PropertyValue>
                  <Body>{properties.saleOffer.isDisabled ? 'Нет' : 'Да'}</Body>
                </PropertyValue>
              </Property>
              <Property xs={4}>
                <PropertyTitle>Торг</PropertyTitle>
                <PropertyValue>
                  <Body>
                    {properties.saleOffer.isBargain ? 'Возможен' : 'Невозможен'}
                  </Body>
                </PropertyValue>
              </Property>
            </Row>
            <Row>
              <Col xs={12}>
                <EditButton onClick={enableEditMode}>Редактировать</EditButton>
              </Col>
            </Row>
            <Separator big />
            <Row>
              <Col xs={12}>
                <SubTitle>Дом</SubTitle>
              </Col>
            </Row>
            <Row>
              <Property xs={3}>
                <PropertyTitle>Площадь дома</PropertyTitle>
                <PropertyValue>
                  <Body>{properties.specification.area} м²</Body>
                </PropertyValue>
              </Property>
              <Property xs={3}>
                <PropertyTitle>Спален</PropertyTitle>
                <PropertyValue>
                  <Body>
                    {properties.specification.bedrooms || 'Не указано'}
                  </Body>
                </PropertyValue>
              </Property>
              <Property xs={3}>
                <PropertyTitle>Лоджий</PropertyTitle>
                <PropertyValue>
                  <Body>
                    {properties.specification.loggias || 'Не указано'}
                  </Body>
                </PropertyValue>
              </Property>
              <Property xs={3}>
                <PropertyTitle>Высота потолков</PropertyTitle>
                <PropertyValue>
                  <Body>
                    {properties.specification.ceilingHeight || 'Не указано'}
                  </Body>
                </PropertyValue>
              </Property>
              <Property xs={3}>
                <PropertyTitle>Комнат</PropertyTitle>
                <PropertyValue>
                  <Body>{properties.specification.rooms || 'Не указано'}</Body>
                </PropertyValue>
              </Property>
              <Property xs={3}>
                <PropertyTitle>Балконов</PropertyTitle>
                <PropertyValue>
                  <Body>
                    {properties.specification.balconies || 'Не указано'}
                  </Body>
                </PropertyValue>
              </Property>
              <Property xs={3}>
                <PropertyTitle>Санузлов</PropertyTitle>
                <PropertyValue>
                  <Body>{properties.specification.wcs || 'Не указано'}</Body>
                </PropertyValue>
              </Property>
              <Property xs={3}>
                <PropertyTitle>Лифт</PropertyTitle>
                <PropertyValue>
                  <Body>
                    {properties.specification.elevators || 'Не указано'}
                  </Body>
                </PropertyValue>
              </Property>
            </Row>
            <Row>
              <Col xs={12}>
                <EditButton onClick={enableEditMode}>Редактировать</EditButton>
              </Col>
            </Row>
            <Separator big />
            <Row>
              <Property xs={3}>
                <PropertyBigValue>Состояние</PropertyBigValue>
              </Property>
              <Col xs={9}>
                <Row>
                  <Property xs={4}>
                    <PropertyTitle>Стадия строительства</PropertyTitle>
                    <PropertyValue>
                      <Body>
                        {renovateKinds[properties.specification.renovate] ||
                          'Не указано'}
                      </Body>
                    </PropertyValue>
                  </Property>
                  <Property xs={4}>
                    <PropertyTitle>Мебель</PropertyTitle>
                    <PropertyValue>
                      <Body>
                        {properties.specification.furniture
                          ? furnitureKinds[properties.specification.furniture]
                          : 'Не указано'}
                      </Body>
                    </PropertyValue>
                  </Property>
                  <Property xs={4}>
                    <PropertyTitle>Состояние</PropertyTitle>
                    <PropertyValue>
                      <Body>Отличное</Body>
                    </PropertyValue>
                  </Property>
                  <Col xs={12}>
                    <EditButton onClick={enableEditMode}>
                      Редактировать
                    </EditButton>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Separator big />
            <Row>
              <Property xs={3}>
                <PropertyBigValue>Конструктив</PropertyBigValue>
              </Property>
              <Col xs={9}>
                <Row>
                  <Property xs={4}>
                    <PropertyTitle>Стены</PropertyTitle>
                    <PropertyValue>
                      <Body>
                        {wallMaterials[properties.specification.wallMaterial] ||
                          'Не указано'}
                      </Body>
                    </PropertyValue>
                  </Property>
                  <Property xs={4}>
                    <PropertyTitle>Кондиционирование</PropertyTitle>
                    <PropertyValue>
                      <Body>
                        {conditions[properties.specification.condition] ||
                          'Не указано'}
                      </Body>
                    </PropertyValue>
                  </Property>
                  <Property xs={4}>
                    <PropertyTitle>Год постройки</PropertyTitle>
                    <PropertyValue>
                      <Body>
                        {properties.specification.builtYear || 'Не указано'}
                      </Body>
                    </PropertyValue>
                  </Property>
                  <Property xs={4}>
                    <PropertyTitle>Крыша</PropertyTitle>
                    <PropertyValue>
                      <Body>
                        {roofMaterials[properties.specification.roofMaterial] ||
                          'Не указано'}
                      </Body>
                    </PropertyValue>
                  </Property>
                  <Property xs={4}>
                    <PropertyTitle>Вентиляция</PropertyTitle>
                    <PropertyValue>
                      <Body>
                        {properties.specification.withVentilation
                          ? 'Есть'
                          : 'Отсутствует'}
                      </Body>
                    </PropertyValue>
                  </Property>
                  <Col xs={12}>
                    <EditButton onClick={enableEditMode}>
                      Редактировать
                    </EditButton>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Separator big />
            <Row>
              <Property xs={3}>
                <PropertyBigValue>Коммуникации</PropertyBigValue>
              </Property>
              <Col xs={9}>
                <Row>
                  <Property xs={6}>
                    <PropertyTitle>Электричество</PropertyTitle>
                    <PropertyValue>
                      <Body>
                        {properties.communication.powerSupply || 'Не указано'}{' '}
                        кВт
                      </Body>
                    </PropertyValue>
                  </Property>
                  <Property xs={6}>
                    <PropertyTitle>Водоснабжение</PropertyTitle>
                    <PropertyValue>
                      <Body>
                        {waterSupply[properties.communication.waterSupply] ||
                          'Не указано'}
                      </Body>
                    </PropertyValue>
                  </Property>
                  <Property xs={6}>
                    <PropertyTitle>Газ</PropertyTitle>
                    <PropertyValue>
                      <Body>
                        {gasSupply[properties.communication.gasSupply] ||
                          'Не указано'}
                      </Body>
                    </PropertyValue>
                  </Property>
                  <Property xs={6}>
                    <PropertyTitle>Канализация</PropertyTitle>
                    <PropertyValue>
                      <Body>
                        {sewerageSupply[
                          properties.communication.sewerageSupply
                        ] || 'Не указано'}
                      </Body>
                    </PropertyValue>
                  </Property>
                  <Col xs={12}>
                    <EditButton onClick={enableEditMode}>
                      Редактировать
                    </EditButton>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Separator big />
            {properties.specification.layouts && (
              <>
                <Row>
                  <Property xs={12}>
                    <PropertyBigValue>Планировка</PropertyBigValue>
                  </Property>
                </Row>
                <PropertyOptionWrapper>
                  {propertyOptions.map(propertyOptionItem => (
                    <PropertyOption xs={4}>
                      <PropertyOptionIcon src={propertyOptionIcon} />
                      <PropertyValue>
                        <Body>
                          {mainLayouts[propertyOptionItem]}{' '}
                          {properties.specification.layouts[
                            propertyOptionItem
                          ] > 1 &&
                            `(${
                              properties.specification.layouts[
                                propertyOptionItem
                              ]
                            })`}
                        </Body>
                      </PropertyValue>
                    </PropertyOption>
                  ))}
                </PropertyOptionWrapper>
              </>
            )}
            <Row>
              <Col xs={12}>
                <EditButton onClick={enableEditMode}>Редактировать</EditButton>
              </Col>
            </Row>
            <Separator big />
            <Row>
              <Col xs={12}>
                <SubTitle>Участок</SubTitle>
              </Col>
            </Row>
            <Row>
              <Property xs={5}>
                <PropertyTitle>Площадь</PropertyTitle>
                <PropertyValue>
                  <Body>
                    {properties.landDetails.area || 'Не указано'} сот.
                  </Body>
                </PropertyValue>
              </Property>
              <Property xs={5}>
                <PropertyTitle>Тип участка</PropertyTitle>
                <PropertyValue>
                  {properties.landDetails.landscapeKind &&
                    properties.landDetails.landscapeKind.map(
                      (landscapeKindIte, index) => (
                        <Body>
                          {index > 0 && ','}
                          {
                            landscapeKinds[
                              properties.landDetails.landscapeKind[index]
                            ]
                          }
                        </Body>
                      ),
                    )}
                </PropertyValue>
              </Property>
            </Row>
            <Row>
              <Col xs={12}>
                <EditButton onClick={enableEditMode}>Редактировать</EditButton>
              </Col>
            </Row>
            <Separator big />
            <Row>
              <Property xs={3}>
                <PropertyBigValue>Парковка</PropertyBigValue>
              </Property>
              <Col xs={9}>
                <Row>
                  <Property xs={6}>
                    <PropertyTitle>Машиномест в гараже</PropertyTitle>
                    <PropertyValue>
                      <Body>
                        {properties.additionalDetails.garageArea ||
                          'Не указано'}
                      </Body>
                    </PropertyValue>
                  </Property>
                  <Property xs={6}>
                    <PropertyTitle>Машиномест на парковке</PropertyTitle>
                    <PropertyValue>
                      <Body>
                        {properties.additionalDetails.parkingArea ||
                          'Не указано'}
                      </Body>
                    </PropertyValue>
                  </Property>
                  <Col xs={12}>
                    <EditButton onClick={enableEditMode}>
                      Редактировать
                    </EditButton>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Separator big />
            <Row>
              <Col xs={12}>
                <SubTitle>Расположение</SubTitle>
              </Col>
            </Row>
            <Row>
              <Property xs={4}>
                <PropertyTitle>Населенный пункт</PropertyTitle>
                <PropertyBigValue>
                  {properties.location.localityName}
                </PropertyBigValue>
              </Property>
              {properties.location.settlementName && (
                <Property xs={5}>
                  <PropertyTitle>Поселок</PropertyTitle>
                  <PropertyBigValue>
                    {properties.location.settlementName}
                  </PropertyBigValue>
                </Property>
              )}
              <Property xs={3}>
                <PropertyTitle>Шоссе</PropertyTitle>
                <PropertyBigValue>
                  {properties.location.routeName}
                </PropertyBigValue>
                <PropertyValue>
                  <BodyBold>От МКАД:&nbsp;</BodyBold>
                  <Body>{properties.location.mkadDistance} км</Body>
                </PropertyValue>
              </Property>
            </Row>
            <Separator big />
            <Row>
              <Property xs={4}>
                <PropertyTitle>Улица</PropertyTitle>
                <BodyBig>{properties.location.street || 'Не указано'}</BodyBig>
              </Property>
              <Property xs={5}>
                <PropertyTitle>Номер участка</PropertyTitle>
                <BodyBig>
                  {properties.location.latitude},{' '}
                  {properties.location.longitude}
                </BodyBig>
              </Property>
              {properties.location.cadastralNumber && (
                <Property xs={3}>
                  <PropertyTitle>Кадастровый номер</PropertyTitle>
                  <BodyBig>{properties.location.routeName}</BodyBig>
                </Property>
              )}
            </Row>
            <Row>
              <MapWrapper xs={12}>
                <Map
                  width="100%"
                  height="325px"
                  center={[55.754734, 37.583314]}
                  zoom={10}
                >
                  <Marker
                    lat={properties.location.latitude}
                    lon={properties.location.longitude}
                  />
                </Map>
              </MapWrapper>
            </Row>
            <Row>
              <Col xs={12}>
                <EditButton onClick={enableEditMode}>Редактировать</EditButton>
              </Col>
            </Row>
          </Layout>
        </Grid>
      </>
    );
  }
}

const mapStateToProps = state => ({
  properties: state.properties,
});

const mapDispatchToProps = dispatch => ({
  getProperty: id => dispatch(actions.getProperty(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ObjectInfo);
