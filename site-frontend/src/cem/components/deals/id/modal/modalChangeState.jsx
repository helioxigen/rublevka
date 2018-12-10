import React, { Component } from 'react';

import { reduxForm } from 'redux-form';

import { fields as formFields } from 'cem/constants/deals/form';
import { validate } from 'cem/validators/deals';

import submitValidator from 'core/decorators/submitValidator';

import DealInfoForm from '../dealInfoForm';
import UI from 'cem/components/ui';
const {
  Modal, Form, Heading,
  Grid: { Row, Col },
 } = UI;

import s from 'cem/styles/modal/list';
import sUtils from 'cem/styles/utils';

const formSettings = {
  form: `dealChangeState`,
  fields: formFields,
  validate,
};

export default reduxForm(formSettings)(
  submitValidator()(
    class extends Component {
      constructor(props) {
        super(props);

        this.state = {
          isOpened: false,
        };
      }

      toggle() {
        this.setState({
          isOpened: !this.state.isOpened,
        });
      }

      close() {
        this.setState({
          isOpened: false,
        });
      }

      onSubmitSuccess() {
        this.close();
        this.props.actions.load();
        this.props.actions.pop(`success`, `Состояние сделки изменено!`);
      }

      onSubmitFail() {
        this.props.actions.pop(`error`, `Ошибка изменения состояния сделки!`);
      }

      update(values) {
        const { actions, nextState } = this.props;
        const { expectedAgentFee, expectedAgentFixedPrice, ...otherDetails } = values.details;
        return actions.update({
          ...values,
          details: {
            ...otherDetails,
            ...(values.isAgentFixed === `true` ? { expectedAgentFixedPrice } : { expectedAgentFee }),
            isAgentFixed: undefined,
          },
        }).then(() => actions.changeState(nextState));
      }

      render() {
        const { fields, submitBtn, handleSubmit } = this.props;

        const header = (
          <Row className={sUtils.pushedBottom3}>
            <Col>
              <Row className={sUtils.pushedBottom3}>
                <Col xs="20">
                  <Heading size="md">Информация о сделке</Heading>
                </Col>
              </Row>
              <Row>
                <Col xs="20">
                  <p className={s.text}>Чтобы продолжить требуется проверить все поля внизу.</p>
                </Col>
              </Row>
            </Col>
          </Row>
        );

        const isDealFinalized = fields.state.value === `successful` || fields.state.value === `unsuccessful`;
        const propertyIdStates = [`negotiation`, `deposit_paid`, `agreement`];
        const isPropertySelectionAvailable = propertyIdStates.indexOf(fields.state.value) > - 1;

        return (
          <div className={s.modalContainer}>
            {React.cloneElement(this.props.children, { onClick: ::this.toggle })}

            <Modal size="sm" closePortal={::this.close} isOpened={this.state.isOpened} onClose={::this.close} closeOnEsc closeOnOutsideClick>
              <Form.Container onSubmit={handleSubmit(::this.update, ::this.onSubmitSuccess, ::this.onSubmitFail)}>
                <DealInfoForm className={s.container} fields={fields}
                  isDealFinalized={isDealFinalized} isPropertySelectionAvailable={isPropertySelectionAvailable}
                  headerSection={header} />
                {submitBtn}
              </Form.Container>
            </Modal>
          </div>
        );
      }
    }
  )
);
