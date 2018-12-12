import React, { Component } from 'react';

import { states as statesDict, stateStyles } from 'cem/constants/companies/dictionaries';

import formSettings from 'cem/constants/companies/form';
import { validatorShortcut } from 'core/decorators/submitValidator';

import { FormattedDate } from 'react-formatted';
import TransferUserModal from 'cem/containers/common/modal/transferUser';

import FormField from 'cem/helpers/formField';
import UI from 'cem/components/ui';
const {
  Grid, Form, Button, Icon, Heading,
  Back, Select, Dropdown,
  Form: { Input, Static },
  Grid: { Row, Col },
} = UI;

import cn from 'classnames';
import s from 'cem/styles/id/header';
import sDropdown from 'cem/styles/ui/dropdown';
import sUtils from 'cem/styles/utils';
import sButton from 'cem/styles/buttons';

const Description = ({ fields, isUpdateAllowed }) => {
  return (
    <section className={s.media}>
      <Row>
        <Col sm="8">
          <FormField field={fields.name} label="Наименование" static={!isUpdateAllowed}>
            <Input className={sUtils.fontSizeMd} block type="text" />
          </FormField>
        </Col>
        <Col sm="3">
          <FormField label="Дата регистрации">
            <Static className={sUtils.fontSizeMd}><FormattedDate mask="dd.mm.yyyy" value={fields.registeredAt.value} /></Static>
          </FormField>
        </Col>
        <Col sm="3">
          <FormField className={s[stateStyles[fields.state.value]]} field={fields.state} label="Статус" static options={statesDict}>
            <Select className={sUtils.fontSizeMd} />
          </FormField>
        </Col>
      </Row>
    </section>
  );
};

class Header extends Component {
  onSubmitSuccess() {
    this.props.actions.loadCompany(this.props.formKey);
    this.props.actions.pop(`success`, `Компания (ID: ${this.props.formKey})`, `Успешно обновлена`);
  }

  update() {
    const { formKey, values, actions } = this.props;
    return actions.updateCompany(formKey, values);
  }

  transfer(objectKind, id, responsibleUserId) {
    const { values, actions } = this.props;

    return actions.updateCompany(id, { ...values, responsibleUserId });
  }

  render() {
    const { formKey, pristine, error, submitting, handleSubmit, isUpdateAllowed, data = {} } = this.props;

    return (
      <Form.Container className={s.header} onSubmit={handleSubmit(::this.update, ::this.onSubmitSuccess)}>
        <Grid.Container fluid>
          <Row>
            <Col xs="20" className={sUtils.positionRelative}>
              <Heading size="lg">
                <Back button={
                  <Button type="button" className={sButton.btnBack}>
                    <Icon className={s.iconBack} icon="arrow-right" />
                  </Button>}
                />
                {formKey === `create` && `Создать новyю компанию`}
                {formKey !== `create` && `Компания (ID: ${formKey})`}
              </Heading>
              <Dropdown className={sDropdown.header} button={<Button type="button" className={sButton.btnDropdown}><Icon className={s.iconSubmenu} icon="submenu" /></Button>}>
                {isUpdateAllowed &&
                  <TransferUserModal responsibleUser={{ id: data.responsibleUserId }} className={sUtils.displayBlock} destinationKind="users" objectId={formKey} transferAction={::this.transfer} reloadAction={this.props.actions.loadCompany}>
                    <Button type="button" className={sButton.btnDropdownInner}>Передать другому сотруднику</Button>
                  </TransferUserModal>
                }
              </Dropdown>
            </Col>
          </Row>
          <Row>
            <Col sm="18">
              <Description {...this.props} />
            </Col>
          </Row>
        </Grid.Container>
        {formKey !== `create` && isUpdateAllowed && <Button className={cn(sButton.btnFixedBottom, pristine && sUtils.hidden)} disabled={error || submitting} kind="warning" size="md" block>Сохранить</Button>}
      </Form.Container>
    );
  }
}

export default validatorShortcut(formSettings)(Header);
