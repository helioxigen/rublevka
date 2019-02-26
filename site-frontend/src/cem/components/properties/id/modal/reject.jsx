import React, { Component } from 'react';

import { reduxForm } from 'redux-form';
import submitValidator from 'core/decorators/submitValidator';
import FormField from 'cem/helpers/formField';

import cn from 'classnames';
import UI from 'cem/components/ui';
const {
  Form,
  Button,
  Modal,
  Icon,
  Tooltip,
  Heading,
  Form: { Textarea },
  Grid: { Container, Row, Col },
} = UI;

import s from 'cem/styles/modal/list';
import sUtils from 'cem/styles/utils';
import sButton from 'cem/styles/buttons';

const formSettings = {
  form: `bannerRemoved`,
  fields: [`state`, `reason`],
  validate: values => ({
    reason: !values.reason && `Обязательно`,
  }),
};

const ModalInner = reduxForm(formSettings)(
  submitValidator()(
    class extends Component {
      update() {
        const {
          formKey,
          propertyId,
          category,
          data,
          values,
          closeModal,
          actions,
        } = this.props;
        const bannerData = { ...data, ...values };

        actions
          .updateBanner(propertyId, category, formKey, bannerData)
          .then(() => {
            actions.pop(`success`, `Реклама снята`);
            closeModal();
            actions.loadBanners(propertyId, category, values.state);
            actions.loadBanners(propertyId, category, data.state);
          });
      }

      render() {
        const { fields, handleSubmit } = this.props;

        return (
          <Form.Container onSubmit={handleSubmit(::this.update)}>
            <div className={s.container}>
              <Row>
                <Col xs="20">
                  <Heading size="md">Почему сняли рекламу?</Heading>
                </Col>
              </Row>
              <Row className={sUtils.pushedTop3}>
                <Col xs="20">
                  <FormField field={fields.reason}>
                    <Textarea
                      className={s.textarea}
                      rows="9"
                      block
                      kind="primary"
                    />
                  </FormField>
                </Col>
              </Row>
            </div>
            <Button className={sButton.btnWide} kind="danger" size="lg" block>
              Снять
            </Button>
          </Form.Container>
        );
      }
    },
  ),
);

export default class extends Component {
  state = {};

  toggleModal(state) {
    this.setState({
      isOpen: state,
    });
  }

  render() {
    return (
      <div className={cn(s.modalWrapper, sUtils.pushedLeft1)}>
        <Tooltip title="Снять рекламу">
          <Button
            type="button"
            className={sButton.btnTimes}
            block
            size="xs"
            onClick={() => this.toggleModal(true)}
          >
            <Icon className={s.btnIcon} icon="delete" />
          </Button>
        </Tooltip>
        <Modal
          size="md"
          closeOnEsc
          closeOnOutsideClick
          onClose={() => this.toggleModal(false)}
          isOpened={this.state.isOpen}
          closePortal={() => this.toggleModal(false)}
        >
          <ModalInner
            {...this.props}
            closeModal={() => this.toggleModal(false)}
          />
        </Modal>
      </div>
    );
  }
}
