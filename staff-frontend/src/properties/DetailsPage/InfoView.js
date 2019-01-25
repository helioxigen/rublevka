import { Col, Grid, Row } from 'react-flexbox-grid';
import { Map, Marker } from 'yandex-map-react';
import React from 'react';
import Helmet from 'react-helmet';
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

const InfoView = ({ enableEditMode }) => (
  <>
    <Grid>
      <Helmet>
        <title>Дом &quot;Архангельское-2&quot;</title>
      </Helmet>
      <Layout>
        <Row>
          <Col xs={12}>
            <MainTitle>Продажа дома в «Архангельское-2»</MainTitle>
          </Col>
        </Row>
        <Row>
          <TitleAddress xs={12}>
            <PointIcon src={pointIcon} />
            <BodyBig>Ильинское ш., 9 км. от МКАД</BodyBig>
          </TitleAddress>
        </Row>
        <Separator />
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
            <PropertyBigValue>$1 450 000</PropertyBigValue>
            <PropertyValue>
              <BodyBold>Стоимость за м :&nbsp;</BodyBold>
              <Body>$3 625</Body>
            </PropertyValue>
          </Property>
          <Property xs={4}>
            <PropertyTitle>Комиссия</PropertyTitle>
            <PropertyBigValue>4,0 %</PropertyBigValue>
            <PropertyValue>
              <BodyBold>Полная комиссия:&nbsp;</BodyBold>
              <Body>$58 000</Body>
            </PropertyValue>
          </Property>
          <Property xs={4}>
            <PropertyTitle>Стоимость</PropertyTitle>
            <PropertyBigValue>Актуален</PropertyBigValue>
          </Property>
        </Row>
        <Separator big />
        <Row>
          <Property xs={4}>
            <PropertyTitle>Тип продажи</PropertyTitle>
            <PropertyValue>
              <Body>Свободная продажа</Body>
            </PropertyValue>
          </Property>
          <Property xs={4}>
            <PropertyTitle>Ипотека</PropertyTitle>
            <PropertyValue>
              <Body>Невозможна</Body>
            </PropertyValue>
          </Property>
          <Property xs={4}>
            <PropertyTitle>Закрытая продажа</PropertyTitle>
            <PropertyValue>
              <Body>Нет</Body>
            </PropertyValue>
          </Property>
          <Property xs={4}>
            <PropertyTitle>Статус продажи</PropertyTitle>
            <PropertyValue>
              <Body>Вторичная продажа</Body>
            </PropertyValue>
          </Property>
          <Property xs={4}>
            <PropertyTitle>Рассрочка</PropertyTitle>
            <PropertyValue>
              <Body>Невозможна</Body>
            </PropertyValue>
          </Property>
          <Property xs={4}>
            <PropertyTitle>Показывать на сайте</PropertyTitle>
            <PropertyValue>
              <Body>Да</Body>
            </PropertyValue>
          </Property>
          <Property xs={4}>
            <PropertyTitle>Торг</PropertyTitle>
            <PropertyValue>
              <Body>Отсутствует</Body>
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
              <Body>400,00 м</Body>
            </PropertyValue>
          </Property>
          <Property xs={3}>
            <PropertyTitle>Спален</PropertyTitle>
            <PropertyValue>
              <Body>4</Body>
            </PropertyValue>
          </Property>
          <Property xs={3}>
            <PropertyTitle>Лоджий</PropertyTitle>
            <PropertyValue>
              <Body>Не указано</Body>
            </PropertyValue>
          </Property>
          <Property xs={3}>
            <PropertyTitle>Высота потолков</PropertyTitle>
            <PropertyValue>
              <Body>Не указано</Body>
            </PropertyValue>
          </Property>
          <Property xs={3}>
            <PropertyTitle>Комнат</PropertyTitle>
            <PropertyValue>
              <Body>1</Body>
            </PropertyValue>
          </Property>
          <Property xs={3}>
            <PropertyTitle>Ванных</PropertyTitle>
            <PropertyValue>
              <Body>Не указано</Body>
            </PropertyValue>
          </Property>
          <Property xs={3}>
            <PropertyTitle>Балконов</PropertyTitle>
            <PropertyValue>
              <Body>Не указано</Body>
            </PropertyValue>
          </Property>
          <Property xs={3}>
            <PropertyTitle>Санузлов</PropertyTitle>
            <PropertyValue>
              <Body>Не указано</Body>
            </PropertyValue>
          </Property>
          <Property xs={3}>
            <PropertyTitle>Лифт</PropertyTitle>
            <PropertyValue>
              <Body>Нет</Body>
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
                  <Body>Под ключ</Body>
                </PropertyValue>
              </Property>
              <Property xs={4}>
                <PropertyTitle>Мебель</PropertyTitle>
                <PropertyValue>
                  <Body>Частично с мебелью</Body>
                </PropertyValue>
              </Property>
              <Property xs={4}>
                <PropertyTitle>Состояние</PropertyTitle>
                <PropertyValue>
                  <Body>Отличное</Body>
                </PropertyValue>
              </Property>
              <Col xs={12}>
                <EditButton onClick={enableEditMode}>Редактировать</EditButton>
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
                  <Body>Блоки</Body>
                </PropertyValue>
              </Property>
              <Property xs={4}>
                <PropertyTitle>Кондиционирование</PropertyTitle>
                <PropertyValue>
                  <Body>Отсутствует</Body>
                </PropertyValue>
              </Property>
              <Property xs={4}>
                <PropertyTitle>Год постройки</PropertyTitle>
                <PropertyValue>
                  <Body>2018</Body>
                </PropertyValue>
              </Property>
              <Property xs={4}>
                <PropertyTitle>Крыша</PropertyTitle>
                <PropertyValue>
                  <Body>Эксплуатируемая кровля</Body>
                </PropertyValue>
              </Property>
              <Property xs={4}>
                <PropertyTitle>Вентиляция</PropertyTitle>
                <PropertyValue>
                  <Body>Отсутствует</Body>
                </PropertyValue>
              </Property>
              <Col xs={12}>
                <EditButton onClick={enableEditMode}>Редактировать</EditButton>
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
                  <Body>15,00 кВт</Body>
                </PropertyValue>
              </Property>
              <Property xs={6}>
                <PropertyTitle>Водоснабжение</PropertyTitle>
                <PropertyValue>
                  <Body>Магистральный водопровод</Body>
                </PropertyValue>
              </Property>
              <Property xs={6}>
                <PropertyTitle>Газ</PropertyTitle>
                <PropertyValue>
                  <Body>Магистральный</Body>
                </PropertyValue>
              </Property>
              <Property xs={6}>
                <PropertyTitle>Канализация</PropertyTitle>
                <PropertyValue>
                  <Body>Магистральный</Body>
                </PropertyValue>
              </Property>
              <Col xs={12}>
                <EditButton onClick={enableEditMode}>Редактировать</EditButton>
              </Col>
            </Row>
          </Col>
        </Row>
        <Separator big />
        <Row>
          <Property xs={12}>
            <PropertyBigValue>Планировка</PropertyBigValue>
          </Property>
        </Row>
        <PropertyOptionWrapper>
          <PropertyOption xs={4}>
            <PropertyOptionIcon src={propertyOptionIcon} />
            <PropertyValue>
              <Body>Гостиная</Body>
            </PropertyValue>
          </PropertyOption>
          <PropertyOption xs={4}>
            <PropertyOptionIcon src={propertyOptionIcon} />
            <PropertyValue>
              <Body>Игровая</Body>
            </PropertyValue>
          </PropertyOption>
          <PropertyOption xs={4}>
            <PropertyOptionIcon src={propertyOptionIcon} />
            <PropertyValue>
              <Body>Гардеробная (2)</Body>
            </PropertyValue>
          </PropertyOption>
          <PropertyOption xs={4}>
            <PropertyOptionIcon src={propertyOptionIcon} />
            <PropertyValue>
              <Body>Кабинет (2)</Body>
            </PropertyValue>
          </PropertyOption>
          <PropertyOption xs={4}>
            <PropertyOptionIcon src={propertyOptionIcon} />
            <PropertyValue>
              <Body>Кухня</Body>
            </PropertyValue>
          </PropertyOption>
          <PropertyOption xs={4}>
            <PropertyOptionIcon src={propertyOptionIcon} />
            <PropertyValue>
              <Body>Столовая</Body>
            </PropertyValue>
          </PropertyOption>
        </PropertyOptionWrapper>
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
              <Body>16,00 сот.</Body>
            </PropertyValue>
          </Property>
          <Property xs={7}>
            <PropertyTitle>Деревья</PropertyTitle>
            <PropertyValue>
              <Body>Не указано</Body>
            </PropertyValue>
          </Property>
          <Property xs={5}>
            <PropertyTitle>Тип участка</PropertyTitle>
            <PropertyValue>
              <Body>Прилесной</Body>
            </PropertyValue>
          </Property>
          <Property xs={7}>
            <PropertyTitle>Рельеф</PropertyTitle>
            <PropertyValue>
              <Body>Не указано</Body>
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
                  <Body>Не указано</Body>
                </PropertyValue>
              </Property>
              <Property xs={6}>
                <PropertyTitle>Машиномест на парковке</PropertyTitle>
                <PropertyValue>
                  <Body>Не указано</Body>
                </PropertyValue>
              </Property>
              <Col xs={12}>
                <EditButton onClick={enableEditMode}>Редактировать</EditButton>
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
            <PropertyBigValue>Глухово</PropertyBigValue>
          </Property>
          <Property xs={5}>
            <PropertyTitle>Поселок</PropertyTitle>
            <PropertyBigValue>Архангельское-2</PropertyBigValue>
          </Property>
          <Property xs={3}>
            <PropertyTitle>Шоссе</PropertyTitle>
            <PropertyBigValue>Ильинское</PropertyBigValue>
            <PropertyValue>
              <BodyBold>От МКАД:&nbsp;</BodyBold>
              <Body>9 км</Body>
            </PropertyValue>
          </Property>
        </Row>
        <Separator big />
        <Row>
          <Property xs={4}>
            <PropertyTitle>Улица</PropertyTitle>
            <BodyBig>50:11:0050506:2091</BodyBig>
          </Property>
          <Property xs={5}>
            <PropertyTitle>Поселок</PropertyTitle>
            <BodyBig>50:11:0050506:2091, 50:11:0050506:2088</BodyBig>
          </Property>
          <Property xs={3}>
            <PropertyTitle>Шоссе</PropertyTitle>
            <BodyBig>Не указано</BodyBig>
          </Property>
        </Row>
        <Row>
          <MapWrapper xs={12}>
            <Map
              width="100%"
              height="325px"
              center={[55.754734, 37.583314]}
              zoom={10}
            >
              <Marker lat={55.783379} lon={37.775575} />
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

export default InfoView;
