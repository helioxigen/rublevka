import React from 'react';
import styled from 'styled-components';
import Helmet from 'react-helmet';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { Map, Marker } from 'yandex-map-react';
import pointIcon from './img/point-icon.svg';
import addPhotoIcon from './img/add-photo-icon.svg';
import propertyOptionIcon from './img/property-option-icon.svg';
import example from './img/example1.png';
import {
  Title,
  Title2,
  BodyBig,
  BodyBold,
  Body,
  Label,
  theme,
  Layout,
} from '../UI';

const MainTitle = styled(Title)`
  margin-bottom: 10px;
`;

const SubTitle = styled(Title)`
  margin-bottom: 50px;
`;

const BodyBigGray = styled(BodyBig)`
  color: ${theme.gray};
`;

const BodyBigBlue = styled(BodyBig)`
  color: ${theme.blue};
`;

const PropertyTitle = styled(Label)`
  margin-bottom: 15.5px;
`;

const PropertyBigValue = styled(Title2)`
  margin-bottom: 23.5px;
`;

const PropertyValue = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: start;
`;

const Property = styled(Col)`
  margin-bottom: 45.5px;
`;

const PropertyOption = styled(Col)`
  margin-bottom: 30px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: start;
  align-items: center;
`;

const PropertyOptionIcon = styled.img`
  width: 18px;
  height: 18px;
  display: block;
  margin-right: 10px;
  margin-top: -3px;
`;

const PropertyOptionWrapper = styled(Row)`
  margin-bottom: 15.5px;
`;

const SeparatorLine = styled(Col)`
  height: 1px;
  width: 100%;
  background-color: ${theme.alto};
  margin-bottom: ${props => (props.big ? '66px' : '35px')};
`;

const PointIcon = styled.img`
  width: 13px;
  height: 17px;
  display: block;
  margin-right: 10px;
`;

const TitleAddress = styled(Col)`
  margin-bottom: 26px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: start;
  align-items: center;
`;

const PhotoExampleContainer = styled(Col)`
  margin-bottom: 25px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
`;

const PhotoExampleWrapper = styled.div`
  position: relative;
  max-width: 33.333333%;
`;

const PhotoCloseButton = styled.div`
  position: absolute;
  width: 28px;
  height: 28px;
  border-radius: 14px;
  display: block;
  top: 10px;
  left: 10px;
  background-color: ${theme.blue};
  cursor: pointer;

  &:after,
  &:before {
    content: '';
    display: block;
    position: absolute;
    background-color: #fff;
    height: 10.5px;
    width: 2px;
    left: 13px;
    top: 8px;
  }

  &:after {
    transform: rotate(45deg);
  }

  &:before {
    transform: rotate(-45deg);
  }
`;

const PhotoExample = styled.img`
  width: 100%;
  height: auto;
  display: block;
`;

const EditButton = styled(BodyBigBlue)`
  margin-bottom: 45px;
  cursor: pointer;
`;
const PhotoEditTools = styled(Col)`
  margin-bottom: 60px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: start;
`;

const PhotoEditTool = styled(BodyBigBlue)`
  margin-right: 70px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: start;
  align-items: center;

  &:last-child {
    margin-right: 0;
  }
  cursor: pointer;
`;

const AddPhotoIcon = styled.img`
  width: 17px;
  height: 17px;
  display: block;
  margin-left: 9px;
`;

const MapWrapper = styled(Col)`
  margin-bottom: 25px;
`;

const ObjectInfoPage = () => (
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
          <BodyBigGray>Ильинское ш., 9 км. от МКАД</BodyBigGray>
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
          <PhotoEditTool>Редактировать</PhotoEditTool>
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
          <EditButton>Редактировать</EditButton>
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
          <EditButton>Редактировать</EditButton>
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
              <EditButton>Редактировать</EditButton>
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
              <EditButton>Редактировать</EditButton>
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
              <EditButton>Редактировать</EditButton>
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
          <EditButton>Редактировать</EditButton>
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
          <EditButton>Редактировать</EditButton>
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
              <EditButton>Редактировать</EditButton>
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
          <EditButton>Редактировать</EditButton>
        </Col>
      </Row>
    </Layout>
  </Grid>
);

const Separator = ({ big = false }) => (
  <Col>
    <SeparatorLine xs={12} big={big ? 1 : 0} />
  </Col>
);

export default ObjectInfoPage;
