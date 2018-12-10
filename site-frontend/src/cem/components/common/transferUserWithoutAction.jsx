import React, { Component } from 'react';

import { validatorShortcut } from 'core/decorators/submitValidator';
import { fetchResource } from 'cem/helpers/autocomplete';

import UI from 'cem/components/ui';
const {
  Form, Button, Modal,
  AsyncSelect, Heading,
  Grid: { Container, Row, Col },
 } = UI;

import FormField from 'cem/helpers/formField';

import cn from 'classnames';
import s from 'cem/styles/modal/list';
import sUtils from 'cem/styles/utils';
import sButton from 'cem/styles/buttons';

const formSettings = {
  form: `transferResponsible`,
  fields: [`responsibleUserId`],
  validate: ({ responsibleUserId }) => ({ responsibleUserId: !responsibleUserId && `Обязательно` }),
};

const ModalInner = validatorShortcut(formSettings)(
  class extends Component {

    onSubmit() {
      const { values: { responsibleUserId }, action, closeModal } = this.props;

      action(responsibleUserId);
      closeModal();
    }

    render() {
      const { fields, handleSubmit } = this.props;

      return (
        <Form.Container onSubmit={handleSubmit(::this.onSubmit)}>
          <div className={s.container}>
            <Row>
              <Col xs="20">
                <Heading size="md">Передача другому сотруднику</Heading>
              </Col>
            </Row>
            <Row className={sUtils.pushedTop3}>
              <Col xs="20">
                <FormField field={fields.responsibleUserId} label="Сотрудник">
                  <AsyncSelect asyncOptions={fetchResource(`/v1/users/staff`, `firstName,lastName`, ({ firstName, lastName }) => `${firstName} ${lastName}`)} />
                </FormField>
              </Col>
            </Row>
          </div>
          <Button className={sButton.btnWide} kind="success" size="lg" block>Передать</Button>
        </Form.Container>
      );
    }
  }
);

export default class extends Component {
  toggleModal(state) {
    this.setState({ isOpened: state });
  }

  render() {
    return (
      <div className={cn(s.modalWrapper, sUtils.displayBlock)}>
        {React.cloneElement(this.props.children, { ...this.props.children.props, onClick: () => this.toggleModal(true) })}
        <Modal size="sm" closeOnEsc onClose={() => this.toggleModal(false)} closePortal={() => this.toggleModal(false)} {...this.state}>
          <ModalInner {...this.props} closeModal={() => this.toggleModal(false)} />
        </Modal>
      </div>
    );
  }
}
