import React, { Component } from 'react';

import * as options from 'cem/constants/properties/options';
import * as dict from 'cem/constants/properties/dictionaries';

import UI from 'cem/components/ui';
const {
  Form,
  Button,
  Daypicker,
  Icon,
  Heading,
  PriceInput,
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

import { fetchResource } from 'cem/helpers/autocomplete';
import debounce from 'lodash/debounce';

const dealTypes = [
  { value: `sale`, label: `Продажа` },
  { value: `rent`, label: `Аренда` },
];

class FilterExtended extends Component {
  render() {
    const { filters, updateFilter, updateFromInput } = this.props;
    const isPriceFilterDisabled = !(
      filters.priceFilterCurrency && filters.dealType
    );

    return (
      <Row>
        <Col md="18" mdOffset="1">
          <Row className={sUtils.pushedTop3}>
            <Col xs="20">
              <Heading size="sm">Цена</Heading>
            </Col>
          </Row>
          <Row>
            <Col sm="6" md="5" lg="3">
              <Group>
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
              <Group float>
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
              <Heading size="sm">Адрес</Heading>
            </Col>
          </Row>
          <Row>
            <Col sm="10">
              <Group float>
                <Input
                  valueClassName="floatLabel"
                  placeholder="Поиск адреса "
                  block
                  type="text"
                  onChange={debounce(
                    event => updateFromInput(`location`, event),
                    500,
                  )}
                />
                <Label>Поиск адреса </Label>
              </Group>
            </Col>
            <Col sm="10">
              <Group>
                <Label>Жилой комплекс</Label>
                <Select labelKey="title" valueKey="id" onBlur={() => ({})} />
              </Group>
            </Col>
          </Row>

          <Row className={sUtils.pushedTop3}>
            <Col xs="20">
              <Heading size="sm">Помещение</Heading>
            </Col>
          </Row>
          <Row>
            <Col sm="20">
              <div className={sUtils.flexContainerWrap}>
                <Group
                  className={cn(sUtils.pushedRight1, sUtils.widthXs15Md18)}
                >
                  <Label block>Планировка</Label>
                  <Select
                    options={options.layoutKinds}
                    value={filters[`specification.layout`]}
                    onChange={value =>
                      updateFilter(`specification.layout`, value)
                    }
                  />
                </Group>
                <Group
                  float
                  className={cn(sUtils.pushedRight1, sUtils.widthXs15Md18)}
                >
                  <Input
                    block
                    valueClassName="floatLabel"
                    placeholder="Площадь общая от"
                    type="text"
                    value={filters[`totalAreaFrom`]}
                    onChange={event => updateFromInput(`totalAreaFrom`, event)}
                  />
                  <Label>Площадь общая от</Label>
                </Group>
                <Group
                  float
                  className={cn(sUtils.pushedRight1, sUtils.widthXs15Md18)}
                >
                  <Input
                    block
                    valueClassName="floatLabel"
                    placeholder="Площадь общая до"
                    type="text"
                    value={filters[`totalAreaTo`]}
                    onChange={event => updateFromInput(`totalAreaTo`, event)}
                  />
                  <Label>Площадь общая до</Label>
                </Group>
                <Group
                  float
                  className={cn(sUtils.pushedRight1, sUtils.widthXs15Md18)}
                >
                  <Input
                    block
                    valueClassName="floatLabel"
                    placeholder="Площадь жилая от"
                    type="text"
                    value={filters[`livingAreaFrom`]}
                    onChange={event => updateFromInput(`livingAreaFrom`, event)}
                  />
                  <Label>Площадь жилая от</Label>
                </Group>
                <Group
                  float
                  className={cn(sUtils.pushedRight1, sUtils.widthXs15Md18)}
                >
                  <Input
                    block
                    valueClassName="floatLabel"
                    placeholder="Площадь жилая до"
                    type="text"
                    value={filters[`livingAreaTo`]}
                    onChange={event => updateFromInput(`livingAreaTo`, event)}
                  />
                  <Label>Площадь жилая до</Label>
                </Group>
                <Group
                  float
                  className={cn(sUtils.pushedRight1, sUtils.widthXs15Md18)}
                >
                  <Input
                    block
                    valueClassName="floatLabel"
                    placeholder="Комнат от"
                    type="text"
                    value={filters[`roomsFrom`]}
                    onChange={event => updateFromInput(`roomsFrom`, event)}
                  />
                  <Label>Комнат от</Label>
                </Group>
                <Group float className={sUtils.widthXs15Md18}>
                  <Input
                    block
                    valueClassName="floatLabel"
                    placeholder="Комнат до"
                    type="text"
                    value={filters[`roomsTo`]}
                    onChange={event => updateFromInput(`roomsTo`, event)}
                  />
                  <Label>Комнат до</Label>
                </Group>
              </div>
            </Col>
          </Row>

          <Row className={sUtils.pushedTop3}>
            <Col xs="20">
              <Heading size="sm">Состояние</Heading>
            </Col>
          </Row>
          <Row>
            <Col sm="10" md="10" lg="5">
              <Group>
                <Label>Тип продажи</Label>
                <Select
                  options={options.resaleKinds}
                  value={filters[`saleOffer.isResale`]}
                  onChange={value => updateFilter(`saleOffer.isResale`, value)}
                />
              </Group>
            </Col>
            <Col sm="10" md="10" lg="5">
              <Group>
                <Label>Состояние</Label>
                <Select
                  options={options.conditions}
                  labelKey="title"
                  valueKey="id"
                  value={filters[`information.condition`]}
                  onChange={value =>
                    updateFilter(`information.condition`, value)
                  }
                />
              </Group>
            </Col>
            <Col sm="10" md="10" lg="5">
              <Group>
                <Label>Ремонт</Label>
                <Select
                  options={options.renovate}
                  labelKey="title"
                  valueKey="id"
                  value={filters[`information.renovate`]}
                  onChange={value =>
                    updateFilter(`information.renovate`, value)
                  }
                />
              </Group>
            </Col>
            <Col sm="10" md="10" lg="5">
              <Group>
                <Label>Мебель</Label>
                <Select
                  options={options.furniture}
                  labelKey="title"
                  valueKey="id"
                  value={filters[`information.furniture`]}
                  onChange={value =>
                    updateFilter(`information.furniture`, value)
                  }
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
    const { filters, state, sortKind, sortFields, actions, group } = this.props;
    const { field: activeSortField, predicate: activeSortPredicate } =
      state.order[sortKind] || {};

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
                {group !== `removed` && (
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
                )}
                <Col sm="6" md="4">
                  <Group>
                    <Label>Ответственный</Label>
                    <AsyncSelect
                      asyncOptions={fetchResource(
                        `/v1/users/staff`,
                        `lastName,firstName`,
                        [`lastName`, `firstName`],
                      )}
                      onBlur={() => ({})}
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
          {this.state.extended && (
            <FilterExtended
              {...this.props}
              updateFilter={::this.updateFilter}
              updateFromInput={::this.updateFromInput}
            />
          )}
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
                      className={sUtils.pushedRight1}
                      size="xs"
                      kind="primary"
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
                  sm="5"
                  className={cn(sUtils.textRight, sUtils.pushedTopXs2)}
                >
                  <SortingDropdown
                    alwaysActive
                    placeholder={
                      activeSortField
                        ? `Сортировать ${dict.orderBy[activeSortField]}`
                        : `Сортировать`
                    }
                    reset={() => actions.resetOrder(this.props.sortKind)}
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
                              sortKind,
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
