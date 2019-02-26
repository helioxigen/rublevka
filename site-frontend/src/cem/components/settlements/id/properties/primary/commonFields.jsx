import React, { Component } from 'react';

import FormField from 'cem/helpers/formField';

import UI from 'cem/components/ui';
const {
  Select,
  Heading,
  PriceInput,
  Grid: { Row, Col },
  Form: { Input, Group, Label, Helper },
} = UI;

import cn from 'classnames';
import s from 'cem/styles/id/content';
import sUtils from 'cem/styles/utils';

import * as options from 'cem/constants/properties/options';
import * as dict from 'cem/constants/properties/dictionaries';

class CommonFields extends Component {
  render() {
    const { isUpdateAllowed, fields } = this.props;

    return (
      <Row>
        <Col xs="20" className={sUtils.pushedBottom2}>
          <Heading size="xmd">Общие характеристики</Heading>
          <p className={sUtils.resetIndent}>
            Выбранные характеристики будут применены ко всем новым объектам
          </p>
        </Col>
        <Col sm="10">
          <Row>
            <Col xs="20">
              <Heading size="xs">Продажа</Heading>
            </Col>
          </Row>
          <Row>
            <Col lg="16" className={sUtils.pushedBottom3}>
              <Row className={sUtils.pushedBottom1_5}>
                <Col sm="10">
                  <Group className={sUtils.resetIndentation}>
                    <Label className={sUtils.pushedBottom1} block>
                      Ипотека
                    </Label>
                    <Label className={cn(s.radioLabel, sUtils.pushedRight1_5)}>
                      <Input
                        type="radio"
                        {...fields.saleOffer.isMortgage}
                        value
                        checked={fields.saleOffer.isMortgage.value === 'true'}
                        disabled={!isUpdateAllowed}
                      />
                      Есть
                    </Label>
                    <Label className={s.radioLabel}>
                      <Input
                        type="radio"
                        {...fields.saleOffer.isMortgage}
                        value={false}
                        checked={fields.saleOffer.isMortgage.value !== 'true'}
                        disabled={!isUpdateAllowed}
                      />
                      Нет
                    </Label>
                  </Group>
                </Col>
                <Col sm="10">
                  <Group className={sUtils.resetIndentation}>
                    <Label className={sUtils.pushedBottom1} block>
                      Рассрочка
                    </Label>
                    <Label className={cn(s.radioLabel, sUtils.pushedRight1_5)}>
                      <Input
                        type="radio"
                        {...fields.saleOffer.isInstallment}
                        value
                        checked={
                          fields.saleOffer.isInstallment.value === 'true'
                        }
                        disabled={!isUpdateAllowed}
                      />
                      Есть
                    </Label>
                    <Label className={s.radioLabel}>
                      <Input
                        type="radio"
                        {...fields.saleOffer.isInstallment}
                        value={false}
                        checked={
                          fields.saleOffer.isInstallment.value !== 'true'
                        }
                        disabled={!isUpdateAllowed}
                      />
                      Нет
                    </Label>
                  </Group>
                </Col>
              </Row>
              <Row className={sUtils.pushedBottom1_5}>
                <Col xs="10">
                  <Group className={sUtils.resetIndentation}>
                    <Label className={sUtils.pushedBottom1} block>
                      Торг
                    </Label>
                    <Label className={cn(s.radioLabel, sUtils.pushedRight1_5)}>
                      <Input
                        type="radio"
                        {...fields.saleOffer.isBargain}
                        value
                        checked={fields.saleOffer.isBargain.value === 'true'}
                        disabled={!isUpdateAllowed}
                      />
                      Есть
                    </Label>
                    <Label className={s.radioLabel}>
                      <Input
                        type="radio"
                        {...fields.saleOffer.isBargain}
                        value={false}
                        checked={fields.saleOffer.isBargain.value !== 'true'}
                        disabled={!isUpdateAllowed}
                      />
                      Нет
                    </Label>
                  </Group>
                </Col>
                <Col sm="10">
                  <FormField
                    field={fields.saleOffer.kind}
                    options={dict.saleKinds}
                    label="Тип сделки"
                    float
                    static={!isUpdateAllowed}
                  >
                    <Select
                      valueKey="id"
                      labelKey="title"
                      options={options.saleKinds}
                    />
                  </FormField>
                </Col>
              </Row>
              <Row>
                <Col sm="20">
                  <Label className={sUtils.pushedBottom1} block>
                    Форма комиссии
                  </Label>
                  <Group
                    kind={
                      fields.saleOffer.isAgentFixed.touched &&
                      !!fields.saleOffer.isAgentFixed.error &&
                      'error'
                    }
                  >
                    <Label className={s.radioLabel} block>
                      <Input
                        type="radio"
                        {...fields.saleOffer.isAgentFixed}
                        value="false"
                        checked={
                          fields.saleOffer.isAgentFixed.value === 'false'
                        }
                        disabled={!isUpdateAllowed}
                      />
                      Процент
                    </Label>
                    <Label className={s.radioLabel} block>
                      <Input
                        type="radio"
                        {...fields.saleOffer.isAgentFixed}
                        value="true"
                        checked={fields.saleOffer.isAgentFixed.value === 'true'}
                        disabled={!isUpdateAllowed}
                      />
                      Фиксированная сумма
                    </Label>
                    {fields.saleOffer.isAgentFixed.touched &&
                      fields.saleOffer.isAgentFixed.error && (
                        <Helper>{fields.saleOffer.isAgentFixed.error}</Helper>
                      )}
                  </Group>
                </Col>
              </Row>
              {fields.saleOffer.isAgentFixed.value && (
                <Row>
                  <Col sm="10">
                    {fields.saleOffer.isAgentFixed.value === 'true' && (
                      <FormField
                        field={fields.saleOffer.agentFixedPrice.price}
                        label="Сумма комиссии"
                        float
                        static={!isUpdateAllowed}
                        price
                      >
                        <PriceInput block type="text" />
                      </FormField>
                    )}
                    {fields.saleOffer.isAgentFixed.value !== 'true' && (
                      <FormField
                        field={fields.saleOffer.agentFee}
                        label="Процент комиссии"
                        float
                        static={!isUpdateAllowed}
                      >
                        <Input block type="text" />
                      </FormField>
                    )}
                  </Col>
                  <Col sm="10">
                    {fields.saleOffer.isAgentFixed.value === 'true' && (
                      <FormField
                        field={fields.saleOffer.agentFixedPrice.currency}
                        options={dict.currencies}
                        label="Валюта"
                        float
                        static={!isUpdateAllowed}
                      >
                        <Select
                          valueKey="id"
                          labelKey="title"
                          options={options.currencies}
                        />
                      </FormField>
                    )}
                  </Col>
                </Row>
              )}
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}

export default CommonFields;
