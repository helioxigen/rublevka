import React, { Component } from 'react';

import * as options from 'cem/constants/properties/options';
import * as dict from 'cem/constants/properties/dictionaries';
import { fetchResource } from 'cem/helpers/autocomplete';

import UI from 'cem/components/ui';
const {
  Form,
  Button,
  Daypicker,
  Heading,
  PriceInput,
  Icon,
  AsyncSelect,
  Select,
  SortingDropdown,
  Grid: { Row, Col },
  Form: { Group, Input, Label },
} = UI;

import cn from 'classnames';
import s from 'cem/styles/components/header';
import sUtils from 'cem/styles/utils';
import sButton from 'cem/styles/buttons';
import sDaypicker from 'cem/styles/ui/daypicker';

const dealTypes = [
  { value: `sale`, label: `Продажа` },
  { value: `rent`, label: `Аренда` },
];

class FilterExtended extends Component {
  render() {
    const { filters, updateFilter, updateFromInput } = this.props;
    const districtDependency = { routeId: filters[`location.routeId`] };
    const localityDependency = {
      routeId: filters[`location.routeId`],
      districtId: filters[`location.districtId`],
    };
    const settlementDependency = {
      'location.routeId': filters[`location.routeId`],
      'location.districtId': filters[`location.districtId`],
      'location.localityId': filters[`location.localityId`],
    };
    const isPriceFilterDisabled = !(
      filters.priceFilterCurrency && filters.dealType
    );

    return (
      <Row style={{ display: !this.props.isOpen && `none` }}>
        <Col md="18" mdOffset="1">
          <Row className={sUtils.pushedTop3}>
            <Col xs="20">
              <Heading size="sm">Цена</Heading>
            </Col>
          </Row>
          <Row>
            <Col sm="6" md="5" lg="3">
              <Group className={sUtils.pushedRight1}>
                <Label block>Валюта</Label>
                <Select
                  options={options.currencies}
                  labelKey="title"
                  valueKey="id"
                  value={filters.priceFilterCurrency}
                  onChange={value => updateFilter(`priceFilterCurrency`, value)}
                />
              </Group>
            </Col>
            <Col sm="6" md="5" lg="3">
              <Group float className={sUtils.pushedRight1}>
                <PriceInput
                  block
                  valueClassName="floatLabel"
                  placeholder="Цена от"
                  type="text"
                  value={filters.priceFilterFrom}
                  onChange={value => updateFilter(`priceFilterFrom`, value)}
                  disabled={isPriceFilterDisabled}
                />
                <Label>Цена от</Label>
              </Group>
            </Col>
            <Col sm="6" md="5" lg="3">
              <Group float>
                <PriceInput
                  block
                  valueClassName="floatLabel"
                  placeholder="Цена до"
                  type="text"
                  value={filters.priceFilterTo}
                  onChange={value => updateFilter(`priceFilterTo`, value)}
                  disabled={isPriceFilterDisabled}
                />
                <Label>Цена до</Label>
              </Group>
            </Col>
          </Row>

          <Row className={sUtils.pushedTop3}>
            <Col xs="20">
              <Heading size="sm">Расположение</Heading>
            </Col>
          </Row>
          <Row>
            <Col xs="20">
              <div className={sUtils.flexContainerWrap}>
                <Group
                  className={cn(sUtils.pushedRight1, sUtils.widthXs15Md18)}
                >
                  <Label block>Направление</Label>
                  <AsyncSelect
                    asyncOptions={fetchResource(`/v1/places/routes`, `name`)}
                    value={filters[`location.routeId`]}
                    onChange={value => updateFilter(`location.routeId`, value)}
                  />
                </Group>
                <Group
                  className={cn(sUtils.pushedRight1, sUtils.widthXs15Md18)}
                >
                  <Label block>Район</Label>
                  <AsyncSelect
                    asyncOptions={fetchResource(`/v1/places/districts`, `name`)}
                    value={filters[`location.districtId`]}
                    onChange={value =>
                      updateFilter(`location.districtId`, value)
                    }
                    linkedTo={districtDependency}
                  />
                </Group>
                <Group
                  className={cn(sUtils.pushedRight1, sUtils.widthXs15Md18)}
                >
                  <Label block>Нас. пункт</Label>
                  <AsyncSelect
                    asyncOptions={fetchResource(
                      `/v1/places/localities`,
                      `name`,
                    )}
                    value={filters[`location.localityId`]}
                    onChange={value =>
                      updateFilter(`location.localityId`, value)
                    }
                    linkedTo={localityDependency}
                  />
                </Group>
                <Group
                  className={cn(sUtils.pushedRight1, sUtils.widthXs15Md18)}
                >
                  <Label block>Поселок</Label>
                  <AsyncSelect
                    asyncOptions={fetchResource(
                      `/v1/places/settlements`,
                      `name`,
                    )}
                    value={filters[`location.settlementId`]}
                    onChange={value =>
                      updateFilter(`location.settlementId`, value)
                    }
                    linkedTo={settlementDependency}
                  />
                </Group>
                <Group
                  float
                  className={cn(sUtils.pushedRight1, sUtils.widthXs15Md18)}
                >
                  <Input
                    block
                    valueClassName="floatLabel"
                    placeholder="МКАД от"
                    type="text"
                    value={filters.mkadFrom}
                    onChange={event => updateFromInput(`mkadFrom`, event)}
                  />
                  <Label>МКАД от</Label>
                </Group>
                <Group
                  float
                  className={cn(sUtils.pushedRight1, sUtils.widthXs15Md18)}
                >
                  <Input
                    block
                    valueClassName="floatLabel"
                    placeholder="МКАД до"
                    type="text"
                    value={filters.mkadTo}
                    onChange={event => updateFromInput(`mkadTo`, event)}
                  />
                  <Label>МКАД до</Label>
                </Group>
                <Group float className={sUtils.widthXs15Md18}>
                  <Input
                    block
                    valueClassName="floatLabel"
                    placeholder="№ дома/участка"
                    type="text"
                    value={filters[`location.house`]}
                    onChange={event => updateFromInput(`location.house`, event)}
                  />
                  <Label>№ дома/участка</Label>
                </Group>
              </div>
            </Col>
          </Row>

          <Row className={sUtils.pushedTop3}>
            <Col xs="20">
              <Heading size="sm">Дом</Heading>
            </Col>
          </Row>
          <Row>
            <Col xs="20">
              <div className={sUtils.flexContainerWrap}>
                <Group
                  float
                  className={cn(sUtils.pushedRight1, sUtils.widthXs15Md18)}
                >
                  <Input
                    block
                    valueClassName="floatLabel"
                    placeholder="Год постройки от"
                    type="text"
                    value={filters.builtYearFrom}
                    onChange={event => updateFromInput(`builtYearFrom`, event)}
                  />
                  <Label block>Год постройки от</Label>
                </Group>
                <Group
                  float
                  className={cn(sUtils.pushedRight1, sUtils.widthXs15Md18)}
                >
                  <Input
                    block
                    valueClassName="floatLabel"
                    placeholder="Год постройки до"
                    type="text"
                    value={filters.builtYearTo}
                    onChange={event => updateFromInput(`builtYearTo`, event)}
                  />
                  <Label block>Год постройки до</Label>
                </Group>
                <Group
                  float
                  className={cn(sUtils.pushedRight1, sUtils.widthXs15Md18)}
                >
                  <Input
                    block
                    valueClassName="floatLabel"
                    placeholder="Площадь от"
                    type="text"
                    value={filters.livingAreaFrom}
                    onChange={event => updateFromInput(`areaFrom`, event)}
                  />
                  <Label>Площадь от</Label>
                </Group>
                <Group
                  float
                  className={cn(sUtils.pushedRight1, sUtils.widthXs15Md18)}
                >
                  <Input
                    block
                    valueClassName="floatLabel"
                    placeholder="Площадь до"
                    type="text"
                    value={filters.livingAreaTo}
                    onChange={event => updateFromInput(`areaTo`, event)}
                  />
                  <Label>Площадь до</Label>
                </Group>
                <Group
                  float
                  className={cn(sUtils.pushedRight1, sUtils.widthXs15Md18)}
                >
                  <Input
                    block
                    valueClassName="floatLabel"
                    placeholder="Спален от"
                    type="text"
                    value={filters.bedroomsFrom}
                    onChange={event => updateFromInput(`bedroomsFrom`, event)}
                  />
                  <Label>Спален от</Label>
                </Group>
                <Group
                  float
                  className={cn(sUtils.pushedRight1, sUtils.widthXs15Md18)}
                >
                  <Input
                    block
                    valueClassName="floatLabel"
                    placeholder="Спален до"
                    type="text"
                    value={filters.bedroomsTo}
                    onChange={event => updateFromInput(`bedroomsTo`, event)}
                  />
                  <Label>Спален до</Label>
                </Group>
                <Group
                  float
                  className={cn(sUtils.pushedRight1, sUtils.widthXs15Md18)}
                >
                  <Input
                    block
                    valueClassName="floatLabel"
                    placeholder="Уровней от"
                    type="text"
                    value={filters.levelsFrom}
                    onChange={event => updateFromInput(`levelsFrom`, event)}
                  />
                  <Label>Уровней от</Label>
                </Group>
                <Group float className={sUtils.widthXs15Md18}>
                  <Input
                    block
                    valueClassName="floatLabel"
                    placeholder="Уровней до"
                    type="text"
                    value={filters.levelsTo}
                    onChange={event => updateFromInput(`levelsTo`, event)}
                  />
                  <Label>Уровней до</Label>
                </Group>
              </div>
            </Col>
          </Row>

          <Row>
            <Col sm="6" md="6" lg="4">
              <Group className={cn(sUtils.width17, sUtils.pushedRight1)}>
                <Label block>Конструкция дома</Label>
                <Select
                  options={options.wallMaterial}
                  value={filters[`specification.wallMaterial`]}
                  onChange={value =>
                    updateFilter(`specification.wallMaterial`, value)
                  }
                />
              </Group>
            </Col>
            <Col sm="6" md="6" lg="4">
              <Group className={cn(sUtils.width17, sUtils.pushedRight1)}>
                <Label block>Материал крыши</Label>
                <Select
                  options={options.roofMaterial}
                  value={filters[`specification.roofMaterial`]}
                  onChange={value =>
                    updateFilter(`specification.roofMaterial`, value)
                  }
                />
              </Group>
            </Col>
            <Col sm="4" md="4" lg="3">
              <Group className={sUtils.resetIndent}>
                <Label className={sUtils.pushedBottom1} block>
                  Кондиционирование
                </Label>
                <Label className={cn(sUtils.fontRegular, sUtils.pushedRight1)}>
                  <Input
                    type="radio"
                    checked={filters[`specification.withConditioning`]}
                    onChange={() =>
                      updateFilter(`specification.withConditioning`, true)
                    }
                  />{' '}
                  Да
                </Label>
                <Label className={sUtils.fontRegular}>
                  <Input
                    type="radio"
                    checked={!filters[`specification.withConditioning`]}
                    onChange={() =>
                      updateFilter(`specification.withConditioning`, false)
                    }
                  />{' '}
                  Нет
                </Label>
              </Group>
            </Col>
            <Col sm="4" md="4" lg="3">
              <Group className={sUtils.resetIndent}>
                <Label className={sUtils.pushedBottom1} block>
                  Вентиляция
                </Label>
                <Label className={cn(sUtils.fontRegular, sUtils.pushedRight1)}>
                  <Input
                    type="radio"
                    checked={filters[`specification.withVentilation`]}
                    onChange={() =>
                      updateFilter(`specification.withVentilation`, true)
                    }
                  />{' '}
                  Да
                </Label>
                <Label className={sUtils.fontRegular}>
                  <Input
                    type="radio"
                    checked={!filters[`specification.withVentilation`]}
                    onChange={() =>
                      updateFilter(`specification.withVentilation`, false)
                    }
                  />{' '}
                  Нет
                </Label>
              </Group>
            </Col>
          </Row>

          <Row className={sUtils.pushedTop3}>
            <Col xs="20">
              <Heading size="sm">Состояние</Heading>
            </Col>
          </Row>
          <Row>
            <Col sm="10" lg="5">
              <Group>
                <Label>Тип продажи</Label>
                <Select
                  options={options.resaleKinds}
                  value={filters[`saleOffer.isResale`]}
                  onChange={value => updateFilter(`saleOffer.isResale`, value)}
                />
              </Group>
            </Col>
            <Col sm="10" lg="5">
              <Group>
                <Label>Состояние</Label>
                <Select
                  labelKey="title"
                  valueKey="id"
                  options={options.conditions}
                  value={filters[`specification.condition`]}
                  onChange={value =>
                    updateFilter(`specification.condition`, value)
                  }
                />
              </Group>
            </Col>
            <Col sm="10" lg="5">
              <Group>
                <Label>Ремонт</Label>
                <Select
                  labelKey="title"
                  valueKey="id"
                  options={options.renovate}
                  value={filters[`specification.renovate`]}
                  onChange={value =>
                    updateFilter(`specification.renovate`, value)
                  }
                />
              </Group>
            </Col>
            <Col sm="10" lg="5">
              <Group>
                <Label>Мебель</Label>
                <Select
                  labelKey="title"
                  valueKey="id"
                  options={options.furniture}
                  value={filters[`specification.furniture`]}
                  onChange={value =>
                    updateFilter(`specification.furniture`, value)
                  }
                />
              </Group>
            </Col>
          </Row>

          <Row className={sUtils.pushedTop3}>
            <Col xs="20">
              <Heading size="sm">Участок</Heading>
            </Col>
          </Row>
          <Row>
            <Col sm="5" lg="3">
              <Group float>
                <Input
                  block
                  valueClassName="floatLabel"
                  placeholder="Площадь от"
                  type="text"
                  value={filters.landAreaFrom}
                  onChange={event => updateFromInput(`landAreaFrom`, event)}
                />
                <Label>Площадь от</Label>
              </Group>
            </Col>
            <Col sm="5" lg="3">
              <Group float>
                <Input
                  block
                  valueClassName="floatLabel"
                  placeholder="Площадь до"
                  type="text"
                  value={filters.landAreaTo}
                  onChange={event => updateFromInput(`landAreaTo`, event)}
                />
                <Label>Площадь до</Label>
              </Group>
            </Col>
            <Col sm="5" lg="3">
              <Group className={sUtils.resetIndent}>
                <Label className={sUtils.pushedBottom1} block>
                  Ландшафтные работы
                </Label>
                <Label className={cn(sUtils.fontRegular, sUtils.pushedRight1)}>
                  <Input
                    type="radio"
                    checked={filters[`landDetails.landscaping`]}
                    onChange={() =>
                      updateFilter(`landDetails.landscaping`, true)
                    }
                  />{' '}
                  Да
                </Label>
                <Label className={sUtils.fontRegular}>
                  <Input
                    type="radio"
                    checked={!filters[`landDetails.landscaping`]}
                    onChange={() =>
                      updateFilter(`landDetails.landscaping`, false)
                    }
                  />{' '}
                  Нет
                </Label>
              </Group>
            </Col>
            <Col sm="5" lg="4">
              <Group>
                <Label>Тип участка</Label>
                <Select
                  options={options.landscapeKinds}
                  value={filters[`landDetails.landscapeKind`]}
                  onChange={value =>
                    updateFilter(`landDetails.landscapeKind`, value)
                  }
                  labelKey="title"
                  valueKey="id"
                />
              </Group>
            </Col>
          </Row>

          <Row className={sUtils.pushedTop3}>
            <Col xs="20">
              <Heading size="sm">Доп. строения</Heading>
            </Col>
          </Row>
          <Row>
            <Col sm="4" lg="3">
              <Group className={sUtils.resetIndent}>
                <Label className={sUtils.pushedBottom1} block>
                  Гостевой дом
                </Label>
                <Label className={cn(sUtils.fontRegular, sUtils.pushedRight1)}>
                  <Input
                    type="radio"
                    checked={
                      filters[`additionalDetails.guestHouseArea`] === `0..`
                    }
                    onChange={() =>
                      updateFilter(`additionalDetails.guestHouseArea`, `0..`)
                    }
                  />{' '}
                  Есть
                </Label>
                <Label className={sUtils.fontRegular}>
                  <Input
                    type="radio"
                    checked={
                      filters[`additionalDetails.guestHouseArea`] !== `0..`
                    }
                    onChange={() =>
                      updateFilter(`additionalDetails.guestHouseArea`, ``)
                    }
                  />{' '}
                  Нет
                </Label>
              </Group>
            </Col>
            <Col sm="4" lg="3">
              <Group className={sUtils.resetIndent}>
                <Label className={sUtils.pushedBottom1} block>
                  Дом охраны
                </Label>
                <Label className={cn(sUtils.fontRegular, sUtils.pushedRight1)}>
                  <Input
                    type="radio"
                    checked={
                      filters[`additionalDetails.securityHouseArea`] === `0..`
                    }
                    onChange={() =>
                      updateFilter(`additionalDetails.securityHouseArea`, `0..`)
                    }
                  />{' '}
                  Есть
                </Label>
                <Label className={sUtils.fontRegular}>
                  <Input
                    type="radio"
                    checked={
                      filters[`additionalDetails.securityHouseArea`] !== `0..`
                    }
                    onChange={() =>
                      updateFilter(`additionalDetails.securityHouseArea`, ``)
                    }
                  />{' '}
                  Нет
                </Label>
              </Group>
            </Col>
            <Col sm="4" lg="3">
              <Group className={sUtils.resetIndent}>
                <Label className={sUtils.pushedBottom1} block>
                  Дом персонала
                </Label>
                <Label className={cn(sUtils.fontRegular, sUtils.pushedRight1)}>
                  <Input
                    type="radio"
                    checked={
                      filters[`additionalDetails.staffHouseArea`] === `0..`
                    }
                    onChange={() =>
                      updateFilter(`additionalDetails.staffHouseArea`, `0..`)
                    }
                  />{' '}
                  Есть
                </Label>
                <Label className={sUtils.fontRegular}>
                  <Input
                    type="radio"
                    checked={
                      filters[`additionalDetails.staffHouseArea`] !== `0..`
                    }
                    onChange={() =>
                      updateFilter(`additionalDetails.staffHouseArea`, ``)
                    }
                  />{' '}
                  Нет
                </Label>
              </Group>
            </Col>
            <Col sm="4" lg="3">
              <Group className={sUtils.resetIndent}>
                <Label className={sUtils.pushedBottom1} block>
                  SPA-комплекс
                </Label>
                <Label className={cn(sUtils.fontRegular, sUtils.pushedRight1)}>
                  <Input
                    type="radio"
                    checked={filters[`additionalDetails.spaArea`] === `0..`}
                    onChange={() =>
                      updateFilter(`additionalDetails.spaArea`, `0..`)
                    }
                  />{' '}
                  Есть
                </Label>
                <Label className={sUtils.fontRegular}>
                  <Input
                    type="radio"
                    checked={filters[`additionalDetails.spaArea`] !== `0..`}
                    onChange={() =>
                      updateFilter(`additionalDetails.spaArea`, ``)
                    }
                  />{' '}
                  Нет
                </Label>
              </Group>
            </Col>
            <Col sm="4" lg="3">
              <Group className={sUtils.resetIndent}>
                <Label className={sUtils.pushedBottom1} block>
                  Баня
                </Label>
                <Label className={cn(sUtils.fontRegular, sUtils.pushedRight1)}>
                  <Input
                    type="radio"
                    checked={
                      filters[`additionalDetails.bathhouseArea`] === `0..`
                    }
                    onChange={() =>
                      updateFilter(`additionalDetails.bathhouseArea`, `0..`)
                    }
                  />{' '}
                  Есть
                </Label>
                <Label className={sUtils.fontRegular}>
                  <Input
                    type="radio"
                    checked={
                      filters[`additionalDetails.bathhouseArea`] !== `0..`
                    }
                    onChange={() =>
                      updateFilter(`additionalDetails.bathhouseArea`, ``)
                    }
                  />{' '}
                  Нет
                </Label>
              </Group>
            </Col>
          </Row>

          <Row className={sUtils.pushedTop6}>
            <Col xs="20">
              <Heading size="sm">Коммуникации</Heading>
            </Col>
          </Row>
          <Row>
            <Col sm="10" lg="5">
              <Group>
                <Label>Газ</Label>
                <Select
                  options={options.gasSupply}
                  value={filters[`communication.gasSupply`]}
                  onChange={value =>
                    updateFilter(`communication.gasSupply`, value)
                  }
                  labelKey="title"
                  valueKey="id"
                />
              </Group>
            </Col>
            <Col sm="10" lg="5">
              <Group>
                <Label>Электричество, кВт</Label>
                <Input
                  block
                  type="text"
                  value={filters[`communication.powerSupply`]}
                  onChange={event =>
                    updateFromInput(`communication.powerSupply`, event)
                  }
                  labelKey="title"
                  valueKey="id"
                />
              </Group>
            </Col>
            <Col sm="10" lg="5">
              <Group>
                <Label>Канализация</Label>
                <Select
                  options={options.sewerageSupply}
                  value={filters[`communication.sewerageSupply`]}
                  onChange={value =>
                    updateFilter(`communication.sewerageSupply`, value)
                  }
                  labelKey="title"
                  valueKey="id"
                />
              </Group>
            </Col>
            <Col sm="10" lg="5">
              <Group>
                <Label>Водоснабжение</Label>
                <Select
                  options={options.waterSupply}
                  value={filters[`communication.waterSupply`]}
                  onChange={value =>
                    updateFilter(`communication.waterSupply`, value)
                  }
                  labelKey="title"
                  valueKey="id"
                />
              </Group>
            </Col>
          </Row>

          <Row className={sUtils.pushedTop3}>
            <Col xs="20">
              <Heading size="sm">Добавил</Heading>
            </Col>
          </Row>
          <Row>
            <Col sm="10" md="6" lg="5">
              <Group>
                <Label>Сотрудник</Label>
                <AsyncSelect
                  asyncOptions={fetchResource(
                    `/v1/users/staff`,
                    `lastName,firstName`,
                    [`lastName`, `firstName`],
                  )}
                  value={filters.createdByUserId}
                  onChange={value => updateFilter(`createdByUserId`, value)}
                />
              </Group>
            </Col>
            <Col sm="10">
              <Group inline className={sUtils.pushedRight1}>
                <Form.Label block>&nbsp;</Form.Label>
                <Daypicker
                  className={sDaypicker.daypicker}
                  restrict="future"
                  kind="from"
                  onDayClick={value => updateFilter(`createdFrom`, value)}
                  control={
                    <Input
                      type="text"
                      placeholder="Дата от"
                      value={filters.createdFrom}
                    />
                  }
                  button={
                    <Button className={sDaypicker.btn}>
                      <Icon className={sDaypicker.icon} icon="calendar" />
                    </Button>
                  }
                />
              </Group>
              <Group inline>
                <Form.Label block>&nbsp;</Form.Label>
                <Daypicker
                  className={sDaypicker.daypicker}
                  restrict="future"
                  kind="to"
                  onDayClick={value => updateFilter(`createdTo`, value)}
                  control={
                    <Input
                      type="text"
                      placeholder="Дата до"
                      value={filters.createdTo}
                    />
                  }
                  button={
                    <Button className={sDaypicker.btn}>
                      <Icon className={sDaypicker.icon} icon="calendar" />
                    </Button>
                  }
                />
              </Group>
            </Col>
          </Row>

          <Row className={sUtils.pushedTop3}>
            <Col xs="20">
              <Heading size="sm">Изменил</Heading>
            </Col>
          </Row>
          <Row>
            <Col sm="10" md="6" lg="5">
              <Group>
                <Label>Сотрудник</Label>
                <AsyncSelect
                  asyncOptions={fetchResource(
                    `/v1/users/staff`,
                    `lastName,firstName`,
                    [`lastName`, `firstName`],
                  )}
                  value={filters.updatedByUserId}
                  onChange={value => updateFilter(`updatedByUserId`, value)}
                />
              </Group>
            </Col>
            <Col sm="10">
              <Group inline className={sUtils.pushedRight1}>
                <Form.Label block>&nbsp;</Form.Label>
                <Daypicker
                  restrict="future"
                  kind="from"
                  onDayClick={value => updateFilter(`updatedFrom`, value)}
                  control={
                    <Input
                      type="text"
                      placeholder="Дата от"
                      value={filters.updatedFrom}
                    />
                  }
                  button={
                    <Button className={sDaypicker.btn}>
                      <Icon className={sDaypicker.icon} icon="calendar" />
                    </Button>
                  }
                />
              </Group>
              <Group inline>
                <Form.Label block>&nbsp;</Form.Label>
                <Daypicker
                  restrict="future"
                  kind="to"
                  onDayClick={value => updateFilter(`updatedTo`, value)}
                  control={
                    <Input
                      type="text"
                      placeholder="Дата до"
                      value={filters.updatedTo}
                    />
                  }
                  button={
                    <Button className={sDaypicker.btn}>
                      <Icon className={sDaypicker.icon} icon="calendar" />
                    </Button>
                  }
                />
              </Group>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  updateFilter(ref, value) {
    const { actions, listKind } = this.props;

    actions.updateFilter(listKind, { [ref]: value });
  }

  updateFromInput(ref, event) {
    this.updateFilter(ref, event.target.value);
  }

  resetFilter() {
    const { actions, listKind } = this.props;

    actions.resetFilter(listKind);
  }

  filterCount() {
    return Object.keys(this.props.filters).filter(
      key => this.props.filters[key],
    ).length;
  }

  extendedCount() {
    const exclude = [`id`, `dealType`, `kind`, `state`];

    return Object.keys(this.props.filters).filter(
      key => this.props.filters[key] && exclude.indexOf(key) === -1,
    ).length;
  }

  toggleExtended() {
    this.setState({ extended: !this.state.extended });
  }

  render() {
    const { filters, state, listKind, sortFields, actions } = this.props;
    const { field: activeSortField, predicate: activeSortPredicate } =
      state.order[listKind] || {};

    const filterCount = this.filterCount();
    const extendedCount = this.extendedCount();

    return (
      <Col xs="20" className={sUtils.pushedTop5}>
        <Form.Container>
          <Row>
            <Col xs="20" md="18" mdOffset="1">
              <Row>
                <Col sm="6" md="4">
                  <Group>
                    <Label>ID</Label>
                    <Input
                      block
                      valueClassName="floatLabel"
                      placeholder="ID объекта"
                      type="text"
                      value={filters.id}
                      onChange={event => ::this.updateFromInput(`id`, event)}
                    />
                  </Group>
                </Col>
                <Col sm="6" md="4">
                  <Group>
                    <Label>Тип предложения</Label>
                    <Select
                      options={dealTypes}
                      onBlur={() => ({})}
                      value={filters.dealType}
                      onChange={value => ::this.updateFilter(`dealType`, value)}
                    />
                  </Group>
                </Col>
                <Col sm="6" md="4">
                  <Group>
                    <Label>Тип объекта</Label>
                    <Select
                      options={options.kinds}
                      labelKey="title"
                      valueKey="id"
                      onBlur={() => ({})}
                      value={filters.kind}
                      onChange={value => ::this.updateFilter(`kind`, value)}
                    />
                  </Group>
                </Col>
                <Col sm="6" md="4">
                  <Group>
                    <Label>Статус</Label>
                    <Select
                      options={options.states}
                      labelKey="title"
                      valueKey="id"
                      value={filters.state}
                      onChange={value => ::this.updateFilter(`state`, value)}
                    />
                  </Group>
                </Col>
                <Col sm="6" md="4">
                  <Group>
                    <Label>Ответственный</Label>
                    <AsyncSelect
                      asyncOptions={fetchResource(
                        `/v1/users/staff`,
                        `lastName,firstName`,
                        [`lastName`, `firstName`],
                      )}
                      value={filters[`responsibleUser.id`]}
                      onChange={value =>
                        ::this.updateFilter(`responsibleUser.id`, value)
                      }
                    />
                  </Group>
                </Col>
              </Row>
            </Col>
          </Row>
          <FilterExtended
            {...this.props}
            isOpen={this.state.extended}
            updateFilter={::this.updateFilter}
            updateFromInput={::this.updateFromInput}
          />
          <Row>
            <Col xs="20" md="18" mdOffset="1">
              <Row className={sUtils.pushedTop2_5Bottom1_5}>
                <Col sm="5">
                  {!!this.props.count && (
                    <p className={s.textXs}>Найдено: {this.props.count}</p>
                  )}
                </Col>
                <Col sm="10" className={sUtils.pushedTopXs2}>
                  <div className={sUtils.textCenter}>
                    <Button
                      size="xs"
                      kind="primary"
                      className={sUtils.pushedRight1}
                      type="button"
                      onClick={::this.toggleExtended}
                    >
                      {this.state.extended ? `Скрыть` : `Показать`} расширенный
                      фильтр {!!extendedCount && `(${extendedCount})`}
                    </Button>
                    <Button
                      className={sUtils.pushedTopXs2}
                      size="xs"
                      type="button"
                      onClick={::this.resetFilter}
                      disabled={!filterCount}
                    >
                      Сбросить
                    </Button>
                  </div>
                </Col>
                <Col
                  className={cn(sUtils.textRight, sUtils.pushedTopXs2)}
                  sm="5"
                >
                  <SortingDropdown
                    alwaysActive
                    placeholder={
                      activeSortField
                        ? `Сортировать ${dict.orderBy[activeSortField]}`
                        : `Сортировать`
                    }
                    reset={() => actions.resetOrder(listKind)}
                    value={activeSortField}
                  >
                    <div>
                      {sortFields.map(field => (
                        <Button
                          block
                          type="button"
                          className={cn(
                            sButton.btnInner,
                            activeSortField === field && s.activeBtnInner,
                          )}
                          key={field}
                          onClick={() =>
                            actions.updateOrder(
                              listKind,
                              field,
                              activeSortPredicate === `asc` ? `desc` : `asc`,
                            )
                          }
                        >
                          {dict.orderBy[field]}
                        </Button>
                      ))}
                    </div>
                  </SortingDropdown>
                </Col>
              </Row>
            </Col>
          </Row>
        </Form.Container>
      </Col>
    );
  }
}
