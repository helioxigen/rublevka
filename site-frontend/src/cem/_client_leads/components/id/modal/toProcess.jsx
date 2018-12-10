import React, { Component } from 'react';
import cn from 'classnames';

import formHelpers from 'core/utils/normalizers';
import { fetchDictionary } from 'cem/helpers/autocomplete';
const { normalizeDate } = formHelpers;

import * as options from 'cem/constants/properties/options';
import * as dict from 'cem/constants/properties/dictionaries';
import FormField from 'cem/helpers/formField';
import { reduxForm } from 'redux-form';

import UI from 'cem/components/ui';
const {
  Daypicker, AsyncSelect, Select,
  Modal, Button, Icon, Heading, PriceInput,
  Grid: { Row, Col },
  Form: { Group, Input, Label, Static },
 } = UI;

import s from 'cem/styles/modal/list';
import sUtils from 'cem/styles/utils';
import sDaypicker from 'cem/styles/ui/daypicker';

class ModalApproved extends Component {
  constructor(...args) {
    super(args);

    this.state = {
      isOpened: false,
    };
  }

  toggle() {
    this.setState({
      isOpened: !this.state.isOpened,
    });
  }

  close() {
    this.setState({
      isOpened: false,
    });
  }

  handleSubmit() {
    const { onClick, values } = this.props;
    const { isAgentFixed } = this.props.values;

    const dealDetails = {
      expectedFinishDateAt: normalizeDate(values.expectedFinishDate),
      expectedAgentFee: isAgentFixed !== `true` ? values.expectedAgentFee : undefined,
      expectedAgentFixedPrice: isAgentFixed === `true` ? {
        price: values.expectedAgentFixedPrice.price,
        currency: values.expectedAgentFixedPrice.currency,
      } : undefined,
      budget: values.budget,
      currency: values.currency,
      offerKind: values.offerKind,
    };

    onClick({ dealDetails, contactKindId: values.contactKindId });
    this.close();
  }

  changeBudget(event) {
    const budget = event.target.value;

    this.props.fields.budget.onChange(budget);
    this.calculateCommision(this.state.commission || 0, budget);
  }

  calculateCommision(commission, budget = this.props.values.budget) {
    const { isAgentFixed } = this.props.values;

    if (isAgentFixed === `true`) {
      this.setState({ commission });
      this.props.fields.expectedCommission.onChange(commission);
    } else {
      this.setState({ commission });
      this.props.fields.expectedCommission.onChange(Math.floor((budget / 100) * commission));
    }
  }

  handleCommisionChange(event) {
    this.calculateCommision(event.target.value);
    this.props.fields.expectedAgentFee.onChange(event.target.value);
  }

  render() {
    const { fields, values, handleSubmit } = this.props;
    const budgetField = {
      ...fields.budget,
      onChange: ::this.changeBudget,
    };
    const commissionField = {
      ...fields.expectedAgentFee,
      onChange: ::this.handleCommisionChange,
    };

    return (
      <div className={s.modalContainer}>
        {React.cloneElement(this.props.children, { onClick: ::this.toggle })}

        <Modal size="sm" closePortal={::this.close} isOpened={this.state.isOpened} onClose={::this.close} closeOnEsc closeOnOutsideClick>
          <div className={s.container}>
            <Row>
              <Col xs="20">
                <Heading size="md">Конвертация в сделку</Heading>
              </Col>
            </Row>
            <Row>
              <Col xs="20" className={sUtils.pushedTop3}>
                <p className={s.text}>Чтобы продолжить требуется заполнить все поля внизу.</p>
              </Col>
            </Row>

            <Row className={sUtils.pushedTop3}>
              <Col xs="20">
                <FormField label="Тип" field={fields.offerKind} float>
                  <Select options={options.offerKinds} />
                </FormField>
              </Col>
            </Row>
            <Row>
              <Col xs="20">
                <Row>
                  <Col sm="12">
                    <FormField label="Бюджет сделки" field={budgetField} float price>
                      <PriceInput block type="text" />
                    </FormField>
                  </Col>
                  <Col sm="8">
                    <FormField label="Валюта" field={fields.currency} float>
                      <Select options={options.currencies} labelKey="title" valueKey="id" />
                    </FormField>
                  </Col>
                </Row>
              </Col>
            </Row>

            <Row>
              <Col sm="20">
                <Group>
                  <Label block>Ожидаемая дата завершения сделки</Label>
                  <Daypicker className={cn(sUtils.fullWidth, sDaypicker.daypicker)} restrict="past"
                    onDayClick={fields.expectedFinishDate.onChange}
                    control={<Input block type="text" {...fields.expectedFinishDate} />}
                    button={<Button className={sDaypicker.btn}><Icon className={sDaypicker.icon} icon="calendar" /></Button>}
                  />
                </Group>
              </Col>
            </Row>

            <Row>
              <Col sm="20">
                <Label className={sUtils.pushedBottom1} block>Форма комиссии</Label>
                <Group>
                  <Label className={s.radioLabel} block>
                    <Input type="radio" {...fields.isAgentFixed} value="false" checked={values.isAgentFixed !== `true`}/>Процент
                  </Label>
                  <Label className={s.radioLabel} block>
                    <Input type="radio" {...fields.isAgentFixed} value="true" checked={values.isAgentFixed === `true`}/>Фиксированная сумма
                  </Label>
                </Group>
              </Col>
            </Row>

            {values.isAgentFixed !== `true` && (
              <Row>
                <Col sm="10">
                  <FormField label="Комиссия, %" field={commissionField} float>
                    <Input block type="text" />
                  </FormField>
                </Col>
                <Col sm="10">
                  <Group>
                    <Label block>Ожидаемая комиссия</Label>
                    <Static>
                      {values.currency !== `RUB` && dict.currencies[values.currency]}
                      {values.expectedCommission || 0}
                      {values.currency === `RUB` && ` ${dict.currencies[values.currency] || ``}`}</Static>
                  </Group>
                </Col>
              </Row>
            )}

            {values.isAgentFixed === `true` && (
              <Row>
                <Col sm="10">
                  <FormField label="Сумма комиссии" field={fields.expectedAgentFixedPrice.price} float price>
                    <PriceInput block type="text" />
                  </FormField>
                </Col>
                <Col sm="10">
                  <FormField label="Валюта" field={fields.expectedAgentFixedPrice.currency} float>
                    <Select options={options.currencies} labelKey="title" valueKey="id" />
                  </FormField>
                </Col>
              </Row>
            )}

            <Row>
              <Col sm="20">
                <FormField label="Кем является контакт" field={fields.contactKindId} float>
                  <AsyncSelect asyncOptions={fetchDictionary(`deal_contact_type`)} labelKey="title" valueKey="id" />
                </FormField>
              </Col>
            </Row>
          </div>
          {React.cloneElement(this.props.submitBtn, { onClick: handleSubmit(::this.handleSubmit) })}
        </Modal>
      </div>
    );
  }
}

const formSettings = {
  form: `leadModalApproved`,
  fields: [
    `offerKind`, `budget`, `isAgentFixed`, `currency`, `expectedCommission`, `expectedAgentFee`, `expectedFinishDate`,
    `expectedAgentFixedPrice.price`, `expectedAgentFixedPrice.currency`, `contactKindId`,
  ],
};

export default reduxForm(formSettings)(ModalApproved);
