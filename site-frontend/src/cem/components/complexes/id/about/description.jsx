import React, { Component } from 'react';

import UI from 'cem/components/ui';
const {
  // AsyncSelect,
  Select, Heading,
  Daypicker, Button, Icon,
  Form: { Group, Label, Input, Helper },
  Grid: { Row, Col },
} = UI;

// import ConditionalInput from 'cem/components/common/conditionalInput';

import FormField from 'cem/helpers/formField';

// import CreateCompanyModal from 'cem/containers/companies/create';

import cn from 'classnames';
import s from 'cem/styles/id/content';
import sUtils from 'cem/styles/utils';
import sDaypicker from 'cem/styles/ui/daypicker';

// import { fetchResource, findCompanies } from 'cem/helpers/autocomplete';

// import { companyStates } from 'cem/constants/dadata/dictionaries';
import * as options from 'cem/constants/complexes/options';

// import isEqual from 'lodash/isEqual';

// const formatCompanyLabel = ({ name, ogrn }) => `${name} (ОГРН: ${ogrn})`;

// const fetchCompany = fetchResource(`/v1/companies`, `name`, formatCompanyLabel, {}, {}, findCompanies);

class Description extends Component {
  // onChangeAccreditors(newValues, { value, ...data } = {}) {
  //   const { fields } = this.props;
  //
  //   // On adding or removing existing item
  //   if (value || (!value && isEqual(data, {}))) {
  //     fields.accreditors.onChange(newValues);
  //     this.setState({ isOpened: false });
  //
  //   // On adding new item
  //   } else {
  //     const address = data.address.value;
  //     const registeredAt = new Date(data.state.registration_date);
  //     const initialValues = {
  //       name: data.name.short_with_opf,
  //       ogrn: data.ogrn,
  //       inn: data.inn,
  //       address: [address],
  //       state: companyStates[data.state.status],
  //       kpp: data.kpp || `Нет`,
  //       opf: (data.opf && data.opf.code) || `Нет`,
  //       registeredAt: registeredAt.toISOString().split(`T`)[0],
  //       ceoName: data.management && data.management.name,
  //       ceoPosition: data.management && data.management.post,
  //     };
  //     this.setState({ initialValues, isOpened: true });
  //   }
  // }
  //
  // addBank(id) {
  //   const { fields, values } = this.props;
  //
  //   fields.accreditors.onChange([...values.accreditors, Number(id)]);
  //   this.setState({ isOpened: false });
  // }

  render() {
    const { fields, formKey, isUpdateAllowed } = this.props;

    // const accreditorsField = {
    //   ...fields.accreditors,
    //   onChange: ::this.onChangeAccreditors,
    // };

    return (
      <section className={this.props.className}>
        <Heading size="md">Описание</Heading>
        <Row>
          <Col sm="10">
            <Heading size="sm">Срок сдачи</Heading>
            <Row>
              <Col lg="16">
                <Row>
                  <Col sm="10" md="8">
                    <FormField label="Квартал" field={fields.commissioningQuarter} float static={!isUpdateAllowed && formKey !== 'create'}>
                      <Select options={options.quarters} {...fields.commissioningQuarter} disableReset />
                    </FormField>
                  </Col>
                  <Col sm="10" md="12">
                    <FormField field={fields.commissioningYear} label="Год" float static={!isUpdateAllowed && formKey !== 'create'}>
                      <Input block type="text" />
                    </FormField>
                  </Col>
                </Row>
                <Row>
                  <Col sm="20">
                    <Group kind={fields.keysIssueDate.touched && !!fields.keysIssueDate.error && 'error'}>
                      <Label block>Дата получения ключей</Label>
                      <Daypicker
                        className={cn(sUtils.displayBlock, sUtils.noMargin)} kind="from"
                        control={<Input block type="text" {...fields.keysIssueDate} />}
                        button={<Button className={sDaypicker.btn}><Icon className={sDaypicker.icon} icon="calendar" /></Button>}
                        disabled={formKey !== 'create' && !isUpdateAllowed}
                        onDayClick={day => fields.keysIssueDate.onBlur(day)}
                      />
                      {fields.keysIssueDate.touched && fields.keysIssueDate.error && <Helper className={sDaypicker.helperDaypicker}>{fields.keysIssueDate.error}</Helper>}
                    </Group>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
          <Col sm="10">
            <Heading size="sm">Придомовая территория</Heading>
            <Row>
              <Col lg="16">
                <Row>
                  <Col sm="10">
                    <FormField field={fields.adjacentTerritory.area} label="Количество гектар" float static={!isUpdateAllowed && formKey !== 'create'}>
                      <Input block type="text" />
                    </FormField>
                  </Col>
                  <Col sm="10">
                    <FormField field={fields.adjacentTerritory.playgrounds} label="Детских площадок" float static={!isUpdateAllowed && formKey !== 'create'}>
                      <Input block type="text" />
                    </FormField>
                  </Col>
                </Row>
                <Row>
                  <Col sm="8">
                    <Group kind={fields.adjacentTerritory.isAccessOpen.touched && !!fields.adjacentTerritory.isAccessOpen.error && 'error'}>
                      <Label className={sUtils.pushedBottom1} block>Доступ</Label>
                      <Label className={cn(s.radioLabel, sUtils.pushedRight1_5)}><Input type="radio" {...fields.adjacentTerritory.isAccessOpen} value checked={fields.adjacentTerritory.isAccessOpen.value === 'true'} disabled={!isUpdateAllowed && formKey !== 'create'} />Открытый</Label>
                      <Label className={s.radioLabel}><Input type="radio" {...fields.adjacentTerritory.isAccessOpen} value={false} checked={fields.adjacentTerritory.isAccessOpen.value !== 'true'} disabled={!isUpdateAllowed && formKey !== 'create'} />Закрытый</Label>
                      {fields.adjacentTerritory.isAccessOpen.touched && fields.adjacentTerritory.isAccessOpen.error && <Helper>{fields.adjacentTerritory.isAccessOpen.error}</Helper>}
                    </Group>
                  </Col>
                  <Col sm="7">
                    <Group kind={fields.adjacentTerritory.isAllowedCars.touched && !!fields.adjacentTerritory.isAllowedCars.error && 'error'}>
                      <Label className={sUtils.pushedBottom1} block>Машинам</Label>
                      <Label className={cn(s.radioLabel, sUtils.pushedRight1_5)}><Input type="radio" {...fields.adjacentTerritory.isAllowedCars} value checked={fields.adjacentTerritory.isAllowedCars.value === 'true'} disabled={!isUpdateAllowed && formKey !== 'create'} />Можно</Label>
                      <Label className={s.radioLabel}><Input type="radio" {...fields.adjacentTerritory.isAllowedCars} value={false} checked={fields.adjacentTerritory.isAllowedCars.value !== 'true'} disabled={!isUpdateAllowed && formKey !== 'create'} />Нельзя</Label>
                      {fields.adjacentTerritory.isAllowedCars.touched && fields.adjacentTerritory.isAllowedCars.error && <Helper>{fields.adjacentTerritory.isAllowedCars.error}</Helper>}
                    </Group>
                  </Col>
                  <Col sm="5">
                    <Group kind={fields.adjacentTerritory.isGreeneryPlanted.touched && !!fields.adjacentTerritory.isGreeneryPlanted.error && 'error'}>
                      <Label className={sUtils.pushedBottom1} block>Озеленение</Label>
                      <Label className={cn(s.radioLabel, sUtils.pushedRight1_5)}><Input type="radio" {...fields.adjacentTerritory.isGreeneryPlanted} value checked={fields.adjacentTerritory.isGreeneryPlanted.value === 'true'} disabled={!isUpdateAllowed && formKey !== 'create'} />Да</Label>
                      <Label className={s.radioLabel}><Input type="radio" {...fields.adjacentTerritory.isGreeneryPlanted} value={false} checked={fields.adjacentTerritory.isGreeneryPlanted.value !== 'true'} disabled={!isUpdateAllowed && formKey !== 'create'} />Нет</Label>
                      {fields.adjacentTerritory.isGreeneryPlanted.touched && fields.adjacentTerritory.isGreeneryPlanted.error && <Helper>{fields.adjacentTerritory.isGreeneryPlanted.error}</Helper>}
                    </Group>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
        {/* <Row className={sUtils.pushedBottom3}>
          <Col sm="20">
            <Heading size="sm">Банки, аккредитовавшие ЖК</Heading>
            <FormField field={accreditorsField} asyncValue={fetchCompany} static={!isUpdateAllowed && formKey !== `create`}>
              <AsyncSelect multi block type="text" asyncOptions={fetchCompany} />
            </FormField>
            <CreateCompanyModal formKey="create" {...this.state} ref="createBank" disableSearch callback={::this.addBank} closePortal={() => this.setState({ isOpened: false })} />
          </Col>
        </Row>
        <Row className={sUtils.pushedBottom3}>
          <Col sm="20">
            <Heading size="sm">Сроки оформления</Heading>
            <Row>
              <Col sm={3}>
                <FormField field={fields.purchaseTimeConditions.oralReservation} label="Устная бронь" float static={!isUpdateAllowed && formKey !== `create`}>
                  <Input block type="text" />
                </FormField>
              </Col>
              <Col sm={3}>
                <FormField field={fields.purchaseTimeConditions.agreementPreparation} label="Подготовка договора" float static={!isUpdateAllowed && formKey !== `create`}>
                  <Input block type="text" />
                </FormField>
              </Col>
              <Col sm={4}>
                <FormField field={fields.purchaseTimeConditions.developerAgreement} label="Согласование от застройщика" float static={!isUpdateAllowed && formKey !== `create`}>
                  <Input block type="text" />
                </FormField>
              </Col>
              <Col sm={5}>
                <FormField field={fields.purchaseTimeConditions.stateRegistrationPreparation} label="Подготовка пакета для гос. регистрации" float static={!isUpdateAllowed && formKey !== `create`}>
                  <Input block type="text" />
                </FormField>
              </Col>
              <Col sm={2}>
                <FormField field={fields.purchaseTimeConditions.signing} label="Подписание" float static={!isUpdateAllowed && formKey !== `create`}>
                  <Input block type="text" />
                </FormField>
              </Col>
              <Col sm={3}>
                <FormField field={fields.purchaseTimeConditions.stateRegistration} label="Гос. регистрация" float static={!isUpdateAllowed && formKey !== `create`}>
                  <Input block type="text" />
                </FormField>
              </Col>
              <Col sm={6}>
                <FormField field={fields.purchaseTimeConditions.documentDelivery} label="Проверка пакета и доставка документа" float static={!isUpdateAllowed && formKey !== `create`}>
                  <Input block type="text" />
                </FormField>
              </Col>
              <Col sm={4}>
                <FormField field={fields.purchaseTimeConditions.payment} label="Оплата по договору" float static={!isUpdateAllowed && formKey !== `create`}>
                  <Input block type="text" />
                </FormField>
              </Col>
            </Row>
          </Col>
        </Row>*/}
      </section>
    );
  }
}

export default Description;
