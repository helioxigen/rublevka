import React, { Component } from 'react';
import { FormattedCurrency } from 'react-formatted';

import cn from 'classnames';
import UI from 'cem/components/ui';
const {
  Daypicker, Button, Icon, Select, PriceInput,
  Grid: { Row, Col },
  Form: { Group, Label, Static, Input },
} = UI;
import FormField from 'cem/helpers/formField';

import s from 'cem/styles/id/content';
import sUtils from 'cem/styles/utils';
import sDaypicker from 'cem/styles/ui/daypicker';

import * as options from 'cem/constants/properties/options';

export default class extends Component {
  state = {
    commissionSum: 0,
  };

  componentWillReceiveProps(nextProps) {
    this.calculateCommissionSum(nextProps.fields.details.expectedAgentFee.value, nextProps.fields.details.budget.value);
  }

  calculateCommissionSum(feeRate = 0, budget = this.props.fields.details.budget.value) {
    const { fields } = this.props;

    if (fields.isAgentFixed.value !== `true`) {
      this.setState({
        commissionSum: Math.floor((budget / 100) * feeRate),
      });
    }
  }

  render() {
    const {
      fields = { details: {} },
      className, headerSection, isStatic, isPropertySelectionAvailable,
    } = this.props;

    return (
      <section className={className}>
        {headerSection}
        {!isStatic &&
          <Row>
            <Col sm="10">
              <FormField label="Бюджет сделки" field={fields.details.budget} float static={isStatic} price>
                <PriceInput block type="text" />
              </FormField>
            </Col>
            <Col sm="10">
              <FormField label="Валюта" field={fields.details.currency} float static={isStatic}>
                <Select options={options.currencies} labelKey="title" valueKey="id" />
              </FormField>
            </Col>
          </Row>
        }
        {!!isStatic &&
          <Row>
            <Col sm="10">
              <Group>
                <Label block>Бюджет сделки</Label>
                <Static>
                  <FormattedCurrency symbol={fields.details.currency.value} value={fields.details.budget.value} />
                </Static>
              </Group>
            </Col>
          </Row>
        }
        <Row>
          <Col sm="10">
            <Group>
              <Label block>Дата завершения сделки</Label>
              <Daypicker className={cn(sUtils.fullWidth, sUtils.pushedTop_5)} restrict="past"
                onDayClick={fields.details.expectedFinishDateAt.onChange}
                disabled={isStatic}
                control={<Input className={sUtils.fullWidth} {...fields.details.expectedFinishDateAt} type="text" />}
                button={<Button className={sDaypicker.btn}><Icon className={sDaypicker.icon} icon="calendar" /></Button>} />
            </Group>
          </Col>
        </Row>

        <Row>
          <Col sm="20">
            <Label className={sUtils.pushedBottom1} block>Форма комиссии</Label>
            <Group>
              <Label className={s.radioLabel} block>
                <Input type="radio" {...fields.isAgentFixed} value="false" checked={fields.isAgentFixed.value !== `true`} disabled={isStatic} />Процент
              </Label>
              <Label className={s.radioLabel} block>
                <Input type="radio" {...fields.isAgentFixed} value="true" checked={fields.isAgentFixed.value === `true`} disabled={isStatic} />Фиксированная сумма
              </Label>
            </Group>
          </Col>
        </Row>
        {fields.isAgentFixed.value !== `true` &&
          <Row>
            <Col sm="10">
              <FormField label="Комиссия, %" field={fields.details.expectedAgentFee} float static={isStatic}>
                <Input block type="text" />
              </FormField>
            </Col>
            <Col sm="10">
              <Group>
                <Label block>Сумма комиссии</Label>
                <Static>
                  <FormattedCurrency value={this.state.commissionSum} symbol={fields.details.currency.value} />
                </Static>
              </Group>
            </Col>
          </Row>
        }
        {fields.isAgentFixed.value === `true` &&
          <Row>
            <Col sm="10">
              <FormField label="Сумма комиссии" field={fields.details.expectedAgentFixedPrice.price} float static={isStatic} price>
                <PriceInput block type="text" />
              </FormField>
            </Col>
            <Col sm="10">
              <FormField label="Валюта" field={fields.details.expectedAgentFixedPrice.currency} float static={isStatic}>
                <Select options={options.currencies} labelKey="title" valueKey="id" />
              </FormField>
            </Col>
          </Row>
        }
        {isPropertySelectionAvailable &&
          <Row>
            <Col sm="10">
              <FormField float label="ID объекта" field={fields.details.propertyId} static={isStatic}>
                <Input valueClassName="floatLabel" className={sUtils.fontSizeMd} block type="text" placeholder="ID объекта" />
              </FormField>
            </Col>
          </Row>
        }
      </section>
    );
  }
}
