import React, { Component } from 'react';

import UI from 'cem/components/ui';
const {
  AsyncSelect,
  Select,
  Heading,
  Form: { Group, Label, Input, Helper },
  Grid: { Row, Col },
} = UI;

import FormField from 'cem/helpers/formField';

import CreateCompanyModal from 'cem/containers/companies/create';

// import Infrastructure from './infrastructure';

import cn from 'classnames';
import s from 'cem/styles/id/content';
import sUtils from 'cem/styles/utils';

import { fetchResource, checkCompanies } from 'cem/helpers/autocomplete';
import { companyStates } from 'cem/constants/dadata/dictionaries';
import * as options from 'cem/constants/complexBuildings/options';
import * as dict from 'cem/constants/complexBuildings/dictionaries';

const formatCompanyLabel = ({ name, ogrn }) => `${name} (ОГРН: ${ogrn})`;

const fetchCompany = fetchResource(
  `/v1/companies`,
  `name`,
  formatCompanyLabel,
  {},
  {},
  checkCompanies,
);

class Description extends Component {
  addDeveloperCompany(id) {
    this.props.fields.details.developerId.onChange(Number(id));
    this.setState({ isOpened: false });
  }

  addContractorCompany(id) {
    this.props.fields.details.contractorId.onChange(Number(id));
    this.setState({ isOpened: false });
  }

  checkCompany(addCompany) {
    return (ignore, { value, ...data }) => {
      if (value) addCompany(value);
      if (!value) {
        const address = data.address.value;
        const registeredAt = new Date(data.state.registration_date);
        const initialValues = {
          name: data.name.short_with_opf,
          ogrn: data.ogrn,
          inn: data.inn,
          address: [address],
          state: companyStates[data.state.status],
          kpp: data.kpp || `Нет`,
          opf: (data.opf && data.opf.code) || `Нет`,
          registeredAt: registeredAt.toISOString().split(`T`)[0],
          ceoName: data.management && data.management.name,
          ceoPosition: data.management && data.management.post,
        };
        this.setState({ initialValues, isOpened: true });
      }
    };
  }

  render() {
    const { fields, formKey, isUpdateAllowed } = this.props;

    const developerIdField = {
      ...fields.details.developerId,
      onChange: ::this.checkCompany(::this.addDeveloperCompany),
    };

    const contractorIdField = {
      ...fields.details.contractorId,
      onChange: ::this.checkCompany(::this.addContractorCompany),
    };

    return (
      <section className={this.props.className}>
        <Heading size="md">Описание здания</Heading>
        <Row>
          <Col sm="10">
            <Heading size="sm">Сведения о постройке</Heading>
            <Row>
              <Col lg="16" className={sUtils.pushedBottom3}>
                <Row>
                  <Col sm="10">
                    <FormField
                      field={fields.details.houseKind}
                      options={dict.houseKinds}
                      label="Тип дома"
                      float
                      static={!isUpdateAllowed && formKey !== `create`}
                    >
                      <Select
                        options={options.houseKinds}
                        {...fields.details.houseKind}
                      />
                    </FormField>
                  </Col>
                  <Col sm="10">
                    <FormField
                      field={fields.details.contractType}
                      options={dict.contractTypes}
                      label="Вид договора"
                      float
                      static={!isUpdateAllowed && formKey !== `create`}
                    >
                      <Select
                        options={options.contractTypes}
                        {...fields.details.contractType}
                      />
                    </FormField>
                  </Col>
                </Row>
                <Row>
                  <Col sm="10">
                    <FormField
                      field={fields.details.builtYear}
                      label="Год постройки"
                      float
                      static={!isUpdateAllowed && formKey !== `create`}
                    >
                      <Input block type="text" />
                    </FormField>
                  </Col>
                  <Col md="10">
                    <FormField
                      field={fields.details.deliveryQuarter}
                      options={dict.deliveryQuarters}
                      label="Квартал сдачи"
                      float
                      static={!isUpdateAllowed && formKey !== `create`}
                    >
                      <Select
                        options={options.deliveryQuarters}
                        {...fields.details.deliveryQuarter}
                      />
                    </FormField>
                  </Col>
                </Row>
                <Row>
                  <Col md="10">
                    <FormField
                      field={fields.details.constructionStage}
                      options={dict.constructionStages}
                      label="Стадия строительства"
                      float
                      static={!isUpdateAllowed && formKey !== `create`}
                    >
                      <Select
                        options={options.constructionStages}
                        {...fields.details.constructionStage}
                      />
                    </FormField>
                  </Col>
                  <Col sm="10">
                    <FormField
                      field={fields.details.stage}
                      label="Очередь строительства"
                      float
                      static={!isUpdateAllowed && formKey !== `create`}
                    >
                      <Input block type="text" />
                    </FormField>
                  </Col>
                </Row>
                <Row>
                  <Col sm="10">
                    <FormField
                      field={fields.details.series}
                      label="Серия дома"
                      float
                      static={!isUpdateAllowed && formKey !== `create`}
                    >
                      <Input block type="text" />
                    </FormField>
                  </Col>
                  <Col sm="10">
                    <FormField
                      field={developerIdField}
                      asyncValue={fetchCompany}
                      label="Застройщик"
                      float
                      static={!isUpdateAllowed && formKey !== `create`}
                    >
                      <AsyncSelect
                        block
                        type="text"
                        asyncOptions={fetchCompany}
                      />
                    </FormField>
                    <CreateCompanyModal
                      formKey="create"
                      {...this.state}
                      ref="createDeveloperCompany"
                      disableSearch
                      callback={::this.addDeveloperCompany}
                      closePortal={() => this.setState({ isOpened: false })}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col sm="10">
                    <FormField
                      field={contractorIdField}
                      asyncValue={fetchCompany}
                      label="Генподрядчик"
                      float
                      static={!isUpdateAllowed && formKey !== `create`}
                    >
                      <AsyncSelect
                        block
                        type="text"
                        asyncOptions={fetchCompany}
                      />
                    </FormField>
                    <CreateCompanyModal
                      formKey="create"
                      {...this.state}
                      ref="createContractorCompany"
                      disableSearch
                      callback={::this.addContractorCompany}
                      closePortal={() => this.setState({ isOpened: false })}
                    />
                  </Col>
                  <Col sm="10">
                    <FormField
                      field={fields.details.architect}
                      label="Архитектор"
                      float
                      static={!isUpdateAllowed && formKey !== `create`}
                    >
                      <Input block type="text" />
                    </FormField>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
          <Col sm="10">
            <Heading size="sm">Особенности</Heading>
            <Row>
              <Col lg="16" className={sUtils.pushedBottom3}>
                <Row>
                  <Col sm="10">
                    <FormField
                      field={fields.details.floors}
                      label="Этажей в доме"
                      float
                      static={!isUpdateAllowed && formKey !== `create`}
                    >
                      <Input block type="text" />
                    </FormField>
                  </Col>
                  <Col md="10">
                    <FormField
                      field={fields.details.constructionKind}
                      options={dict.constructionKinds}
                      label="Конструкция дома"
                      float
                      static={!isUpdateAllowed && formKey !== `create`}
                    >
                      <Select
                        options={options.constructionKinds}
                        {...fields.details.constructionKind}
                      />
                    </FormField>
                  </Col>
                </Row>
                <Row>
                  <Col sm="10">
                    <FormField
                      field={fields.details.elevators}
                      label="Количество лифтов"
                      float
                      static={!isUpdateAllowed && formKey !== `create`}
                    >
                      <Input block type="text" />
                    </FormField>
                  </Col>
                  <Col sm="10">
                    <FormField
                      field={fields.details.freightElevators}
                      label="Количество грузовых лифтов"
                      float
                      static={!isUpdateAllowed && formKey !== `create`}
                    >
                      <Input block type="text" />
                    </FormField>
                  </Col>
                </Row>
                <Row>
                  <Col md="10">
                    <FormField
                      field={fields.details.security}
                      options={dict.securityKinds}
                      label="Безопасность"
                      float
                      static={!isUpdateAllowed && formKey !== `create`}
                    >
                      <Select
                        options={options.securityKinds}
                        {...fields.details.security}
                      />
                    </FormField>
                  </Col>
                  <Col md="10">
                    <FormField
                      field={fields.details.maintenanceCosts}
                      label="Цена обслуживания, руб/м²/мес "
                      float
                      static={!isUpdateAllowed && formKey !== `create`}
                    >
                      <Input block type="text" />
                    </FormField>
                  </Col>
                </Row>
                <Row>
                  <Col md="10">
                    <Group
                      kind={
                        fields.details.withRubbishChute.touched &&
                        !!fields.details.withRubbishChute.error &&
                        `error`
                      }
                    >
                      <Label className={sUtils.pushedBottom1} block>
                        Мусоропровод
                      </Label>
                      <Label
                        className={cn(s.radioLabel, sUtils.pushedRight1_5)}
                      >
                        <Input
                          type="radio"
                          {...fields.details.withRubbishChute}
                          value
                          checked={
                            fields.details.withRubbishChute.value === `true`
                          }
                          disabled={!isUpdateAllowed && formKey !== `create`}
                        />
                        Есть
                      </Label>
                      <Label className={s.radioLabel}>
                        <Input
                          type="radio"
                          {...fields.details.withRubbishChute}
                          value={false}
                          checked={
                            fields.details.withRubbishChute.value !== `true`
                          }
                          disabled={!isUpdateAllowed && formKey !== `create`}
                        />
                        Нет
                      </Label>
                      {fields.details.withRubbishChute.touched &&
                        fields.details.withRubbishChute.error && (
                          <Helper>
                            {fields.details.withRubbishChute.error}
                          </Helper>
                        )}
                    </Group>
                  </Col>
                  <Col md="10">
                    <Group
                      kind={
                        fields.details.withWasteDisposalRoom.touched &&
                        !!fields.details.withWasteDisposalRoom.error &&
                        `error`
                      }
                    >
                      <Label className={sUtils.pushedBottom1} block>
                        Комната для мусора
                      </Label>
                      <Label
                        className={cn(s.radioLabel, sUtils.pushedRight1_5)}
                      >
                        <Input
                          type="radio"
                          {...fields.details.withWasteDisposalRoom}
                          value
                          checked={
                            fields.details.withWasteDisposalRoom.value ===
                            `true`
                          }
                          disabled={!isUpdateAllowed && formKey !== `create`}
                        />
                        Есть
                      </Label>
                      <Label className={s.radioLabel}>
                        <Input
                          type="radio"
                          {...fields.details.withWasteDisposalRoom}
                          value={false}
                          checked={
                            fields.details.withWasteDisposalRoom.value !==
                            `true`
                          }
                          disabled={!isUpdateAllowed && formKey !== `create`}
                        />
                        Нет
                      </Label>
                      {fields.details.withWasteDisposalRoom.touched &&
                        fields.details.withWasteDisposalRoom.error && (
                          <Helper>
                            {fields.details.withWasteDisposalRoom.error}
                          </Helper>
                        )}
                    </Group>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col sm="10">
            <Heading size="sm">Паркинг</Heading>
            <Row>
              <Col lg="16" className={sUtils.pushedBottom3}>
                <Row>
                  <Col sm="10">
                    <Group
                      kind={
                        fields.details.withParkings.touched &&
                        !!fields.details.withParkings.error &&
                        `error`
                      }
                    >
                      <Label className={sUtils.pushedBottom1} block>
                        Паркинг
                      </Label>
                      <Label
                        className={cn(s.radioLabel, sUtils.pushedRight1_5)}
                      >
                        <Input
                          type="radio"
                          {...fields.details.withParkings}
                          value
                          checked={fields.details.withParkings.value === `true`}
                          disabled={!isUpdateAllowed && formKey !== `create`}
                        />
                        Есть
                      </Label>
                      <Label className={s.radioLabel}>
                        <Input
                          type="radio"
                          {...fields.details.withParkings}
                          value={false}
                          checked={fields.details.withParkings.value !== `true`}
                          disabled={!isUpdateAllowed && formKey !== `create`}
                        />
                        Нет
                      </Label>
                      {fields.details.withParkings.touched &&
                        fields.details.withParkings.error && (
                          <Helper>{fields.details.withParkings.error}</Helper>
                        )}
                    </Group>
                  </Col>
                  <Col sm="10">
                    {fields.details.withParkings.value === `true` && (
                      <FormField
                        field={fields.details.parkings}
                        label="Количество машиномест"
                        float
                        static={!isUpdateAllowed && formKey !== `create`}
                      >
                        <Input block type="text" />
                      </FormField>
                    )}
                  </Col>
                </Row>
                <Row>
                  <Col sm="10">
                    <Group
                      kind={
                        fields.details.withUndergroundGarages.touched &&
                        !!fields.details.withUndergroundGarages.error &&
                        `error`
                      }
                    >
                      <Label className={sUtils.pushedBottom1} block>
                        Подземный гараж
                      </Label>
                      <Label
                        className={cn(s.radioLabel, sUtils.pushedRight1_5)}
                      >
                        <Input
                          type="radio"
                          {...fields.details.withUndergroundGarages}
                          value
                          checked={
                            fields.details.withUndergroundGarages.value ===
                            `true`
                          }
                          disabled={!isUpdateAllowed && formKey !== `create`}
                        />
                        Есть
                      </Label>
                      <Label className={s.radioLabel}>
                        <Input
                          type="radio"
                          {...fields.details.withUndergroundGarages}
                          value={false}
                          checked={
                            fields.details.withUndergroundGarages.value !==
                            `true`
                          }
                          disabled={!isUpdateAllowed && formKey !== `create`}
                        />
                        Нет
                      </Label>
                      {fields.details.withUndergroundGarages.touched &&
                        fields.details.withUndergroundGarages.error && (
                          <Helper>
                            {fields.details.withUndergroundGarages.error}
                          </Helper>
                        )}
                    </Group>
                  </Col>
                  <Col sm="10">
                    {fields.details.withUndergroundGarages.value === `true` && (
                      <FormField
                        field={fields.details.undergroundGarages}
                        label="Количество машиномест"
                        float
                        static={!isUpdateAllowed && formKey !== `create`}
                      >
                        <Input block type="text" />
                      </FormField>
                    )}
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </section>
    );
  }
}

export default Description;
