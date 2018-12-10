import React, { Component } from 'react';

import { recursiveCleanUp } from 'cem/helpers';

import UI from 'cem/components/ui';
const {
  Button,
  Select,
  Heading,
  PriceInput,
  Form: { Input, Group, Static, Helper, Label },
  Grid: { Row, Col },
} = UI;

import FormField from 'cem/helpers/formField';

import cn from 'classnames';
import s from 'cem/styles/id/content';
import sUtils from 'cem/styles/utils';
import sButton from 'cem/styles/buttons';

export default class extends Component {
  clearOffer(dealType) {
    this.props.destroyForm();
    this.props.initializeForm({ ...this.props.values, [dealType]: {} });
    this.props.fields.toggle.onChange(Math.random());
  }

  render() {
    const { fields: { saleOffer, rentOffer }, options, isUpdateAllowed } = this.props;
    const isSaleOffer = !!Object.keys(recursiveCleanUp(this.props.values.saleOffer)).length;
    const isRentOffer = !!Object.keys(recursiveCleanUp(this.props.values.rentOffer)).length;

    return (
      <section className={this.props.className}>
        <Row>
          <Col xs="20">
            <Heading size="md">Условия</Heading>
          </Col>
        </Row>

        <Row>
          <Col sm="10">
            <Row>
              <Col lg="16">
                <Heading size="sm">
                  Продажа
                  {isSaleOffer &&
                  isUpdateAllowed && (
                    <Button
                      className={sButton.btnReset}
                      type="button"
                      onClick={() => ::this.clearOffer('saleOffer')}
                    >
                      сбросить
                    </Button>
                  )}
                </Heading>
              </Col>
            </Row>
            <Row>
              <Col lg="16" className={sUtils.pushedBottom3}>
                <Row>
                  <Col sm="10">
                    <FormField
                      field={saleOffer.price}
                      label="Цена"
                      static={!isUpdateAllowed}
                      price
                      float
                    >
                      <PriceInput className={sUtils.fontSizeMd} type="text" block />
                    </FormField>
                  </Col>
                  <Col sm="10">
                    <Group
                      kind={saleOffer.currency.touched && !!saleOffer.currency.error && 'error'}
                    >
                      <Label>Валюта</Label>
                      <Select
                        className={cn(sUtils.minheight3_7, sUtils.fontSizeMd)}
                        disabled={!isUpdateAllowed}
                        options={options.currencies}
                        {...saleOffer.currency}
                        labelKey="title"
                        valueKey="id"
                      />
                      {saleOffer.currency.touched &&
                      saleOffer.currency.error && <Helper>{saleOffer.currency.error}</Helper>}
                    </Group>
                  </Col>
                </Row>

                <Row>
                  <Col md="10">
                    <Group kind={saleOffer.kind.touched && !!saleOffer.kind.error && 'error'}>
                      <Label>Тип сделки</Label>
                      <Select
                        options={options.saleKinds}
                        disabled={!isUpdateAllowed}
                        {...saleOffer.kind}
                        labelKey="title"
                        valueKey="id"
                      />
                      {saleOffer.kind.touched &&
                      saleOffer.kind.error && <Helper>{saleOffer.kind.error}</Helper>}
                    </Group>
                  </Col>
                  <Col md="10">
                    <Group
                      kind={saleOffer.isResale.touched && !!saleOffer.isResale.error && 'error'}
                    >
                      <Label>Тип продажи</Label>
                      {/* <Static>{dictionaries.resaleKinds[saleOffer.isResale.value]}</Static> */}
                      <Select
                        options={options.resaleKinds}
                        {...saleOffer.isResale}
                        disabled={!isUpdateAllowed}
                      />
                      {saleOffer.isResale.touched &&
                      saleOffer.isResale.error && <Helper>{saleOffer.isResale.error}</Helper>}
                    </Group>
                  </Col>
                </Row>

                <Row className={sUtils.pushedBottom1_5}>
                  <Col sm="10">
                    <Group className={sUtils.resetIndentation}>
                      <Label className={sUtils.pushedBottom1} block>
                        Показать на сайте
                      </Label>
                      <Label className={cn(s.radioLabel, sUtils.pushedRight1_5)}>
                        <Input
                          type="radio"
                          {...saleOffer.isDisabled}
                          value={false}
                          checked={saleOffer.isDisabled.value === 'false'}
                          disabled={!isUpdateAllowed}
                        />
                        Да
                      </Label>
                      <Label className={s.radioLabel}>
                        <Input
                          type="radio"
                          {...saleOffer.isDisabled}
                          value
                          checked={saleOffer.isDisabled.value === 'true'}
                          disabled={!isUpdateAllowed}
                        />
                        Нет
                      </Label>
                    </Group>
                  </Col>
                  <Col sm="10">
                    <Group className={sUtils.resetIndentation}>
                      <Label className={sUtils.pushedBottom1} block>
                        Ипотека
                      </Label>
                      <Label className={cn(s.radioLabel, sUtils.pushedRight1_5)}>
                        <Input
                          type="radio"
                          {...saleOffer.isMortgage}
                          value
                          checked={saleOffer.isMortgage.value === 'true'}
                          disabled={!isUpdateAllowed}
                        />
                        Есть
                      </Label>
                      <Label className={s.radioLabel}>
                        <Input
                          type="radio"
                          {...saleOffer.isMortgage}
                          value={false}
                          checked={saleOffer.isMortgage.value !== 'true'}
                          disabled={!isUpdateAllowed}
                        />
                        Нет
                      </Label>
                    </Group>
                  </Col>
                </Row>

                <Row className={sUtils.pushedBottom1_5}>
                  <Col sm="10">
                    <Group className={sUtils.resetIndentation}>
                      <Label className={sUtils.pushedBottom1} block>
                        Рассрочка
                      </Label>
                      <Label className={cn(s.radioLabel, sUtils.pushedRight1_5)}>
                        <Input
                          type="radio"
                          {...saleOffer.isInstallment}
                          value
                          checked={saleOffer.isInstallment.value === 'true'}
                          disabled={!isUpdateAllowed}
                        />
                        Есть
                      </Label>
                      <Label className={s.radioLabel}>
                        <Input
                          type="radio"
                          {...saleOffer.isInstallment}
                          value={false}
                          checked={saleOffer.isInstallment.value !== 'true'}
                          disabled={!isUpdateAllowed}
                        />
                        Нет
                      </Label>
                    </Group>
                  </Col>
                  <Col sm="10">
                    <Group className={sUtils.resetIndentation}>
                      <Label className={sUtils.pushedBottom1} block>
                        Торг
                      </Label>
                      <Label className={cn(s.radioLabel, sUtils.pushedRight1_5)}>
                        <Input
                          type="radio"
                          {...saleOffer.isBargain}
                          value
                          checked={saleOffer.isBargain.value === 'true'}
                          disabled={!isUpdateAllowed}
                        />
                        Есть
                      </Label>
                      <Label className={s.radioLabel}>
                        <Input
                          type="radio"
                          {...saleOffer.isBargain}
                          value={false}
                          checked={saleOffer.isBargain.value !== 'true'}
                          disabled={!isUpdateAllowed}
                        />
                        Нет
                      </Label>
                    </Group>
                  </Col>
                </Row>

                <Row>
                  <Col sm="20">
                    <Label className={sUtils.pushedBottom1} block>
                      Форма комиссии
                    </Label>
                    <Group
                      kind={
                        saleOffer.isAgentFixed.touched && !!saleOffer.isAgentFixed.error && 'error'
                      }
                    >
                      <Label className={s.radioLabel} block>
                        <Input
                          type="radio"
                          {...saleOffer.isAgentFixed}
                          value="false"
                          checked={saleOffer.isAgentFixed.value === 'false'}
                          disabled={!isUpdateAllowed}
                        />
                        Процент
                      </Label>
                      <Label className={s.radioLabel} block>
                        <Input
                          type="radio"
                          {...saleOffer.isAgentFixed}
                          value="true"
                          checked={saleOffer.isAgentFixed.value === 'true'}
                          disabled={!isUpdateAllowed}
                        />
                        Фиксированная сумма
                      </Label>
                      {saleOffer.isAgentFixed.touched &&
                      saleOffer.isAgentFixed.error && (
                        <Helper>{saleOffer.isAgentFixed.error}</Helper>
                      )}
                    </Group>
                  </Col>
                </Row>

                {saleOffer.isAgentFixed.value && (
                  <Row>
                    <Col sm="10">
                      {saleOffer.isAgentFixed.value === 'true' && (
                        <FormField
                          label="Сумма комиссии"
                          field={saleOffer.agentFixedPrice.price}
                          float
                          static={!isUpdateAllowed}
                          price
                        >
                          <PriceInput valueClassName="floatLabel" block type="text" />
                        </FormField>
                      )}
                      {saleOffer.isAgentFixed.value !== 'true' &&
                      isUpdateAllowed && (
                        <Group
                          float
                          kind={saleOffer.agentFee.touched && !!saleOffer.agentFee.error && 'error'}
                        >
                          <Input
                            valueClassName="floatLabel"
                            placeholder="Процент комиссии"
                            block
                            type="text"
                            {...saleOffer.agentFee}
                          />
                          <Label>Процент комиссии</Label>
                          {saleOffer.agentFee.touched &&
                          saleOffer.agentFee.error && <Helper>{saleOffer.agentFee.error}</Helper>}
                        </Group>
                      )}
                      {saleOffer.isAgentFixed.value !== 'true' &&
                      !isUpdateAllowed && (
                        <Group>
                          <Label block>Процент комиссии</Label>
                          <Static>{saleOffer.agentFee.value}</Static>
                        </Group>
                      )}
                    </Col>
                    <Col sm="10">
                      {saleOffer.isAgentFixed.value === 'true' && (
                        <Group
                          kind={
                            saleOffer.agentFixedPrice.currency.touched &&
                            !!saleOffer.agentFixedPrice.currency.error &&
                            'error'
                          }
                        >
                          <Label>Валюта</Label>
                          <Select
                            options={options.currencies}
                            disabled={!isUpdateAllowed}
                            {...saleOffer.agentFixedPrice.currency}
                            labelKey="title"
                            valueKey="id"
                          />
                          {saleOffer.agentFixedPrice.currency.touched &&
                          saleOffer.agentFixedPrice.currency.error && (
                            <Helper>{saleOffer.agentFixedPrice.currency.error}</Helper>
                          )}
                        </Group>
                      )}
                    </Col>
                  </Row>
                )}
              </Col>
            </Row>
          </Col>

          <Col sm="10">
            <Row>
              <Col lg="16">
                <Heading size="sm">
                  Аренда
                  {isRentOffer &&
                  isUpdateAllowed && (
                    <Button
                      type="button"
                      className={sButton.btnReset}
                      onClick={() => ::this.clearOffer('rentOffer')}
                    >
                      сбросить
                    </Button>
                  )}
                </Heading>
              </Col>
            </Row>
            <Row>
              <Col lg="16" className={sUtils.pushedBottom3}>
                <Row>
                  <Col sm="10">
                    <FormField
                      field={rentOffer.price}
                      label="Цена"
                      float
                      static={!isUpdateAllowed}
                      price
                    >
                      <PriceInput className={sUtils.fontSizeMd} type="text" block />
                    </FormField>
                  </Col>
                  <Col sm="10">
                    <Group
                      kind={rentOffer.currency.touched && !!rentOffer.currency.error && 'error'}
                    >
                      <Label>Валюта</Label>
                      <Select
                        className={cn(sUtils.minheight3_7, sUtils.fontSizeMd)}
                        disabled={!isUpdateAllowed}
                        {...rentOffer.currency}
                        options={options.currencies}
                        valueKey="id"
                        labelKey="title"
                        onBlur={() => {}}
                      />
                      {rentOffer.currency.touched &&
                      rentOffer.currency.error && <Helper>{rentOffer.currency.error}</Helper>}
                    </Group>
                  </Col>
                </Row>

                <Row>
                  <Col md="10">
                    <Group kind={rentOffer.period.touched && !!rentOffer.period.error && 'error'}>
                      <Label>Период аренды</Label>
                      <Select
                        {...rentOffer.period}
                        disabled={!isUpdateAllowed}
                        options={options.rentPeriods}
                        valueKey="id"
                        labelKey="title"
                      />
                      {rentOffer.period.touched &&
                      rentOffer.period.error && <Helper>{rentOffer.period.error}</Helper>}
                    </Group>
                  </Col>
                  <Col md="10">
                    <Group kind={rentOffer.deposit.touched && !!rentOffer.deposit.error && 'error'}>
                      <Label>Залог</Label>
                      <Select
                        {...rentOffer.deposit}
                        disabled={!isUpdateAllowed}
                        options={options.depositAmounts}
                        valueKey="id"
                        labelKey="title"
                      />
                      {rentOffer.deposit.touched &&
                      rentOffer.deposit.error && <Helper>{rentOffer.deposit.error}</Helper>}
                    </Group>
                  </Col>
                </Row>

                <Row className={sUtils.pushedBottom1_5}>
                  <Col sm="10">
                    <Group className={sUtils.resetIndentation}>
                      <Label className={sUtils.pushedBottom1} block>
                        Показать на сайте
                      </Label>
                      <Label className={cn(s.radioLabel, sUtils.pushedRight1_5)}>
                        <Input
                          type="radio"
                          {...rentOffer.isDisabled}
                          value={false}
                          checked={rentOffer.isDisabled.value === 'false'}
                          disabled={!isUpdateAllowed}
                        />
                        Да
                      </Label>
                      <Label className={s.radioLabel}>
                        <Input
                          type="radio"
                          {...rentOffer.isDisabled}
                          value
                          checked={rentOffer.isDisabled.value === 'true'}
                          disabled={!isUpdateAllowed}
                        />
                        Нет
                      </Label>
                    </Group>
                  </Col>
                </Row>

                <Row className={sUtils.pushedBottom1_5}>
                  <Col sm="10">
                    <Group className={sUtils.resetIndentation}>
                      <Label className={sUtils.pushedBottom1} block>
                        С детьми
                      </Label>
                      <Label className={cn(s.radioLabel, sUtils.pushedRight1_5)}>
                        <Input
                          type="radio"
                          {...rentOffer.isAllowedChildren}
                          value
                          checked={rentOffer.isAllowedChildren.value === 'true'}
                          disabled={!isUpdateAllowed}
                        />
                        Да
                      </Label>
                      <Label className={s.radioLabel}>
                        <Input
                          type="radio"
                          {...rentOffer.isAllowedChildren}
                          value={false}
                          checked={rentOffer.isAllowedChildren.value !== 'true'}
                          disabled={!isUpdateAllowed}
                        />
                        Нет
                      </Label>
                    </Group>
                  </Col>
                  <Col sm="10">
                    <Group className={sUtils.resetIndentation}>
                      <Label className={sUtils.pushedBottom1} block>
                        С животными
                      </Label>
                      <Label className={cn(s.radioLabel, sUtils.pushedRight1_5)}>
                        <Input
                          type="radio"
                          {...rentOffer.isAllowedPets}
                          value
                          checked={rentOffer.isAllowedPets.value === 'true'}
                          disabled={!isUpdateAllowed}
                        />
                        Да
                      </Label>
                      <Label className={s.radioLabel}>
                        <Input
                          type="radio"
                          {...rentOffer.isAllowedPets}
                          value={false}
                          checked={rentOffer.isAllowedPets.value !== 'true'}
                          disabled={!isUpdateAllowed}
                        />
                        Нет
                      </Label>
                    </Group>
                  </Col>
                </Row>

                <Row>
                  <Col sm="20">
                    <Label className={sUtils.pushedBottom1} block>
                      Форма комиссии
                    </Label>
                    <Group
                      kind={
                        rentOffer.isAgentFixed.touched && !!rentOffer.isAgentFixed.error && 'error'
                      }
                    >
                      <Label className={s.radioLabel} block>
                        <Input
                          type="radio"
                          {...rentOffer.isAgentFixed}
                          value="false"
                          checked={rentOffer.isAgentFixed.value === 'false'}
                          disabled={!isUpdateAllowed}
                        />
                        Процент
                      </Label>
                      <Label className={s.radioLabel} block>
                        <Input
                          type="radio"
                          {...rentOffer.isAgentFixed}
                          value="true"
                          checked={rentOffer.isAgentFixed.value === 'true'}
                          disabled={!isUpdateAllowed}
                        />
                        Фиксированная сумма
                      </Label>
                      {rentOffer.isAgentFixed.touched &&
                      rentOffer.isAgentFixed.error && (
                        <Helper>{rentOffer.isAgentFixed.error}</Helper>
                      )}
                    </Group>
                  </Col>
                </Row>

                {rentOffer.isAgentFixed.value && (
                  <Row>
                    <Col sm="10">
                      {rentOffer.isAgentFixed.value === 'true' && (
                        <FormField
                          label="Сумма комиссии"
                          field={rentOffer.agentFixedPrice.price}
                          float
                          static={!isUpdateAllowed}
                          price
                        >
                          <PriceInput valueClassName="floatLabel" block type="text" />
                        </FormField>
                      )}
                      {rentOffer.isAgentFixed.value !== 'true' &&
                      isUpdateAllowed && (
                        <Group
                          float
                          kind={rentOffer.agentFee.touched && !!rentOffer.agentFee.error && 'error'}
                        >
                          <Input
                            valueClassName="floatLabel"
                            placeholder="Процент комиссии"
                            block
                            type="text"
                            {...rentOffer.agentFee}
                          />
                          <Label>Процент комиссии</Label>
                          {rentOffer.agentFee.touched &&
                          rentOffer.agentFee.error && <Helper>{rentOffer.agentFee.error}</Helper>}
                        </Group>
                      )}
                      {rentOffer.isAgentFixed.value !== 'true' &&
                      !isUpdateAllowed && (
                        <Group>
                          <Label block>Процент комиссии</Label>
                          <Static>{rentOffer.agentFee.value}</Static>
                        </Group>
                      )}
                    </Col>
                    <Col sm="10">
                      {rentOffer.isAgentFixed.value === 'true' && (
                        <Group
                          kind={
                            rentOffer.agentFixedPrice.currency.touched &&
                            !!rentOffer.agentFixedPrice.currency.error &&
                            'error'
                          }
                        >
                          <Label>Валюта</Label>
                          <Select
                            options={options.currencies}
                            disabled={!isUpdateAllowed}
                            {...rentOffer.agentFixedPrice.currency}
                            labelKey="title"
                            valueKey="id"
                          />
                          {rentOffer.agentFixedPrice.currency.touched &&
                          rentOffer.agentFixedPrice.currency.error && (
                            <Helper>{rentOffer.agentFixedPrice.currency.error}</Helper>
                          )}
                        </Group>
                      )}
                    </Col>
                  </Row>
                )}
              </Col>
            </Row>
          </Col>
        </Row>
      </section>
    );
  }
}
