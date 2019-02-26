import React, { Component } from 'react';

import { FormattedDate } from 'react-formatted';
import filterHelper from 'core/decorators/filter';
import { fetchResource } from 'cem/helpers/autocomplete';

import * as options from 'cem/_client_leads/constants/options';

import UI from 'cem/components/ui';
const {
  Select,
  AsyncSelect,
  Heading,
  Button,
  Daypicker,
  Icon,
  Grid: { Row, Col },
  Form: { Input, Group, Label },
} = UI;

import cn from 'classnames';
import s from 'cem/styles/components/header';
import sUtils from 'cem/styles/utils';
import sDaypicker from 'cem/styles/ui/daypicker';

const FilterExtended = ({ fields, group }) => (
  <section>
    <Row className={sUtils.pushedTop3}>
      <Col xs="20">
        <Row>
          <Col xs="20">
            <Heading size="md">Принял</Heading>
          </Col>
        </Row>
        <Row>
          <Col sm="6">
            <Group>
              <Label>Департамент</Label>
              <AsyncSelect
                multi
                asyncOptions={fetchResource(`/v1/departments`, `name`, [
                  `name`,
                ])}
                {...fields.cuDepartmentId}
              />
            </Group>
          </Col>
          <Col sm="6" smOffset="1">
            <Group>
              <Label>Отдел</Label>
              <AsyncSelect
                multi
                asyncOptions={fetchResource(`/v1/divisions`, `name`, [`name`])}
                {...fields.cuDivisionId}
              />
            </Group>
          </Col>
          <Col sm="6" smOffset="1">
            <Group>
              <Label>Сотрудник</Label>
              <AsyncSelect
                multi
                asyncOptions={fetchResource(
                  `/v1/users/staff`,
                  `lastName,firstName`,
                  [`firstName`, `lastName`],
                )}
                {...fields.cuId}
              />
            </Group>
          </Col>
        </Row>
      </Col>
    </Row>
    <Row className={sUtils.pushedTop3}>
      <Col xs="20">
        <Row>
          <Col xs="20">
            <Heading size="md">Ответственный</Heading>
          </Col>
        </Row>
        <Row>
          <Col sm="6">
            <Group>
              <Label>Департамент</Label>
              <AsyncSelect
                multi
                asyncOptions={fetchResource(`/v1/departments`, `name`, [
                  `name`,
                ])}
                {...fields.ruDepartmentId}
              />
            </Group>
          </Col>
          <Col sm="6" smOffset="1">
            <Group>
              <Label>Отдел</Label>
              <AsyncSelect
                multi
                asyncOptions={fetchResource(`/v1/divisions`, `name`, [`name`])}
                {...fields.ruDivisionId}
              />
            </Group>
          </Col>
          <Col sm="6" smOffset="1">
            <Group>
              <Label>Сотрудник</Label>
              <AsyncSelect
                multi
                asyncOptions={fetchResource(
                  `/v1/users/staff`,
                  `lastName,firstName`,
                  [`firstName`, `lastName`],
                )}
                {...fields.ruId}
              />
            </Group>
          </Col>
        </Row>
      </Col>
    </Row>
    {group === `active` && (
      <Row>
        <Col xs="20">
          <Row className={sUtils.pushedTop3}>
            <Col xs="20">
              <Heading size="md">Задачи</Heading>
            </Col>
          </Row>
          <Row>
            <Col sm="4">
              <Group>
                <Label block>Дата отсчёта</Label>
                <Daypicker
                  className={sUtils.fullWidth}
                  kind="to"
                  onDayClick={day => fields.tasksDeadlineDate.onChange(day)}
                  control={
                    <Input block type="text" {...fields.tasksDeadlineDate} />
                  }
                  button={
                    <Button className={sDaypicker.btn}>
                      <Icon className={sDaypicker.icon} icon="calendar" />
                    </Button>
                  }
                />
              </Group>
            </Col>
            <Col sm="4">
              <Group>
                <Label block>
                  Нет запланированных задач{' '}
                  {fields.tasksDeadlineDate.value && (
                    <span>
                      до{' '}
                      <FormattedDate
                        mask="dd.mm"
                        value={fields.tasksDeadlineDate.value}
                      />
                    </span>
                  )}
                </Label>
                <Label className={cn(s.checkboxLabel, sUtils.pushedTop_5)}>
                  <Input
                    type="checkbox"
                    checked={!!fields.tasksDoesntHaveScheduled.value}
                    onChange={() =>
                      fields.tasksDoesntHaveScheduled.onChange(
                        !fields.tasksDoesntHaveScheduled.value,
                      )
                    }
                  />
                  нет задач{' '}
                  {fields.tasksDeadlineDate.value && (
                    <span>
                      до{' '}
                      <FormattedDate
                        mask="dd.mm"
                        value={fields.tasksDeadlineDate.value}
                      />
                    </span>
                  )}
                </Label>
              </Group>
            </Col>
            {!fields.tasksDeadlineDate.value && (
              <Col sm="4">
                <Group>
                  <Label block>Есть просроченные задачи</Label>
                  <Label className={cn(s.checkboxLabel, sUtils.pushedTop_5)}>
                    <Input
                      type="checkbox"
                      checked={!!fields.tasksHasOverdue.value}
                      onChange={() =>
                        fields.tasksHasOverdue.onChange(
                          !fields.tasksHasOverdue.value,
                        )
                      }
                    />
                    есть просроченные
                  </Label>
                </Group>
              </Col>
            )}
          </Row>
        </Col>
      </Row>
    )}
    <Row className={sUtils.pushedTop3}>
      <Col xs="20">
        <Row>
          <Col xs="20">
            <Heading size="md">Дополнительно</Heading>
          </Col>
        </Row>
        <Row>
          <Col sm="4">
            <Group>
              <Label block>Лид поступил (от)</Label>
              <Daypicker
                className={sUtils.fullWidth}
                restrict="future"
                kind="from"
                onDayClick={day => fields.createdAtFrom.onChange(day)}
                control={<Input block type="text" {...fields.createdAtFrom} />}
                button={
                  <Button className={sDaypicker.btn}>
                    <Icon className={sDaypicker.icon} icon="calendar" />
                  </Button>
                }
              />
            </Group>
          </Col>
          <Col sm="4">
            <Group>
              <Label block>Лид поступил (до)</Label>
              <Daypicker
                className={sUtils.fullWidth}
                restrict="future"
                kind="to"
                onDayClick={day => fields.createdAtTo.onChange(day)}
                control={<Input block type="text" {...fields.createdAtTo} />}
                button={
                  <Button className={sDaypicker.btn}>
                    <Icon className={sDaypicker.icon} icon="calendar" />
                  </Button>
                }
              />
            </Group>
          </Col>
          <Col sm="5">
            <Group>
              <Label block>Ожидающие подтверждения</Label>
              <Label className={cn(s.checkboxLabel, sUtils.pushedTop_5)}>
                <Input
                  type="checkbox"
                  checked={!!fields.awaitingApproval.value}
                  onChange={() =>
                    fields.awaitingApproval.onChange(
                      !fields.awaitingApproval.value,
                    )
                  }
                />{' '}
                ожидающие подтверждения
              </Label>
            </Group>
          </Col>
          <Col sm="5">
            <Group>
              <Label block>Без ожидающих подтверждения</Label>
              <Label className={cn(s.checkboxLabel, sUtils.pushedTop_5)}>
                <Input
                  type="checkbox"
                  checked={!!fields.notAwaitingApproval.value}
                  onChange={() =>
                    fields.notAwaitingApproval.onChange(
                      !fields.notAwaitingApproval.value,
                    )
                  }
                />{' '}
                без ожидающих подтверждения
              </Label>
            </Group>
          </Col>
        </Row>
      </Col>
    </Row>
  </section>
);

class Filter extends Component {
  constructor() {
    super();
    this.state = { extended: false };
  }

  toggle() {
    this.setState({ extended: !this.state.extended });
  }

  render() {
    const {
      fields,
      count,
      resetFilter,
      group,
      filterCount,
      extendedFilterCount,
    } = this.props;

    return (
      <Col xs="20" className={sUtils.pushedTop5}>
        <Row>
          <Col xs="20">
            <Row>
              <Col sm="6" md="3">
                <Group>
                  <Label block>ID</Label>
                  <Input
                    className={sUtils.fullWidth}
                    type="text"
                    {...fields.id}
                  />
                </Group>
              </Col>
              <Col sm="6" md="4">
                <Group>
                  <Label>Тип лида</Label>
                  <Select options={options.leadKinds} {...fields.kind} />
                </Group>
              </Col>
              <Col sm="6" md="4">
                <Group>
                  <Label>Тип заявки</Label>
                  <Select
                    options={options.requestKinds}
                    {...fields.requestKind}
                  />
                </Group>
              </Col>
              <Col sm="3">
                <Group>
                  <Label block>Номер телефона</Label>
                  <Input
                    className={sUtils.fullWidth}
                    type="text"
                    {...fields.phoneNumber}
                  />
                </Group>
              </Col>
              <Col sm="3">
                <Group>
                  <Label>Источник</Label>
                  <AsyncSelect
                    multi
                    asyncOptions={fetchResource(
                      `/v1/client_lead_sources`,
                      `slug,title`,
                      leadSource =>
                        `${leadSource.slug}${
                          leadSource.title ? ` — ${leadSource.title}` : ``
                        }`,
                    )}
                    {...fields.clientLeadSourceId}
                  />
                </Group>
              </Col>
              <Col sm="3">
                {group === `active` && (
                  <Group>
                    <Label>Статус</Label>
                    <Select options={options.states.active} {...fields.state} />
                  </Group>
                )}
              </Col>
            </Row>
          </Col>
        </Row>
        {this.state.extended && <FilterExtended {...this.props} />}
        <Row>
          <Col xs="20">
            <div className={s.btnGroup}>
              <Button
                size="xs"
                kind="primary"
                className={sUtils.pushedRight1}
                type="button"
                onClick={::this.toggle}
              >
                {this.state.extended ? `Скрыть` : `Показать`} расширенный фильтр{' '}
                {!!extendedFilterCount && `(${extendedFilterCount})`}
              </Button>
              <Button
                className={sUtils.pushedTopXs2}
                size="xs"
                type="button"
                onClick={resetFilter}
                disabled={!filterCount}
              >
                Сбросить
              </Button>
              {!!count && <p className={s.textFind}>Найдено: {count}</p>}
            </div>
          </Col>
        </Row>
      </Col>
    );
  }
}

const fields = [
  `id`,
  `kind`,
  `requestKind`,
  `state`,
  `phoneNumber`,
  `clientLeadSourceId`,
];

const extendedFields = [
  `cuId`,
  `cuDepartmentId`,
  `cuDivisionId`,

  `ruId`,
  `ruDepartmentId`,
  `ruDivisionId`,

  `tasksDeadlineDate`,
  `tasksDoesntHaveScheduled`,
  `tasksHasOverdue`,

  `createdAtFrom`,
  `createdAtTo`,
  `awaitingApproval`,
  `notAwaitingApproval`,
];

export default filterHelper(null, fields, extendedFields)(Filter);
