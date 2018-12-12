import React, { Component } from 'react';
import { FormattedDate } from 'react-formatted';

import cn from 'classnames';
import UI from 'cem/components/ui';
const {
  Select, AsyncSelect, Daypicker,
  Button, Icon, Heading,
  Grid: { Row, Col },
  Form: { Input, Label, Group },
} = UI;

import s from 'cem/styles/components/header';
import sUtils from 'cem/styles/utils';
import sDaypicker from 'cem/styles/ui/daypicker';

import { fetchResource } from 'cem/helpers/autocomplete';
import { activeFilterOptions } from 'cem/constants/deals/options';

const FilterExtended = ({ fields, isArchived }) => (
  <section>
    <Row>
      <Col xs="20">
        <Row className={sUtils.pushedTop3}>
          <Col xs="20">
            <Heading size="md">Ответственный</Heading>
          </Col>
        </Row>
        <Row className={sUtils.pushedTop3}>
          <Col sm="6">
            <Group>
              <Label>Департамент</Label>
              <AsyncSelect asyncOptions={fetchResource(`/v1/departments`, `name`, [`name`])} {...fields.ruDepartmentId} />
            </Group>
          </Col>
          <Col sm="6" smOffset="1">
            <Group>
              <Label>Отдел</Label>
              <AsyncSelect asyncOptions={fetchResource(`/v1/divisions`, `name`, [`name`])} {...fields.ruDivisionId} />
            </Group>
          </Col>
          <Col sm="6" smOffset="1">
            <Group>
              <Label>Ответственный</Label>
              <AsyncSelect asyncOptions={fetchResource(`/v1/users/staff`, `lastName,firstName`, [`firstName`, `lastName`])} {...fields.ruId} />
            </Group>
          </Col>
        </Row>
        <Row className={sUtils.pushedTop3}>
          <Col sm="6">
            <Group>
              <Label block>Ожидаемая дата завершения (от)</Label>
              <Daypicker className={sUtils.fullWidth}
                control={<Input block type="text" {...fields.expectedFinishAtFrom} required />}
                button={<Button className={sDaypicker.btn}><Icon className={sDaypicker.icon} icon="calendar" /></Button>}
                onDayClick={day => fields.expectedFinishAtFrom.onChange(day)}
              />
            </Group>
          </Col>
          <Col sm="6" smOffset="1">
            <Group>
              <Label block>Ожидаемая дата завершения (до)</Label>
              <Daypicker className={sUtils.fullWidth}
                control={<Input block type="text" {...fields.expectedFinishAtTo} required />}
                button={<Button className={sDaypicker.btn}><Icon className={sDaypicker.icon} icon="calendar" /></Button>}
                onDayClick={day => fields.expectedFinishAtTo.onChange(day)}
              />
            </Group>
          </Col>
        </Row>
      </Col>
    </Row>
    {!isArchived &&
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
                <Daypicker className={sUtils.fullWidth} kind="to"
                  onDayClick={day => fields.tasksDeadlineDate.onChange(day)}
                  control={<Input block type="text" {...fields.tasksDeadlineDate} />}
                  button={<Button className={sDaypicker.btn}><Icon className={sDaypicker.icon} icon="calendar" /></Button>}
                />
              </Group>
            </Col>
            <Col sm="4">
              <Group>
                <Label block>
                  Нет запланированных задач {fields.tasksDeadlineDate.value && (<span>до <FormattedDate mask="dd.mm" value={fields.tasksDeadlineDate.value} /></span>)}
                </Label>
                <Label className={cn(s.checkboxLabel, sUtils.pushedTop_5)}>
                  <Input
                    type="checkbox"
                    checked={!!fields.tasksDoesntHaveScheduled.value}
                    onChange={() => fields.tasksDoesntHaveScheduled.onChange(!fields.tasksDoesntHaveScheduled.value)}
                  />
                  нет задач {fields.tasksDeadlineDate.value && (<span>до <FormattedDate mask="dd.mm" value={fields.tasksDeadlineDate.value} /></span>)}
                </Label>
              </Group>
            </Col>
            {!fields.tasksDeadlineDate.value && (
              <Col sm="4">
                <Group>
                  <Label block>
                    Есть просроченные задачи
                  </Label>
                  <Label className={cn(s.checkboxLabel, sUtils.pushedTop_5)}>
                    <Input
                      type="checkbox"
                      checked={!!fields.tasksHasOverdue.value}
                      onChange={() => fields.tasksHasOverdue.onChange(!fields.tasksHasOverdue.value)}
                    />
                    есть просроченные
                  </Label>
                </Group>
              </Col>
            )}
          </Row>
        </Col>
      </Row>
    }
  </section>
);

export default class extends Component {
  static defaultProps = {
    isArchived: false,
  };

  state = {};

  toggleExtended() {
    this.setState({ extended: !this.state.extended });
  }

  render() {
    const {
      fields, count, resetFilter, filterCount, extendedFilterCount,
      isArchived,
    } = this.props;
    return (
      <Col xs="20" className={sUtils.pushedTop5}>
        <Row>
          <Col xs="20">
            <Row>
            <Col sm="5">
              <Group>
                <Label>ID</Label>
                <Input block type="text" {...fields.id} />
              </Group>
            </Col>
            <Col sm="5">
              <Group>
                <Label>Контакт</Label>
                <AsyncSelect asyncOptions={fetchResource(`/v1/contacts`, `details.name`, [`details.firstName`, `details.lastName`])} {...fields.cdId} />
              </Group>
            </Col>
            <Col sm="5">
              <Group>
                <Label>Телефон</Label>
                <Input block type="text" {...fields.cdPhoneNumber} />
              </Group>
            </Col>
            <Col sm="5">
              {!isArchived &&
                <Group>
                  <Label>Стадия</Label>
                  <Select block valueKey="id" labelKey="title" options={activeFilterOptions} {...fields[`state`]} />
                </Group>
              }
            </Col>
            </Row>
          </Col>
        </Row>
        {this.state.extended && <FilterExtended {...this.props} />}
        <Row>
          <Col xs="20">
            <div className={s.btnGroup}>
              <Button size="xs" kind="primary" className={sUtils.pushedRight1} type="button" onClick={::this.toggleExtended}>
                {this.state.extended ? `Скрыть` : `Показать` } расширенный фильтр {!!extendedFilterCount && `(${extendedFilterCount})`}
              </Button>
              <Button className={sUtils.pushedTopXs2} size="xs" type="button" onClick={resetFilter} disabled={!filterCount}>Сбросить</Button>
              {!!count && <p className={s.textFind}>Найдено: {count}</p>}
            </div>
          </Col>
        </Row>
      </Col>
    );
  }
}
