import React, { Component } from 'react';

import { reduxForm } from 'redux-form';

import submitValidator from 'core/decorators/submitValidator';

import { SelectionAvatar } from 'cem/components/common/photos/avatar';

import UI from 'cem/components/ui';
const {
  Button,
  Dropdown,
  Icon,
  Back,
  Heading,
  Form,
  Media,
  Select,
  Form: { Input },
  Grid: { Container, Row, Col },
} = UI;

import TransferUserModal from 'cem/components/common/transferUserWithoutAction';

import FormField from 'cem/helpers/formField';

import cn from 'classnames';
import s from 'cem/styles/id/header';
import sUtils from 'cem/styles/utils';
import sButton from 'cem/styles/buttons';
import sDropdown from 'cem/styles/ui/dropdown';

import * as options from 'core/constants/selections/options';

import { formSettings } from 'cem/constants/selections/form';

const Description = ({ fields, isUpdateAllowed }) =>
  (<section>
    <Row>
      <Col sm="6" lg="5">
        <FormField field={fields.name} label="Название подборки" float static={!isUpdateAllowed}>
          <Input className={s.input} block type="text" />
        </FormField>
      </Col>
      <Col sm="6" lg="5">
        <FormField field={fields.state} label="Статус" static={!isUpdateAllowed} float>
          <Select className={sUtils.fontSizeMd} options={options.state} />
        </FormField>
      </Col>
    </Row>
  </section>);

class Header extends Component {
  constructor(props) {
    super(props);

    this.createOrUpdate = this.createOrUpdate.bind(this);
    this.onSubmitSuccess = this.onSubmitSuccess.bind(this);
    this.changeResponsible = this.changeResponsible.bind(this);
  }

  onSubmitSuccess(data) {
    const { formKey, actions } = this.props;

    if (formKey === 'create') {
      actions.pop('success', `Подборка создана (ID: ${data.id})`);
      actions.pushPath(`/selections/${data.id}`);
    } else {
      actions.pop('success', `Подборка обновлена (ID: ${data.id})`);
      actions.loadSelection(data.id);
    }
  }

  changeResponsible(id) {
    const { formKey, data, actions, handleSubmit } = this.props;

    handleSubmit(() => {
      actions.updateSelection(formKey, { ...data, responsibleUserId: id });
      actions.pop('success', 'Ответственный пользователь изменён!');
      actions.loadSelection(formKey);
    })();
  }

  createOrUpdate() {
    const { formKey, values, actions } = this.props;

    if (formKey === 'create') return actions.createSelection(values);
    if (formKey !== 'create') return actions.updateSelection(formKey, values);
  }

  render() {
    const {
      formKey,
      pristine,
      error,
      submitting,
      handleSubmit,
      fields,
      actions,
      data,
      isUpdateAllowed,
      isPhotoUploading,
    } = this.props;

    return (
      <header className={s.header}>
        <Form.Container onSubmit={handleSubmit(this.createOrUpdate, this.onSubmitSuccess)}>
          <Container fluid>
            <Row>
              <Col xs="20" className={sUtils.positionRelative}>
                <Heading size="lg">
                  <Back
                    button={
                      <Button type="button" className={sButton.btnBack}>
                        <Icon className={s.iconBack} icon="arrow-right" />
                      </Button>
                    }
                  />
                  {formKey !== 'create' && `Подборка (ID: ${formKey})`}
                  {formKey === 'create' && 'Создать подборку'}
                </Heading>
                {isUpdateAllowed &&
                  formKey !== 'create' &&
                  <Dropdown
                    className={sDropdown.header}
                    button={
                      <Button type="button" className={sButton.btnDropdown}>
                        <Icon className={s.iconSubmenu} icon="submenu" />
                      </Button>
                    }
                  >
                    <TransferUserModal action={this.changeResponsible}>
                      <Button type="button" className={sButton.btnDropdownInner}>
                        Передать другому сотруднику
                      </Button>
                    </TransferUserModal>
                  </Dropdown>}
              </Col>
            </Row>
            <Row>
              <Col xs="20">
                <Media
                  className={s.media}
                  left={
                    formKey !== 'create'
                      ? <SelectionAvatar
                        id={data.photo && data.photo.id}
                        resourceId={data.id}
                        uploadAction={actions.uploadSelectionPhoto}
                        actions={actions}
                        isUploadAllowed={isUpdateAllowed}
                        isUploading={isPhotoUploading}
                      />
                      : null
                  }
                  body={<Description fields={fields} isUpdateAllowed={isUpdateAllowed} />}
                />
              </Col>
            </Row>
          </Container>
          {formKey === 'create' &&
            <Button
              className={cn(sButton.btnFixedBottom, pristine && sUtils.hidden)}
              disabled={error || submitting}
              kind="success"
              size="md"
              block
            >
              Добавить
            </Button>}
          {formKey !== 'create' &&
            <Button
              className={cn(sButton.btnFixedBottom, pristine && sUtils.hidden)}
              disabled={error || submitting}
              kind="warning"
              size="md"
              block
            >
              Сохранить
            </Button>}
        </Form.Container>
      </header>
    );
  }
}

export default reduxForm(formSettings)(submitValidator()(Header));
