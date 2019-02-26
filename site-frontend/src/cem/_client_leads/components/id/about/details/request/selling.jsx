import React, { Component } from 'react';
import { Link } from 'react-router';
import recursiveCleanUp from 'cem/helpers/recursiveCleanUp';

import FormField from 'cem/helpers/formField';

import { fetchDictionary } from 'cem/helpers/autocomplete';

import * as options from 'cem/constants/properties/options';
import * as dict from 'cem/constants/properties/dictionaries';

import cn from 'classnames';
import UI from 'cem/components/ui';
const {
  Form,
  Select,
  Heading,
  PriceInput,
  AsyncSelect,
  Icon,
  Button,
  Form: { Group, Label, Input, Static, Helper },
  Grid: { Row, Col },
} = UI;

import s from 'cem/styles/id/content';
import sUtils from 'cem/styles/utils';
import sButton from 'cem/styles/buttons';

// TODO: cem/components/leads/id/static.jsx - merge and rearrange;
class Selling extends Component {
  clearOffer(dealType) {
    this.props.destroyForm();
    this.props.initializeForm({
      ...this.props.values,
      requestDetails: {
        ...this.props.values.requestDetails,
        [dealType]: {},
      },
    });
    this.props.fields.toggle.onChange(Math.random());
  }

  render() {
    const { isStatic, fields, values, data } = this.props;
    const { saleOffer, rentOffer } = fields.requestDetails;
    const isSaleOffer = !!Object.keys(
      recursiveCleanUp(this.props.values.requestDetails.saleOffer),
    ).length;
    const isRentOffer = !!Object.keys(
      recursiveCleanUp(this.props.values.requestDetails.rentOffer),
    ).length;

    return (
      <div>
        <Heading size="md">
          Информация об объекте
          {data.propertyId && (
            <Link
              className={s.linkIcon}
              to={`/properties/${data.requestDetails.category}/${
                data.propertyId
              }`}
            >
              <Icon className={s.icon} icon="arrow" />
            </Link>
          )}
        </Heading>

        <Row className={sUtils.pushedBottom3}>
          <Col sm="6">
            <FormField
              label="Категория"
              field={fields.requestDetails.category}
              static={isStatic}
              options={dict.categories}
              float
            >
              <Select
                className={cn(sUtils.minHeight3_7, sUtils.fontSizeMd)}
                options={options.categories}
                block
                valueKey="id"
                labelKey="title"
              />
            </FormField>
          </Col>
          <Col sm="6" smOffset="1">
            <FormField
              label="Тип"
              field={fields.requestDetails.kind}
              options={dict.kinds}
              float
              static={isStatic}
            >
              <Select
                className={cn(sUtils.minHeight3_7, sUtils.fontSizeMd)}
                options={options.kinds}
                block
                valueKey="id"
                labelKey="title"
              />
            </FormField>
          </Col>
          <Col sm="6" smOffset="1">
            <FormField
              label="Клиент является"
              field={fields.contactDetails.kindId}
              static={isStatic}
              asyncValue={fetchDictionary('property_contact_link_type')}
              float
            >
              <AsyncSelect
                className={cn(sUtils.minHeight3_7, sUtils.fontSizeMd)}
                asyncOptions={fetchDictionary('property_contact_link_type')}
                block
                valueKey="id"
                labelKey="title"
              />
            </FormField>
          </Col>
        </Row>

        <Heading size="md">Условия</Heading>
        <Row>
          {(!isStatic || values.requestDetails.saleOffer.price) && (
            <Col sm="10">
              <Row>
                <Col sm="14">
                  <Heading size="sm">
                    Продажа
                    {isSaleOffer && !isStatic && (
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
                <Col sm="14" className={sUtils.pushedBottom3}>
                  <Row>
                    <Col sm="10">
                      <FormField
                        label="Цена"
                        float
                        field={saleOffer.price}
                        static={isStatic}
                        price
                      >
                        <PriceInput
                          valueClassName="floatLabel"
                          className={sUtils.fontSizeMd}
                          block
                          type="text"
                          placeholder="Цена"
                        />
                      </FormField>
                    </Col>
                    <Col sm="10">
                      <FormField
                        label="Валюта"
                        float
                        field={saleOffer.currency}
                        options={dict.currencies}
                        static={isStatic}
                      >
                        <Select
                          valueClassName="floatLabel"
                          placeholder="Валюта"
                          className={cn(sUtils.minHeight3_7, sUtils.fontSizeMd)}
                          options={options.currencies}
                          block
                          valueKey="id"
                          labelKey="title"
                        />
                      </FormField>
                    </Col>
                  </Row>

                  <Row>
                    <Col sm="10">
                      <FormField
                        label="Тип cделки"
                        field={saleOffer.kind}
                        options={dict.saleKinds}
                        float
                        static={isStatic}
                      >
                        <Select
                          block
                          options={options.saleKinds}
                          placeholder="Тип сделки"
                          valueKey="id"
                          labelKey="title"
                          valueClassName="floatLabel"
                        />
                      </FormField>
                    </Col>
                    <Col sm="10">
                      <Group className={sUtils.resetIndentation}>
                        <Label className={sUtils.pushedBottom1} block>
                          Торг
                        </Label>
                        <Label
                          className={cn(s.radioLabel, sUtils.pushedRight1_5)}
                        >
                          <Input
                            type="radio"
                            {...saleOffer.isBargain}
                            value="true"
                            checked={saleOffer.isBargain.value === 'true'}
                            disabled={isStatic}
                          />{' '}
                          Есть
                        </Label>
                        <Label className={s.radioLabel}>
                          <Input
                            type="radio"
                            {...saleOffer.isBargain}
                            value="false"
                            checked={saleOffer.isBargain.value !== 'true'}
                            disabled={isStatic}
                          />{' '}
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
                        <Label
                          className={cn(s.radioLabel, sUtils.pushedRight1_5)}
                        >
                          <Input
                            type="radio"
                            {...saleOffer.isMortgage}
                            value="true"
                            checked={saleOffer.isMortgage.value === 'true'}
                            disabled={isStatic}
                          />{' '}
                          Есть
                        </Label>
                        <Label className={s.radioLabel}>
                          <Input
                            type="radio"
                            {...saleOffer.isMortgage}
                            value="false"
                            checked={saleOffer.isMortgage.value !== 'true'}
                            disabled={isStatic}
                          />{' '}
                          Нет
                        </Label>
                      </Group>
                    </Col>
                    <Col sm="10">
                      <Group className={sUtils.resetIndentation}>
                        <Label className={sUtils.pushedBottom1} block>
                          Ипотека
                        </Label>
                        <Label
                          className={cn(s.radioLabel, sUtils.pushedRight1_5)}
                        >
                          <Input
                            type="radio"
                            {...saleOffer.isInstallment}
                            value="true"
                            checked={saleOffer.isInstallment.value === 'true'}
                            disabled={isStatic}
                          />{' '}
                          Есть
                        </Label>
                        <Label className={s.radioLabel}>
                          <Input
                            type="radio"
                            {...saleOffer.isInstallment}
                            value="false"
                            checked={saleOffer.isInstallment.value !== 'true'}
                            disabled={isStatic}
                          />{' '}
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
                          saleOffer.isAgentFixed.touched &&
                          !!saleOffer.isAgentFixed.error &&
                          'error'
                        }
                      >
                        <Label className={s.radioLabel} block>
                          <Input
                            type="radio"
                            {...saleOffer.isAgentFixed}
                            value="false"
                            checked={saleOffer.isAgentFixed.value !== 'true'}
                            disabled={isStatic}
                          />{' '}
                          Процент
                        </Label>
                        <Label className={s.radioLabel} block>
                          <Input
                            type="radio"
                            {...saleOffer.isAgentFixed}
                            value="true"
                            checked={saleOffer.isAgentFixed.value === 'true'}
                            disabled={isStatic}
                          />{' '}
                          Фиксированная сумма
                        </Label>
                        {saleOffer.isAgentFixed.touched &&
                          saleOffer.isAgentFixed.error && (
                            <Helper>{saleOffer.isAgentFixed.error}</Helper>
                          )}
                      </Group>
                    </Col>
                  </Row>

                  {saleOffer.isAgentFixed.value !== 'true' && (
                    <Row>
                      <Col sm="10">
                        <FormField
                          label="Комиссия"
                          field={saleOffer.agentFee}
                          float
                          static={isStatic}
                        >
                          <Input
                            valueClassName="floatLabel"
                            block
                            type="text"
                            placeholder="Комиссия"
                          />
                        </FormField>
                      </Col>
                      <Col sm="10">
                        <Group>
                          <Form.Label block>&nbsp;</Form.Label>
                          <Static>%</Static>
                        </Group>
                      </Col>
                    </Row>
                  )}
                  {saleOffer.isAgentFixed.value === 'true' && (
                    <Row>
                      <Col sm="10">
                        <FormField
                          label="Комиссия"
                          field={saleOffer.agentFixedPrice.price}
                          float
                          static={isStatic}
                          price
                        >
                          <PriceInput
                            valueClassName="floatLabel"
                            block
                            type="text"
                            placeholder="Комиссия"
                          />
                        </FormField>
                      </Col>
                      <Col sm="10">
                        <FormField
                          label="Валюта"
                          field={saleOffer.agentFixedPrice.currency}
                          options={dict.currencies}
                          float
                          static={isStatic}
                        >
                          <Select
                            placeholder="Валюта"
                            block
                            options={options.currencies}
                            valueKey="id"
                            labelKey="title"
                            valueClassName="floatLabel"
                          />
                        </FormField>
                      </Col>
                    </Row>
                  )}
                </Col>
              </Row>
            </Col>
          )}

          {(!isStatic || values.requestDetails.rentOffer.price) && (
            <Col sm="10">
              <Row>
                <Col sm="14">
                  <Heading size="sm">
                    Аренда
                    {isRentOffer && !isStatic && (
                      <Button
                        className={sButton.btnReset}
                        type="button"
                        onClick={() => ::this.clearOffer('rentOffer')}
                      >
                        сбросить
                      </Button>
                    )}
                  </Heading>
                </Col>
              </Row>
              <Row>
                <Col sm="14" className={sUtils.pushedBottom3}>
                  <Row>
                    <Col sm="10">
                      <FormField
                        label="Цена"
                        field={rentOffer.price}
                        float
                        static={isStatic}
                        price
                      >
                        <PriceInput
                          valueClassName="floatLabel"
                          className={sUtils.fontSizeMd}
                          block
                          type="text"
                          placeholder="Цена"
                        />
                      </FormField>
                    </Col>
                    <Col sm="10">
                      <FormField
                        label="Валюта"
                        field={rentOffer.currency}
                        float
                        options={dict.currencies}
                        static={isStatic}
                      >
                        <Select
                          placeholder="Валюта"
                          className={cn(sUtils.minHeight3_7, sUtils.fontSizeMd)}
                          options={options.currencies}
                          valueKey="id"
                          labelKey="title"
                        />
                      </FormField>
                    </Col>
                  </Row>

                  <Row>
                    <Col sm="10">
                      <FormField
                        label="Период аренды"
                        field={rentOffer.period}
                        options={dict.periods}
                        float
                        static={isStatic}
                      >
                        <Select
                          placeholder="Период аренды"
                          options={options.rentPeriods}
                          valueKey="id"
                          labelKey="title"
                        />
                      </FormField>
                    </Col>
                    <Col sm="10">
                      <FormField
                        label="Залог"
                        field={rentOffer.deposit}
                        options={dict.deposits}
                        float
                        static={isStatic}
                      >
                        <Select
                          options={options.depositAmounts}
                          {...rentOffer.deposit}
                          valueKey="id"
                          labelKey="title"
                        />
                      </FormField>
                    </Col>
                  </Row>

                  <Row className={sUtils.pushedBottom1_5}>
                    <Col sm="10">
                      <Group className={sUtils.resetIndentation}>
                        <Label className={sUtils.pushedBottom1} block>
                          C детьми
                        </Label>
                        <Label
                          className={cn(s.radioLabel, sUtils.pushedRight1_5)}
                        >
                          <Input
                            type="radio"
                            {...rentOffer.isAllowedChildren}
                            value="true"
                            checked={
                              rentOffer.isAllowedChildren.value === 'true'
                            }
                            disabled={isStatic}
                          />{' '}
                          Да
                        </Label>
                        <Label className={s.radioLabel}>
                          <Input
                            type="radio"
                            {...rentOffer.isAllowedChildren}
                            value="false"
                            checked={
                              rentOffer.isAllowedChildren.value !== 'true'
                            }
                            disabled={isStatic}
                          />{' '}
                          Нет
                        </Label>
                      </Group>
                    </Col>
                    <Col sm="10">
                      <Group className={sUtils.resetIndentation}>
                        <Label className={sUtils.pushedBottom1} block>
                          C животными
                        </Label>
                        <Label
                          className={cn(s.radioLabel, sUtils.pushedRight1_5)}
                        >
                          <Input
                            type="radio"
                            {...rentOffer.isAllowedPets}
                            value="true"
                            checked={rentOffer.isAllowedPets.value === 'true'}
                            disabled={isStatic}
                          />{' '}
                          Да
                        </Label>
                        <Label className={s.radioLabel}>
                          <Input
                            type="radio"
                            {...rentOffer.isAllowedPets}
                            value="false"
                            checked={rentOffer.isAllowedPets.value !== 'true'}
                            disabled={isStatic}
                          />{' '}
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
                          rentOffer.isAgentFixed.touched &&
                          !!rentOffer.isAgentFixed.error &&
                          'error'
                        }
                      >
                        <Label className={s.radioLabel} block>
                          <Input
                            type="radio"
                            {...rentOffer.isAgentFixed}
                            value="false"
                            checked={rentOffer.isAgentFixed.value !== 'true'}
                            disabled={isStatic}
                          />{' '}
                          Процент
                        </Label>
                        <Label className={s.radioLabel} block>
                          <Input
                            type="radio"
                            {...rentOffer.isAgentFixed}
                            value="true"
                            checked={rentOffer.isAgentFixed.value === 'true'}
                            disabled={isStatic}
                          />{' '}
                          Фиксированная сумма
                        </Label>
                        {rentOffer.isAgentFixed.touched &&
                          rentOffer.isAgentFixed.error && (
                            <Helper>{rentOffer.isAgentFixed.error}</Helper>
                          )}
                      </Group>
                    </Col>
                  </Row>

                  {rentOffer.isAgentFixed.value !== 'true' && (
                    <Row>
                      <Col sm="10">
                        <FormField
                          label="Комиссия"
                          field={rentOffer.agentFee}
                          float
                          static={isStatic}
                        >
                          <Input
                            valueClassName="floatLabel"
                            block
                            type="text"
                            placeholder="Комиссия"
                          />
                        </FormField>
                      </Col>
                      <Col sm="10">
                        <Group>
                          <Form.Label block>&nbsp;</Form.Label>
                          <Static>%</Static>
                        </Group>
                      </Col>
                    </Row>
                  )}
                  {rentOffer.isAgentFixed.value === 'true' && (
                    <Row>
                      <Col sm="10">
                        <FormField
                          label="Комиссия"
                          field={rentOffer.agentFixedPrice.price}
                          float
                          static={isStatic}
                          price
                        >
                          <PriceInput
                            valueClassName="floatLabel"
                            block
                            type="text"
                            placeholder="Комиссия"
                          />
                        </FormField>
                      </Col>
                      <Col sm="10">
                        <FormField
                          label="Валюта"
                          field={rentOffer.agentFixedPrice.currency}
                          options={dict.currencies}
                          float
                          static={isStatic}
                        >
                          <Select
                            block
                            options={options.currencies}
                            valueKey="id"
                            labelKey="title"
                          />
                        </FormField>
                      </Col>
                    </Row>
                  )}
                </Col>
              </Row>
            </Col>
          )}
        </Row>
      </div>
    );
  }
}

export default Selling;
