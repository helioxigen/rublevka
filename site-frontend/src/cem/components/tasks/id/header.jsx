import React, { Component } from 'react';

import { reduxForm } from 'redux-form';

import submitValidator from 'core/decorators/submitValidator';

import { FormattedDate } from 'react-formatted';
import FormField from 'cem/helpers/formField';

import TransferUserModal from 'cem/components/common/transferUserWithoutAction';

import UI from 'cem/components/ui';
const {
  Daypicker, Button, Back, Icon, Heading,
  Select, Label, Modal, Form,
  Dropdown,
  Grid: { Container, Row, Col },
  Form: { Static, Group, Input, Helper },
} = UI;

import ResultForm from './resultForm';

import cn from 'classnames';
import s from 'cem/styles/id/header';
import sUtils from 'cem/styles/utils';
import sButton from 'cem/styles/buttons';
import sDaypicker from 'cem/styles/ui/daypicker';
import sDropdown from 'cem/styles/ui/dropdown';

import moment from 'moment';
import { generateTimeSlotsList } from 'core/helpers';
import { prepareFormValuesForSubmit } from 'cem/helpers/tasks';

import * as dict from 'cem/constants/tasks/dictionaries';
import * as options from 'cem/constants/tasks/options';
import { fields as formFields, taskFormSettings } from 'cem/constants/tasks/form';

class Header extends Component {
  state = {
    openedModalName: null,
  };

  onSubmitSuccess({ id }) {
    const { actions, formKey, resetForm } = this.props;

    actions.loadTask(id).then(() => {
      if (formKey === `create`) {
        actions.pop(`success`, `Задача создана!`);
        actions.pushPath(`/tasks/${id}`);
      } else {
        actions.pop(`success`, `Задача обновлена!`);
        resetForm();
      }
    });
  }

  onTransferSuccess() {
    const { data, actions } = this.props;

    actions.loadTask(data.id);
  }

  createOrUpdate() {
    const { id, formKey, actions, values } = this.props;

    if (formKey === `create`) {
      return actions.createTask(prepareFormValuesForSubmit(values));
    } else {
      return actions.updateTask(id, prepareFormValuesForSubmit(values));
    }
  }

  openModal(name) {
    this.setState({
      openedModalName: name,
    });
  }

  closeAllModals() {
    this.setState({
      openedModalName: null,
    });
  }

  handleDoneButtonClick() {
    this.openModal(`done`);
  }

  handleCancelButtonClick() {
    this.openModal(`cancel`);
  }

  handleApprove() {
    const { actions, formKey } = this.props;

    actions.changeStatus(formKey, `approve`).then(() => actions.loadTask(formKey));
  }

  handleDisapprove() {
    const { actions, formKey } = this.props;

    actions.changeStatus(formKey, `disapprove`).then(() => actions.loadTask(formKey));
  }

  changeResponsibleUser(id) {
    const { data, actions, handleSubmit } = this.props;

    handleSubmit(() => actions.transfer(`tasks`, data.id, id), ::this.onTransferSuccess)();
  }

  render() {
    const {
      actions, auth,
      formKey, fields, values, handleSubmit, pristine, error, submitting,
      id, createdAt, queryParams, data, stateDetails = {},
      isUpdateAllowed, isUserTransferAllowed,
    } = this.props;

    const isDeadlineEditable = isUpdateAllowed && formKey !== `create` && Math.abs(moment(createdAt).diff(moment(), `minutes`)) <= 60;
    const showControls = formKey !== `create` && fields.state.value === `to_do` && isUpdateAllowed && !stateDetails.toApprove;
    const showManagerControls = formKey !== `create` && fields.state.value === `to_do` && data.reportedByUserId === auth.id && stateDetails.toApprove;

    const kind = dict.kinds[fields.kind.value];
    const state = dict.states[fields.state.value];

    const kindField = {
      ...fields.kind,
      onChange: value => {
        fields.kind.onChange(value);
        if (value === `preview`) {
          fields.previewDetails.dealId.onChange(queryParams.dealId);
          fields.negotiationDetails.dealId.onChange(undefined);
        } else if (value === `negotiation`) {
          fields.negotiationDetails.dealId.onChange(queryParams.dealId);
          fields.previewDetails.dealId.onChange(undefined);
        } else {
          fields.previewDetails.dealId.onChange(undefined);
          fields.negotiationDetails.dealId.onChange(undefined);
        }
      },
    };

    return (
      <section>
        <Form.Container className={s.header} onSubmit={handleSubmit(::this.createOrUpdate, ::this.onSubmitSuccess)}>
          <Container fluid>
            <Row>
              <Col xs="20" className={sUtils.positionRelative}>
                <Heading size="lg">
                  <Back button={<Button type="button" className={sButton.btnBack}><Icon className={s.iconBack} icon="arrow-right" /></Button>} />
                  {formKey !== `create` && `${kind && kind.title} (ID: ${id})`}
                </Heading>
                {formKey !== `create` && isUpdateAllowed && data.state === `to_do` && !stateDetails.toApprove && isUserTransferAllowed &&
                  <Dropdown className={sDropdown.header} button={<Button type="button" className={sButton.btnDropdown}><Icon className={s.iconSubmenu} icon="submenu" /></Button>}>
                    <TransferUserModal action={::this.changeResponsibleUser}>
                      <Button type="button" className={sButton.btnDropdownInner}>Передать другому сотруднику</Button>
                    </TransferUserModal>
                  </Dropdown>
                }
              </Col>
            </Row>
            <Row className={s.formContainer}>
              <Col md="14" mdOffset="3">
                <Row>
                  {formKey !== `create` &&
                    <Col sm="6" md="3" mdOffset="3">
                      {!!stateDetails.toApprove &&
                        <div>
                          <Form.Label block>Статус</Form.Label>
                          <Label kind="warning" style={{ marginTop: `7px` }}>ОЖИДАЕТ ПОДТВЕРЖДЕНИЯ</Label>
                        </div>
                      }
                      {!stateDetails.toApprove &&
                        <Group>
                          <Form.Label block>Статус</Form.Label>
                          <Static className={cn(s.input, s[state && state.style])}>{state && state.title}</Static>
                        </Group>
                      }
                    </Col>
                  }
                  {formKey === `create` &&
                    <Col sm="6">
                      <FormField label="Тип задачи" field={kindField}>
                        <Select className={cn(sUtils.minHeight3_7, sUtils.fontSizeMd)} options={!queryParams.dealId ? options.kinds.common : options.kinds.deal} required />
                      </FormField>
                    </Col>
                  }
                  {(formKey === `create` || fields.state.value === `to_do` && isDeadlineEditable) &&
                    <Col sm="6" smOffset="1">
                      <Group inline kind={fields.deadline.date.touched && !!fields.deadline.date.error && `error`}>
                        <Form.Label block>Дата</Form.Label>
                        <Daypicker className={sDaypicker.daypicker}
                          control={<Input className={sDaypicker.tasksInputDaypicker} type="text" {...fields.deadline.date} required />}
                          button={<Button className={sDaypicker.btn}><UI.Icon className={sDaypicker.icon} icon="calendar" /></Button>}
                          onDayClick={day => fields.deadline.date.onBlur(day)} />
                        {fields.deadline.date.touched && fields.deadline.date.error && <Helper className={s.helperDaypicker}>{fields.deadline.date.error}</Helper>}
                      </Group>
                    </Col>
                  }
                  {formKey !== `create` && (fields.state.value !== `to_do` || !isDeadlineEditable) &&
                    <Col sm="6" smOffset="1" md="4" mdOffset="2">
                      <Group>
                        <Form.Label block>Дата</Form.Label>
                        <Static className={s.input}><FormattedDate value={fields.deadline.date.value || 0} mask="dd.mm.yyyy" /></Static>
                      </Group>
                    </Col>
                  }
                  <Col sm="6" smOffset="1">
                    {(formKey === `create` || fields.state.value === `to_do` && isDeadlineEditable) &&
                      <Group kind={fields.deadline.time.touched && fields.deadline.time.error && `error`}>
                        <Form.Label>Время</Form.Label>
                        <Select className={cn(sUtils.minHeight3_7, sUtils.fontSizeMd)} {...fields.deadline.time} options={generateTimeSlotsList()} labelKey="title" valueKey="id" required />
                        {fields.deadline.time.touched && fields.deadline.time.error && <Helper>{fields.deadline.time.error}</Helper>}
                      </Group>
                    }
                    {formKey !== `create` && (fields.state.value !== `to_do` || !isDeadlineEditable) &&
                      <Group>
                        <Form.Label block>Время</Form.Label>
                        <Static className={s.input}>{fields.deadline.time.initialValue}</Static>
                      </Group>
                    }
                  </Col>
                </Row>
                {showControls &&
                  <Row xs="center">
                    <Col xs="20">
                      <Button kind="accent" size="xs" type="button" onClick={::this.handleDoneButtonClick}>Выполнить</Button>
                      <Button className={sUtils.pushedLeft1} kind="danger" size="xs" type="button" onClick={::this.handleCancelButtonClick}>Отменить</Button>
                    </Col>
                  </Row>
                }
                {stateDetails.toApprove && data.result &&
                  <Row>
                    <Col sm="10" smOffset="5">
                      <Heading size="sm">{`${dict.states[stateDetails.toApprove].title}`}, результат:</Heading>
                      <p className={sUtils.pushedTop1_5}>{data.result}</p>
                    </Col>
                  </Row>
                }
                {showManagerControls &&
                  <Row xs="center">
                    <Col xs="20">
                      <Button kind="accent" size="xs" type="button" onClick={::this.handleApprove}>Подтвердить</Button>
                      <Button className={sUtils.pushedLeft1} kind="danger" size="xs" type="button" onClick={::this.handleDisapprove}>Отклонить</Button>
                    </Col>
                  </Row>
                }
              </Col>
            </Row>
          </Container>
          {formKey === `create` && <Button className={cn(sButton.btnFixedBottom, pristine && sUtils.hidden)} disabled={error || submitting} type="submit" kind="success" size="md" block>Добавить</Button>}
          {formKey !== `create` && <Button className={cn(sButton.btnFixedBottom, pristine && sUtils.hidden)} disabled={error || submitting} type="submit" kind="warning" size="md" block>Сохранить</Button>}
        </Form.Container>
        <Modal size="sm" closeOnEsc closeOnOutsideClick onClose={::this.closeAllModals} isOpened={this.state.openedModalName === `done`} closePortal={::this.closeAllModals}>
          <ResultForm taskId={id} status="done" fields={formFields} initialValues={values} actions={actions} onSubmitResult={::this.closeAllModals} />
        </Modal>
        <Modal size="sm" closeOnEsc closeOnOutsideClick onClose={::this.closeAllModals} isOpened={this.state.openedModalName === `cancel`} closePortal={::this.closeAllModals}>
          <ResultForm taskId={id} status="cancel" fields={formFields} initialValues={values} actions={actions} onSubmitResult={::this.closeAllModals} />
        </Modal>
      </section>
    );
  }
}

export default reduxForm(taskFormSettings)(submitValidator()(Header));
