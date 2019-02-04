import { Col, Grid, Row } from 'react-flexbox-grid';
import { Formik } from 'formik';
import React from 'react';
import Dropzone from 'react-dropzone';
import Helmet from 'react-helmet';
import { Layout } from '../../UI';
import Select from '../../UI/Select';
import Switcher from '../../UI/Switcher';
import SelectBubble from '../../UI/SelectBubble';
import SelectEmotion from '../../UI/SelectEmotion';
import {
  MainSelectTitle,
  MainStatusBar,
  DropdownTitle,
  Dropdown,
  DropdownContainer,
  DropdownIcon,
  DropdownButton,
  DropdownAnnotation,
  EditPropertyRow,
  SubTitle,
  EditPropertyInput,
  PropertyTitle,
  Separator,
  PropertySubTitle,
  PropertyBigValue,
  PlotInputContainer,
  PlotLocationInput,
  PlotLocationInfo,
  SearchIcon,
  PlotInput,
} from './style';
import {
  selectTypeData,
  selectStatusData,
  selectСommissionData,
  selectDealData,
  selectBinaryData,
  selectMonthData,
  selectRentTimeData,
  selectFixedValueData,
  selectBinaryExistData,
  selectFurnitureData,
  selectFinishData,
  selectWallData,
  selectRoogData,
  selectGasData,
  selectSewageData,
  selectSewageWaterSupply,
  selectPlotData,
  selectTreesData,
  selectReliefData,
} from './schema';
import dropdownPhotoIcon from './img/dropdown-photo-icon.svg';
import searchIcon from './img/search-icon.svg';

class ObjectEdit extends React.PureComponent {
  componentDidMount() {
    document.addEventListener('keydown', this.handleEscKey, false);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleEscKey, false);
  }

  handleEscKey = event => {
    const { disableEditMode } = this.props;
    if (event.keyCode === 27) {
      disableEditMode();
    }
  };

  render() {
    const { type, status, yes } = this.props;
    return (
      <Grid>
        <Helmet>
          <title>Дом &quot;Архангельское-2&quot;</title>
        </Helmet>
        <Layout>
          <Formik>
            <>
              <Row>
                <Col xs={4}>
                  <MainSelectTitle>Тип</MainSelectTitle>
                </Col>
                <Col xsOffset={1} xs={7}>
                  <MainSelectTitle>Статус</MainSelectTitle>
                </Col>
              </Row>
              <MainStatusBar>
                <Col xs={4}>
                  <Select selectData={selectTypeData} selected={type} />
                </Col>
                <Col xsOffset={1} xs={7}>
                  <Select selectData={selectStatusData} selected={status} />
                </Col>
              </MainStatusBar>
              <Row>
                <Col xs={12}>
                  <DropdownTitle>Фотографии</DropdownTitle>
                </Col>
              </Row>
              <Dropdown>
                <Col xs={12}>
                  <Dropzone accept="image/*">
                    {({ getRootProps, getInputProps }) => (
                      <DropdownContainer {...getRootProps()}>
                        <input {...getInputProps()} />
                        <Row center="xs">
                          <DropdownIcon src={dropdownPhotoIcon} />
                        </Row>
                        <Row center="xs">
                          <DropdownButton>Выбрать фотографии</DropdownButton>
                        </Row>
                        <Row center="xs">
                          <DropdownAnnotation>
                            Или перетащите сюда
                          </DropdownAnnotation>
                        </Row>
                      </DropdownContainer>
                    )}
                  </Dropzone>
                </Col>
              </Dropdown>
              <EditPropertyRow>
                <Col xs={2}>
                  <SubTitle>Продажа</SubTitle>
                </Col>
                <Col xsOffset={1} xs={2}>
                  <EditPropertyInput placeholder="Цена, Руб" />
                  <Switcher selected={2} />
                </Col>
                <Col xsOffset={1} xs={3}>
                  <PropertyTitle>Сделка</PropertyTitle>
                  <SelectBubble selected={3} selectData={selectDealData} />
                  <PropertyTitle>Комиссия</PropertyTitle>
                  <Select
                    selectData={selectСommissionData}
                    selected={yes}
                    filled
                  />
                  <EditPropertyInput placeholder="Процент, %" />
                </Col>
                <Col xsOffset={1} xs={2}>
                  <PropertyTitle>Рассрочка</PropertyTitle>
                  <Select selectData={selectBinaryData} selected={yes} filled />
                  <PropertyTitle>Ипотека</PropertyTitle>
                  <Select selectData={selectBinaryData} selected={yes} filled />
                  <PropertyTitle>Торг</PropertyTitle>
                  <Select selectData={selectBinaryData} selected={yes} filled />
                </Col>
              </EditPropertyRow>
              <Separator big />
              <EditPropertyRow>
                <Col xs={2}>
                  <SubTitle>Аренда</SubTitle>
                </Col>
                <Col xsOffset={1} xs={2}>
                  <EditPropertyInput placeholder="Цена, Руб" />
                  <Switcher selected={2} />
                </Col>
                <Col xsOffset={1} xs={3}>
                  <PropertyTitle>
                    Залог
                    <PropertySubTitle>Опционально</PropertySubTitle>
                  </PropertyTitle>
                  <SelectBubble
                    selected={1}
                    unselectable
                    selectData={selectMonthData}
                  />
                  <PropertyTitle>Период аренды</PropertyTitle>
                  <Select
                    selectData={selectRentTimeData}
                    selected={yes}
                    filled
                  />
                  <PropertyTitle>Комиссия</PropertyTitle>
                  <Select
                    selectData={selectСommissionData}
                    selected={yes}
                    filled
                  />
                  <EditPropertyInput placeholder="Сумма, $" />
                  <Switcher selected={2} />
                </Col>
                <Col xsOffset={1} xs={2}>
                  <PropertyTitle>С детьми</PropertyTitle>
                  <Select selectData={selectBinaryData} selected={yes} filled />
                  <PropertyTitle>С животными</PropertyTitle>
                  <Select selectData={selectBinaryData} selected={yes} filled />
                </Col>
              </EditPropertyRow>
              <Separator big />
              <EditPropertyRow>
                <Col xs={2}>
                  <SubTitle>Дом</SubTitle>
                </Col>
                <Col xsOffset={1} xs={2}>
                  <PropertyTitle>Площадь дома</PropertyTitle>
                  <EditPropertyInput placeholder="Площадь, м" />
                  <PropertyTitle>Высота потолков</PropertyTitle>
                  <EditPropertyInput placeholder="Высота, м" />
                  <PropertyTitle>Комнат</PropertyTitle>
                  <EditPropertyInput placeholder="Комнат, шт." />
                  <PropertyTitle>Спален</PropertyTitle>
                  <EditPropertyInput placeholder="Спален, шт." />
                </Col>
                <Col xsOffset={1} xs={3}>
                  <PropertyTitle>Лоджий</PropertyTitle>
                  <Select
                    selectData={selectFixedValueData}
                    selected={0}
                    filled
                  />
                  <PropertyTitle>Балконов</PropertyTitle>
                  <Select
                    selectData={selectFixedValueData}
                    selected={0}
                    filled
                  />
                  <PropertyTitle>Ванных</PropertyTitle>
                  <Select
                    selectData={selectFixedValueData}
                    selected={0}
                    filled
                  />
                  <PropertyTitle>Санузлов</PropertyTitle>
                  <Select
                    selectData={selectFixedValueData}
                    selected={0}
                    filled
                  />
                </Col>
                <Col xsOffset={1} xs={2}>
                  <PropertyTitle>Лифт</PropertyTitle>
                  <Select
                    selectData={selectBinaryExistData}
                    selected={yes}
                    filled
                  />
                </Col>
              </EditPropertyRow>
              <Separator big />
              <EditPropertyRow>
                <Col xs={2}>
                  <PropertyBigValue>Состояние</PropertyBigValue>
                </Col>
                <Col xsOffset={1} xs={9}>
                  <PropertyTitle>Мебель</PropertyTitle>
                  <Select
                    selectData={selectFurnitureData}
                    selected={0}
                    filled
                  />
                  <PropertyTitle>Отделка</PropertyTitle>
                  <Select selectData={selectFinishData} selected={0} filled />
                  <PropertyTitle>Состояние</PropertyTitle>
                  <Select selectData={selectFinishData} selected={0} filled />
                  <SelectEmotion selected="good" />
                </Col>
              </EditPropertyRow>
              <Separator big />
              <EditPropertyRow>
                <Col xs={2}>
                  <PropertyBigValue>Конструктив</PropertyBigValue>
                </Col>
                <Col xsOffset={1} xs={2}>
                  <PropertyTitle>Год постройки</PropertyTitle>
                  <EditPropertyInput placeholder="Год" />
                </Col>
                <Col xsOffset={1} xs={3}>
                  <PropertyTitle>Стены</PropertyTitle>
                  <SelectBubble selected={1} selectData={selectWallData} />
                  <PropertyTitle>Крыша</PropertyTitle>
                  <SelectBubble selected={1} selectData={selectRoogData} />
                </Col>
                <Col xsOffset={1} xs={2}>
                  <PropertyTitle>Кондиционирование</PropertyTitle>
                  <Select selectData={selectBinaryData} selected={yes} filled />
                  <PropertyTitle>Вентиляция</PropertyTitle>
                  <Select selectData={selectBinaryData} selected={yes} filled />
                </Col>
              </EditPropertyRow>
              <Separator big />
              <EditPropertyRow>
                <Col xs={2}>
                  <PropertyBigValue>Коммуникации</PropertyBigValue>
                </Col>
                <Col xsOffset={1} xs={2}>
                  <PropertyTitle>Электричество</PropertyTitle>
                  <EditPropertyInput placeholder="Электр-во,кВт" />
                </Col>
                <Col xsOffset={1} xs={6}>
                  <PropertyTitle>
                    Газ <PropertySubTitle>Опционально</PropertySubTitle>
                  </PropertyTitle>
                  <SelectBubble
                    selected={1}
                    unselectable
                    selectData={selectGasData}
                  />
                  <PropertyTitle>Канализация</PropertyTitle>
                  <Select selectData={selectSewageData} selected={1} filled />
                  <PropertyTitle>Водоснабжение</PropertyTitle>
                  <Select
                    selectData={selectSewageWaterSupply}
                    selected={1}
                    filled
                  />
                </Col>
              </EditPropertyRow>
              <Separator big />
              <EditPropertyRow>
                <Col xs={2}>
                  <PropertyBigValue>Планировка</PropertyBigValue>
                </Col>
                <Col xsOffset={1} xs={2}>
                  <PropertyTitle>Гостиных</PropertyTitle>
                  <Select
                    selectData={selectFixedValueData}
                    selected={0}
                    filled
                  />
                  <PropertyTitle>Кабинетов</PropertyTitle>
                  <Select
                    selectData={selectFixedValueData}
                    selected={0}
                    filled
                  />
                  <PropertyTitle>Игровых</PropertyTitle>
                  <Select
                    selectData={selectFixedValueData}
                    selected={0}
                    filled
                  />
                  <PropertyTitle>Мансард</PropertyTitle>
                  <Select
                    selectData={selectFixedValueData}
                    selected={0}
                    filled
                  />
                </Col>
                <Col xsOffset={1} xs={2}>
                  <PropertyTitle>Технических помещений</PropertyTitle>
                  <Select
                    selectData={selectFixedValueData}
                    selected={0}
                    filled
                  />
                  <PropertyTitle>Хозяйственных помещений</PropertyTitle>
                  <Select
                    selectData={selectFixedValueData}
                    selected={0}
                    filled
                  />
                  <PropertyTitle>Кухонь</PropertyTitle>
                  <Select
                    selectData={selectFixedValueData}
                    selected={0}
                    filled
                  />
                  <PropertyTitle>СПА-зон</PropertyTitle>
                  <Select
                    selectData={selectFixedValueData}
                    selected={0}
                    filled
                  />
                </Col>
                <Col xsOffset={1} xs={2}>
                  <PropertyTitle>Столовых</PropertyTitle>
                  <Select
                    selectData={selectFixedValueData}
                    selected={0}
                    filled
                  />
                  <PropertyTitle>Гардеробных</PropertyTitle>
                  <Select
                    selectData={selectFixedValueData}
                    selected={0}
                    filled
                  />
                </Col>
              </EditPropertyRow>
              <Separator big />
              <EditPropertyRow>
                <Col xs={2}>
                  <SubTitle>Участок</SubTitle>
                </Col>
                <Col xsOffset={1} xs={2}>
                  <PropertyTitle>Площадь</PropertyTitle>
                  <EditPropertyInput placeholder="Площадь, сот." />
                </Col>
                <Col xsOffset={1} xs={6}>
                  <PropertyTitle>Участок</PropertyTitle>
                  <SelectBubble selected={1} selectData={selectPlotData} />
                  <PropertyTitle>Деревья</PropertyTitle>
                  <SelectBubble selected={1} selectData={selectTreesData} />
                  <PropertyTitle>Рельеф</PropertyTitle>
                  <SelectBubble selected={1} selectData={selectReliefData} />
                </Col>
              </EditPropertyRow>
              <Separator big />
              <EditPropertyRow>
                <Col xs={2}>
                  <PropertyBigValue>Парковка</PropertyBigValue>
                </Col>
                <Col xsOffset={1} xs={9}>
                  <PropertyTitle>Машиномест в гараже</PropertyTitle>
                  <Select
                    selectData={selectFixedValueData}
                    selected={0}
                    filled
                  />
                  <PropertyTitle>Машиномест в гараже</PropertyTitle>
                  <Select
                    selectData={selectFixedValueData}
                    selected={0}
                    filled
                  />
                </Col>
              </EditPropertyRow>
              <Separator big />
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
                      <PlotLocationInput placeholder="Улица" />
                    </Col>
                    <Col xsOffset={1} xs={3}>
                      <PropertyTitle>Поселок</PropertyTitle>
                      <PlotLocationInfo>&mdash;</PlotLocationInfo>
                      <PlotLocationInput placeholder="Номер участка" />
                    </Col>
                    <Col xsOffset={1} xs={4}>
                      <PropertyTitle>Шоссе</PropertyTitle>
                      <PlotLocationInfo>&mdash;</PlotLocationInfo>
                      <PlotLocationInput placeholder="Кадастровый номер" />
                    </Col>
                  </Row>
                </Col>
              </EditPropertyRow>
            </>
          </Formik>
        </Layout>
      </Grid>
    );
  }
}

export default ObjectEdit;
